class Post < ApplicationRecord
  validates :title, presence: true
  validates :post_text, presence: true
  validates :scheduled_date, presence: true
end
