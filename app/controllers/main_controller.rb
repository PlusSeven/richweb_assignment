#The user can look at the main page before sign in

class MainController < ApplicationController  
  skip_before_filter :authorize
  
  def index
  end
end
