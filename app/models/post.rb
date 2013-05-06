class Post < ActiveRecord::Base
  attr_accessible :last_user_id, :status, :text, :topic_id, :user_id, :vote

  belongs_to :user
  belongs_to :topic
end
