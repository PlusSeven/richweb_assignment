class ApplicationController < ActionController::Base
  #need authorize the users before most of the pages
  before_filter :authorize
  
  protect_from_forgery


  include SessionsHelper

  protected
	def authorize
		unless User.find_by_id(session[:user_id])
			redirect_to signin_url
		end
	end

	#page not fonud
	def render_404
	  respond_to do |format|
	    format.html { render :file => "#{Rails.root}/public/404.html", :status => :not_found }
	    format.json  { head :not_found }
	  end
	end
	
end
