class PostsController < ApplicationController
  before_action :set_post, only: [:show, :rewrite]

  # GET /posts
  def index
    @posts = Post.with_photos.map(&:json_serialize)

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post.json_serialize
  end

  def rewrite
    render json: @post, status: :ok
  end

  private
    def set_post
      @post = Post.includes(:photos).find(params.expect(:id))
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Post not found' }, status: :not_found
    end
end
