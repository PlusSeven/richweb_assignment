module PostsHelper
	#This method is to get the author of the answer for one question
	def get_created_by_user_post(post)
		text = ''

		if post.user_id.present?
			user = User.find(:first, conditions: ["id = ?", post.user_id])
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

	#This method is to get the link for the topic with the answer id
	#It can go to place of the answer through "My Answers"
	def link_to_topic_with_post_id(post)
		link_text = ''

		if post.topic_id.present?
			topic = Topic.find(:first, conditions: ["id = ?",post.topic_id])
	    	if topic.subject.nil? || topic.forum_id.nil?
	      		link_text == ''
	    	else
	    		forum = Forum.find(:first, conditions: ["id = ?", topic.forum_id])
	    		if forum.present?
	    			if topic.subject.length > 64
	      				link_text = link_to topic.subject[0..63] + "...", "/forums/#{forum.id}/#{topic.id}#answer_#{post.id}"
	      			else
	      				link_text = link_to topic.subject, "/forums/#{forum.id}/#{topic.id}#answer_#{post.id}"
	      			end
	      		else
	      			link_text = ''
	      		end
	    	end
	    else
	    	link_text = ''
	    end
	      link_text
	end

	# This method is to get the post content in a limited length
	def get_post_content(post)
		text = ''

		if post.text.present?
			text = post.text
			if text.length > 96
				text = text[0..95] + "..."
			else
				text
			end
		else
			text = ''
		end
	end

	#get the number of posts
	def posts_count(posts)

		if posts.nil?
			0
			else
				posts.count
			end

	end

end
