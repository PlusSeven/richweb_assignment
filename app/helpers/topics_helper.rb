module TopicsHelper

	def topic_post_number(topic)
		posts  = topic_posts_count(topic) #topic.posts_count
		number_to_human posts
	end

	def topic_posts_count(topic)
		posts = Post.find_by_sql("select * from posts where topic_id = #{topic.id}")
		posts.count
	end

	def topic_status(topic)
		if topic.status == 'Solved'
			"[#{topic.status}]"
		else
			''
		end
	end

	#This method is used to check the lastest active time for this topic

	def topic_latest_active_for(topic)
	    if topic.updated_at.present?
	      relativetime = content_tag :abbr, class: 'timeago', title: topic.updated_at.strftime('%Y-%m-%dT%H:%M:%S') do
	        topic.updated_at.strftime('%b %d, %Y %I:%M:%S')
	      end
	      relativetime
    
	    else
	      ''
	    end
	end

	# get the latest time(updated_at for topic) and then check the post and topic updated_at time if matches
	def topic_latest_user_for(topic)
		if topic.user_id.present? #at least one topic      
	      #find the user in the post where updated_at = topic updated_at
	      post = Post.find(:first, :conditions => ["updated_at = ?", topic.updated_at])
	      
	      if !post.nil?
	      	user = User.find(:first, :conditions => ["id = ?", post.user_id])
	      else
	      	user = User.find(:first, :conditions => ["id = ?", topic.user_id])    	
	      end
	      	'by ' + user.username
	    else
	      ''
	    end
	end

	#this method let the user link to the forum
	def link_to_forum(topic)
		link_text = ''

		if topic.forum_id.present?
			forum = Forum.find(:first, conditions: ["id = ?",topic.forum_id])
	    	if forum.name.nil?
	      		link_text == ''
	    	else
	      		link_text = link_to forum.name, "/forums/#{forum.id}", :class => "forum_tags"
	    	end
	    else
	    	link_text = ''
	    end

	      link_text
	end

	#this method let the user link to the relevant course
	def link_to_course(coursename)
		if coursename == "Binary Search Tree"
			coursename = "BST"
		end
		
		course = Course.find(:first, conditions: ["name = ?", coursename])

		if course.present?
	      	link_text = link_to coursename, "/courses/#{coursename}", :class => "forum_tags"
	    else
	    	link_text = ''
	    end

	      link_text
	end


	#get the created time and the user name
	def get_created_at(topic)
		text = ''

		if topic.created_at.present?
			text = "Created at #{topic.created_at.strftime('%b %d, %Y %I:%M:%S')} "
			
		else
			text = ''
		end

		text
	end

	#get the created time and the user name
	def get_created_by_user_topic(topic)
		text = ''

		if topic.user_id.present?
			user = User.find(:first, conditions: ["id = ?", topic.user_id])
			if user.username.present?
				text = " #{user.username}"
			else
				text = ''
			end
		else
			text = ''
		end

		text
	end

end
