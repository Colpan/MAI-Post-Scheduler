class PostsController < ApplicationController
  before_action :set_post, only: [:show]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  private
    def set_post
      @post = Post.find(params.expect(:id))
    end
end
