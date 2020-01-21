module Articles
  class GroupByStory
    include Interactor

    def call
      context.stories = stories.map do |story|
        {
          id: story.id,
          name: story.name,
          articles_count: story.articles_count,
          article_kinds_count: story.article_kinds_count,
          recent_article: story.recent_article
        }
      end
    end

    private

    def stories
      Story.joins(:articles)
           .includes(:recent_article)
           .group('stories.id, stories.name')
           .select(<<~SQL)
             stories.id as id,
             stories.name as name,
             count(articles) as articles_count,
             count(distinct(articles.kind)) as article_kinds_count
      SQL
    end
  end
end
