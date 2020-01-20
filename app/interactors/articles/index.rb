module Articles
  class Index
    include Interactor

    def call
      params = context.params
      articles = Article.all
      articles = articles.search(params[:query]) if params[:query].present?
      context.articles = articles
    end
  end
end
