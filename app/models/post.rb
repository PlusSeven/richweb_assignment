class Post < ActiveRecord::Base
  attr_accessible :status, :text, :topic_id, :user_id, :vote

  has_many :votes
  
  belongs_to :user
  belongs_to :topic
end
