class Section < ActiveRecord::Base
  attr_accessible :code, :course_name, :description, :name
  
  belongs_to :course
  validates :description, :uniqueness => true
end
