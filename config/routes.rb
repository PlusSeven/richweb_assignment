RichwebAssignment::Application.routes.draw do
  resources :posts


  resources :topics


  resources :forums


  resources :sections


  controller :courses do
    get 'courses' => :index, as: :courses
    post 'courses' => :create

    get 'courses/new' => :new, as: :new_course
    get 'courses/:id(.:format)/edit' => :edit, as: :edit_course
    put 'courses/:id(.:format)' => :update
    
    delete 'course/:id(.:format)' => :delete
    match '/courses/:name(.:format)' => 'courses#show', as: :course, via: :get
  end


  get "main/index"
  match '/about' => 'main#about'
  
  controller :sessions do
    get 'signin' => :new
    post 'signin' => :create
    get 'logout' => :destroy
  end

  resources :users

  root :to => 'main#index'

end
