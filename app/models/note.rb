class Note < ActiveRecord::Base
  attr_accessible :content, :course_id, :user_id

  belongs_to :course
  belongs_to :user
end
