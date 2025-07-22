class Photo < ApplicationRecord
  belongs_to :post

  validate :correct_photo_type

  has_one_attached :photo do |attachable|
    attachable.variant :facebook, resize_to_limit: [1200, 630]
    # FB or Instagram can use square
    attachable.variant :square, resize_to_limit: [1080, 1080]
    attachable.variant :instagram_vertical, resize_to_limit: [1080, 1350]
    attachable.variant :instagram_landscape, resize_to_limit: [1080, 566]
    attachable.variant :twitter, resize_to_limit: [1600, 900]
    attachable.variant :linkedin, resize_to_limit: [1200, 1200]
    attachable.variant :thumb, resize_to_limit: [100, 100]
  end

  def json_serialize
    PhotoSerializer.new(self).as_json
  end

  def photo_url
    return nil unless photo.attached?
    
    Rails.application.routes.url_helpers.rails_blob_url(photo, only_path: false)
  end

  private
  
  def correct_photo_type
    return unless photo.attached? && !photo.content_type.in?(%w[image/jpeg image/png image/gif])

    errors.add(:photo, 'must be a JPEG, PNG, or GIF')
  end
end
