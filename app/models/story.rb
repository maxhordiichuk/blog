class Story < ApplicationRecord
  has_many :articles, inverse_of: :story, dependent: :destroy

  validates :name, presence: true
end
