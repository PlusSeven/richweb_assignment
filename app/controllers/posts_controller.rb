class PostsController < ApplicationController
  # GET /posts
  # GET /posts.json
  def index
    @forum = Forum.find(:first, conditions: ["id = ?", params[:forum_id]])
    @topic = Topic.find(:first, conditions: ["id = ?", params[:topic_id]])
    @posts = Post.find(:all, conditions: ["topic_id = ?", @topic.id])
    
    
    @post = Post.new
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end

  def own
    @posts = Post.find(:all, conditions: ["user_id = ?", session[:user_id]], order: "updated_at desc")
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:post_id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.json
  def new
    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:post_id])
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(params[:post])

#create with the user_id, topic_id
    @post[:user_id] = session[:user_id]
    @post[:topic_id] = params[:topic_id]

    respond_to do |format|
      if @post.save
        #update last_user_id
    Topic.update_last_user_id_post(@post)
    Forum.update_forum_updated_at_post(@post)
        format.html { redirect_to forum_topic_posts_path, notice: 'Post was successfully created.' }
        format.json { render json: @post, status: :created, location: @post }
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update
    @post = Post.find(params[:post_id])

    if params.has_key?(:status)
      status = @post.update_attributes(params[:status])
      @topic = Topic.find(params[:topic_id])
      @topic.update_attributes(params[:status])
    else
      status = @post.update_attributes(params[:post])
    end

    
      
    if params.has_key?(:vote)
      @vote = params[:vote]
      @vote_status = @vote[:vote]

      @vote_topic = Vote.find(:first, conditions: ["user_id = ? and post_id = ?", session[:user_id],@post.id])
      if @vote_topic.nil?
        if @vote_status == "up"
          if @post.vote.present?
            @post.vote = @post.vote + 1
          else
            @post.vote = 1
          end
        elsif @vote_status == "down"
          if @post.vote.present?
            @post.vote = @post.vote - 1
          else
            @post.vote = -1
          end
        end

        @vote_topic_new = Vote.new
        @vote_topic_new.user_id = session[:user_id]
        @vote_topic_new.post_id = @post.id
        @vote_topic_new.save
        status = @post.update_attributes(params[:post])

      end
    end



    respond_to do |format|
      #update last_user_id
    Topic.update_last_user_id_post(@post)
    Forum.update_forum_updated_at_post(@post)
      if status
        if params.has_key?(:vote)
          format.json { render json: @post.vote.to_json} 
        else
          format.html { redirect_to forum_topic_posts_path}
          format.json { head :no_content }
        end

      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:post_id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end
end
