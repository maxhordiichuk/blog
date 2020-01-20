module Articles
  class Index
    include Interactor

    ORDER_ATTRIBUTES = %w[id name text kind].freeze
    ORDER_DIRECTIONS = %w[asc desc].freeze

    def call
      params = context.params
      articles = Article.all
      articles = articles.search(params[:query]) if params[:query].present?
      articles = articles.reorder(parsed_order) if params[:order].present?
      context.articles = articles
    end

    private

    def parsed_order
      order_query = context.params[:order].to_s.split('_')
      return {} if order_query.size != 2

      attribute, order = order_query
      return {} unless ORDER_ATTRIBUTES.include?(attribute) && ORDER_DIRECTIONS.include?(order)

      { attribute => order }
    end
  end
end
