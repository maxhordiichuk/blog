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

  validates :name, :text, :kind, presence: true
end
