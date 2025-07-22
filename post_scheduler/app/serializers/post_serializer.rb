class PostSerializer
  def initialize(post)
    @post = post
  end

  def as_json
    {
      id: @post.id,
      title: @post.title,
      post_text: @post.post_text,
      scheduled_date: @post.scheduled_date,
      created_at: @post.created_at,
      updated_at: @post.updated_at,
      photos: serialized_photos
    }
  end

  private

  def serialized_photos
    @post.photos.map(&:json_serialize)
  end
end
