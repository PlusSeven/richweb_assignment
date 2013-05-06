module ForumsHelper
  # This method is to get the number of topics and posts
  def meta_for(forum)
  	topics = forum_topics_count(forum)  # in the forum model to deal with the numbers
    posts  = forum_posts_count(forum) #forum.posts_count
    "#{number_to_human topics} questions, #{number_to_human posts} answers".downcase
  end

	#This method is used to check the lastest active time
	#The updated_at time will be updated when new post or the user has the topic edit
	def forum_latest_active_for(forum)
		topic = forum.topics.last

	    if topic.present?
	      relativetime = content_tag :abbr, class: 'timeago', title: topic.updated_at.strftime('%Y-%m-%dT%H:%M:%S') do
	        topic.updated_at.strftime('%b %d, %Y %I:%M:%S')
	      end
	      relativetime

	    else
	      ''
	    end
	end

	# active the topics
	# get the latest time(updated_at for forum) and then check the post and topic updated_at time if matches
	def forum_latest_user_for(forum)
		if forum.topics.last.present? && forum.topics.last.user_id.present? #at least one topic
	      
	      #find the user in the topic where updated_at = forum updated_at
	      if forum.updated_at.present?
		      topic_lastest = Topic.find(:first, :conditions => ["updated_at = ?", forum.updated_at])
		      if topic_lastest.present?     	
		      	uid = topic_lastest["last_user_id"]
		      	if uid.present?
		      		user = User.find(:first, :conditions => ["id = ?", uid])
		      		'by ' + user.username
		      	else
		      		''
		      	end
		      else
		      	''
		      end
		   else
		   	  ''
		   end
	    else
	      ''
	    end
	end

	def forum_topics_count(forum)
		topics = Topic.find_by_sql("select * from topics where forum_id = #{forum.id}")
		topics.count
	end

	def forum_posts_count(forum)
		posts = Post.find_by_sql("select * from posts join topics on posts.topic_id = topics.id where forum_id = #{forum.id}")
		posts.count
	end

end
