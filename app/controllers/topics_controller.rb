class TopicsController < ApplicationController
  # GET /topics
  # GET /topics.json
  def index
    @forum = Forum.find(params[:forum_id]) # for the url in view
    @topics = Topic.find(:all,:order => "created_at DESC", :conditions => ["forum_id = ?", params[:forum_id]])
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @topics }
    end

    #when can't find the forum id with mistype
    rescue ActiveRecord::RecordNotFound
      render_404  
  end

  def own
    @topics = Topic.find(:all, conditions: ["user_id = ?", Integer(params[:user_id])], order: "created_at desc")
  end


  # GET /topics/1
  # GET /topics/1.json
  def show
    @topic = Topic.find(params[:topic_id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @topic }
    end
  end

  # GET /topics/new
  # GET /topics/new.json
  def new
    @topic = Topic.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @topic }
    end
  end

  # GET /topics/1/edit
  def edit
    @topic = Topic.find(params[:topic_id])
  end

  # POST /topics
  # POST /topics.json
  def create
    @topic = Topic.new(params[:topic])

    @topic[:user_id] = session[:user_id]
    
    @forum_id = params[:forum_id]

    @topic[:forum_id] = @forum_id

    respond_to do |format|
      if @topic.save
        #update last_user_id
        Topic.update_last_user_id_topic @topic
        Forum.update_forum_updated_at_topic(@topic)

        format.html { redirect_to forum_topics_path}
        format.json { render json: @topic, status: :created, location: @topic }
      else
        format.html { render action: "new" }
        format.json { render json: @topic.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /topics/1
  # PUT /topics/1.json
  def update
    @topic = Topic.find(params[:topic_id])

    if params.has_key?(:vote)
      @vote = params[:vote]
      @vote_status = @vote[:vote]

      @vote_topic = Vote.find(:first, conditions: ["user_id = ? and topic_id = ?", session[:user_id],@topic.id])
      if @vote_topic.nil?
        if @vote_status == "up"
          if @topic.vote.present?
            @topic.vote = @topic.vote + 1
          else
            @topic.vote = 1
          end
        elsif @vote_status == "down"
          if @topic.vote.present?
            @topic.vote = @topic.vote - 1
          else
            @topic.vote = -1
          end
        end
        @vote_topic_new = Vote.new
        @vote_topic_new.user_id = session[:user_id]
        @vote_topic_new.topic_id = @topic.id
        @vote_topic_new.save
      end
    end

    respond_to do |format|
      if @topic.update_attributes(params[:topic])
        #update last_user_id
        Topic.update_last_user_id_topic(@topic)
        Forum.update_forum_updated_at_topic(@topic)

        if params.has_key?(:vote)
          format.json { render json: @topic.vote.to_json}
        else
          format.html { redirect_to forum_topics_path}
          format.json { head :no_content }
        end
      else
        format.html { render action: "edit" }
        format.json { render json: @topic.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /topics/1
  # DELETE /topics/1.json
  def destroy
    @topic = Topic.find(params[:topic_id])
    @topic.destroy

    respond_to do |format|
      format.html { redirect_to topics_url }
      format.json { head :no_content }
    end
  end
end
