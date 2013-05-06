class Forum < ActiveRecord::Base
  attr_accessible :description, :name

  has_many :topics, :dependent => :destroy # when the forum delete, all topics are deleted

  def self.update_forum_updated_at_topic(topic)
	forum = Forum.find(:first, :conditions => ["id = ?", topic[:forum_id]])

	if !forum.nil?
		forum[:updated_at] = topic[:updated_at]
		forum.save
	end
  end
end
