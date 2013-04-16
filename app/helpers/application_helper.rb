module ApplicationHelper
	def get_current_user
		user_link = ''

		if session[:username].present?
			user_link = link_to session[:username], user_path(session[:user_id])
		else
			user_link = ''
		end

		user_link
	end
end