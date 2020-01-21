class Article < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: %i[name text],
    using: {
      tsearch: {
        dictionary: 'english',
        tsvector_column: 'tsv'
      }
    }
  )

  belongs_to :story, inverse_of: :articles, counter_cache: true

  enum kind: { blog_post: 0, facebook_post: 1, tweet: 2 }

  scope(:recent_by_story, lambda do
    from(<<~SQL)
      (
        SELECT articles.*
        FROM articles JOIN (
           SELECT story_id, max(created_at) AS created_at
           FROM articles
           GROUP BY story_id
        ) recent_by_story
        ON articles.created_at = recent_by_story.created_at
        AND articles.story_id = recent_by_story.story_id
      ) articles
    SQL
  end)

  default_scope { order(created_at: :desc) }

  validates :name, :text, :kind, presence: true

  def as_json(_options)
    { id: id, story_id: story_id, name: name, text: text, kind: kind }
  end
end
