class PhotoSerializer
  def initialize(photo)
    @photo = photo
  end

  def as_json
    {
      caption: @photo.caption,
      photo_url: @photo.photo_url
    }
  end
end
