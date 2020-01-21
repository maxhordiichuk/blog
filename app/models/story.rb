class Story < ApplicationRecord
  has_many :articles, inverse_of: :story, dependent: :destroy
  has_one :recent_article, -> { merge(Article.recent_by_story) }, class_name: 'Article', inverse_of: :story

  validates :name, presence: true
end
