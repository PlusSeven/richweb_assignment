class Forum < ActiveRecord::Base
  attr_accessible :description, :name

  has_many :topics, :dependent => :destroy # when the forum delete, all topics are deleted

  # TThese two methods are to update the forum updated_at time, which can display in the forums page
  
  def self.update_forum_updated_at_topic(topic)
	forum = Forum.find(:first, :conditions => ["id = ?", topic[:forum_id]])

	if !forum.nil?
		forum[:updated_at] = topic[:updated_at]
		forum.save
	end
  end


  def self.update_forum_updated_at_post(post)
    #@forum = Forum.find_by_sql("select distinct(*) from forums join topics on topics.forum_id = forums.id join posts on posts.topic_id = topics.id where posts.topic_id = #{post[:topic_id]}")
    @topic = Topic.find(:first, :conditions => ["id = ?", post[:topic_id]])
    @forum = Forum.find(:first, :conditions => ["id = ?", @topic[:forum_id]])

    if !@forum.nil?
      @forum[:updated_at] = post[:updated_at]
      @forum.save
    end
  end
end
