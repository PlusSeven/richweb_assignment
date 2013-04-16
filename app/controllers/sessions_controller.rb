#This is the controller for sessions when signin
#The code is based on Iteration I2: Authenticating Users of Chapter 14 
#in book "Agile Web Development with Rails Fourth Edition"

class SessionsController < ApplicationController
  skip_before_filter :authorize
  def new
    if session[:user_id].present?  
      redirect_to root_url
    end
  end

  def create
  	if user = User.authenticate(params[:username], params[:password])
		  sign_in user
		  redirect_to root_url
	  else
		  redirect_to signin_url, :notice => "Invalid username/password!"
	  end

  end

  def destroy
  	sign_out
    redirect_to root_url
  end
end
