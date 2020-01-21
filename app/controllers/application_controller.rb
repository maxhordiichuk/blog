class ApplicationController < ActionController::Base
  def render_spa
    render layout: 'application', html: ''
  end
end
