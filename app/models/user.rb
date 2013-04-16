#This is the model file for users, it contains the validations of username, password and email address
#It also contains the methods to authenticate the users, encript the password and check admin

#The code is based on Iteration I1: Adding Users of Chapter 14 
#in book "Agile Web Development with Rails Fourth Edition"

require 'digest/sha2'
class User < ActiveRecord::Base
  has_many :codes
  has_many :topics
  has_many :posts
  has_many :notes

  attr_accessor :password_confirmation
  attr_reader :password
  
  attr_accessible :email, :password, :username, :password_confirmation
  validates :username, :presence => true, :uniqueness => true
  validates :password, :confirmation => true  
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: true
  

  validate :password_must_be_present

  class << self
    def User.authenticate(username, password)
    	@username = username
    if user = User.find(:first, :conditions => ["username = ?", username])
      if user[:hashed_password] == encrypt_password(password, user[:salt])
        user
      end
    end
  end

  def User.encrypt_password(password, salt)
    Digest::SHA2.hexdigest(password + "wibble" + salt)
  end

  end

  # 'password' is a virtual attribute
  # Used the hashed_password attribute but show about the password

  def password=(password)
    @password = password

    if password.present?
      generate_salt
      self.hashed_password = self.class.encrypt_password(password, salt)
    end
  end
  
  private

    def password_must_be_present
      errors.add(:password, "Missing password") unless hashed_password.present?
    end
  
    def generate_salt
      self.salt = self.object_id.to_s + rand.to_s
    end

  #check if the user is the administrator
  def self.check_admin(username)
    if !username.present?
      return false
    else
      if username == "Admin"
        return true
      else
        return false
      end
    end
  end
end
