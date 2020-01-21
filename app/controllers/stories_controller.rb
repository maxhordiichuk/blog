class StoriesController < ApplicationController
  def index
    respond_to do |format|
      format.html { render_spa }
      format.json { render json: { stories: Story.all } }
    end
  end
end
