class Post < ApplicationRecord
  validates :title, presence: true
  validates :post_text, presence: true
  validates :scheduled_date, presence: true

  has_many :photos, dependent: :destroy
  
  scope :with_photos, -> { includes(:photos) }

  def json_serialize
    PostSerializer.new(self).as_json
  end

end
