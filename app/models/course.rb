class Course < ActiveRecord::Base
  attr_accessible :description, :name

  has_many :sections
  has_many :notes
  
  validates :name, :uniqueness => true
end
