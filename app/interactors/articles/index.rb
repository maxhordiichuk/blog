module Articles
  class Index
    include Interactor

    ORDER_ATTRIBUTES = %w[id name text kind].freeze
    GROUP_ATTRIBUTES = %w[id name text kind story].freeze
    ORDER_DIRECTIONS = %w[asc desc].freeze

    def call
      articles = Article.all
      articles = filter(articles)
      articles = order(articles)
      context.articles = group(articles)
    end

    private

    def filter(articles)
      context.params[:query].present? ? articles.search(context.params[:query]) : articles
    end

    def order(articles)
      return articles if context.params[:order].blank?

      order_query = context.params[:order].to_s.split('_')
      return articles if order_query.size != 2

      attribute, order = order_query
      return articles unless ORDER_ATTRIBUTES.include?(attribute) && ORDER_DIRECTIONS.include?(order)

      articles.reorder(attribute => order)
    end

    def group(articles)
      group = context.params[:group]
      return articles if group.blank? || !GROUP_ATTRIBUTES.include?(group)

      if group == 'story'
        Articles::GroupByStory.call!.stories
      else
        articles.group_by(&group.to_sym)
      end
    end
  end
end
