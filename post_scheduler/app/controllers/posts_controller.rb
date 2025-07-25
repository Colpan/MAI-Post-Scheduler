class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :rewrite]

  # GET /posts
  def index
    @posts = Post.with_photos.map(&:json_serialize)

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post.json_serialize
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post.json_serialize, status: :success
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
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

    def post_params
      params.expect(post: [:title, :post_text, :scheduled_date])
    end
end
