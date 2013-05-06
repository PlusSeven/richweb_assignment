class Course < ActiveRecord::Base
  attr_accessible :description, :name

  has_many :sections
	
  validates :name, :uniqueness => true
end
