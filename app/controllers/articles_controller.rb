class ArticlesController < ApplicationController
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: { articles: Articles::Index.call!(params: params).articles } }
    end
  end
end
