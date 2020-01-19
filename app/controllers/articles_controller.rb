class ArticlesController < ApplicationController
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: { articles: Article.all } }
    end
  end
end
