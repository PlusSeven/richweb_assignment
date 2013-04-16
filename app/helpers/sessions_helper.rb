#The methods in the helper are used to check sessions
#The code are based on the Chapter 8 Sign in, sign out 
#in the book "Ruby on Rails Tutorial"

module SessionsHelper
  def sign_in(user)
    self.current_user = user
    session[:username] = user[:username]
    session[:user_id] = user[:id]
  	end

  def signed_in?
    !current_user.nil?
  end
  
  def sign_out
    self.current_user = nil
    session[:username] = nil
    session[:user_id] = nil
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user
    @current_user     # Useless! Don't use this line.
  end
end
