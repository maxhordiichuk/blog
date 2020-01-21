Rails.application.routes.draw do
  root 'articles#index'

  resources :stories, only: :index
  resources :articles
end
