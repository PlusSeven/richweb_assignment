class Topic < ActiveRecord::Base
  attr_accessible :description, :forum_id, :status, :subject, :user_id, :vote

  has_many :posts, :dependent => :destroy #when the topic is deleted, all the posts are deleted
  belongs_to :user
  belongs_to :forum

  belongs_to :last_user, class_name: 'User', foreign_key: 'last_user_id'

  validates :subject, :presence => true, :uniqueness => true
  validates :description, :presence => true
end
