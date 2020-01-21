class ArticlesController < ApplicationController
  before_action :set_article, only: %i[show update destroy]

  def index
    respond_to do |format|
      format.html { render_spa }
      format.json { render json: { articles: Articles::Index.call!(params: params).articles } }
    end
  end

  def show
    render json: { article: @article }
  end

  def new
    render layout: 'application', html: ''
  end

  def create
    article = Article.new(article_params)

    if article.save
      render json: { article: article }, status: :created
    else
      render json: { errors: article.errors }, status: :unprocessable_entity
    end
  end

  def edit
    render layout: 'application', html: ''
  end

  def update
    if @article.update(article_params)
      render json: { article: @article }
    else
      render json: { errors: @article.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @article.destroy
    render body: {}, status: :no_content
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:story_id, :name, :kind, :text)
  end
end
