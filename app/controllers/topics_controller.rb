#This file is to control the topics which are questions for the courses in forums
class TopicsController < ApplicationController

  def index
    #display all the questions for the relevant course 
    @forum = Forum.find(params[:forum_id]) # for the url in view
    
    #The order of questions are displayed according to the votes
    @topics = Topic.find(:all,:order => "vote DESC", :conditions => ["forum_id = ?", params[:forum_id]])
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @topics }
    end

    #when can't find the forum id with mistype
    rescue ActiveRecord::RecordNotFound
      render_404  
  end

  def own
    #Get my questions and display all the answers depend on the create time
    @topics = Topic.find(:all, conditions: ["user_id = ?", Integer(params[:user_id])], order: "created_at desc")
  end


  def show
    @topic = Topic.find(params[:topic_id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @topic }
    end
  end

  def new
    @topic = Topic.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @topic }
    end
  end

  def edit
    @topic = Topic.find(params[:topic_id])
  end

  def create
    #create a new topic by user
    @topic = Topic.new(params[:topic])

    @topic[:user_id] = session[:user_id]
    
    @forum_id = params[:forum_id]

    @topic[:forum_id] = @forum_id

    respond_to do |format|
      if @topic.save
        #update last_user_id and forum updated time
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

  def update
    #update the topic by the author or voted by users
    @topic = Topic.find(params[:topic_id])

    #Check if pass any paramsters of votes when user vote up or vote down the questions      
    if params.has_key?(:vote)
      @vote = params[:vote]
      @vote_status = @vote[:vote]

      #Check if the user has already vote up or vote down the question
      @vote_topic = Vote.find(:first, conditions: ["user_id = ? and topic_id = ?", session[:user_id],@topic.id])
      if @vote_topic.nil?
        #if the user is new to vote, vote up to add one and vote down to decrese one
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

        #track the user for his votes
        @vote_topic_new = Vote.new
        @vote_topic_new.user_id = session[:user_id]
        @vote_topic_new.topic_id = @topic.id
        @vote_topic_new.save
      end
    end

    respond_to do |format|
      if @topic.update_attributes(params[:topic])
        #update last_user_id for the topic and the forum updated time
        Topic.update_last_user_id_topic(@topic)
        Forum.update_forum_updated_at_topic(@topic)

        if params.has_key?(:vote)
           #if the user vote the question, send back the current votes
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

  def destroy
    @topic = Topic.find(params[:topic_id])
    @topic.destroy

    respond_to do |format|
      format.html { redirect_to topics_url }
      format.json { head :no_content }
    end
  end
end
