class Vote < ActiveRecord::Base
  attr_accessible :post_id, :topic_id, :user_id

  belongs_to :user
  belongs_to :topic
  belongs_to :post
end
