RichwebAssignment::Application.routes.draw do
  resources :votes


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

  #routes for forums, topics and posts
  constraints do
#forums
  controller :forums do
    get 'forums' => :index, as: :forums
    post 'forums' => :create

    get 'forums/new' => :new, as: :new_forum
    get 'forums/:id(.:format)/edit' => :edit, as: :edit_forum
    put 'forums/:id(.:format)' => :update
    
    delete 'forums/:id(.:format)' => :delete
  end

#topics
    match '/forums/:forum_id(.:format)' => 'topics#index', as: :forum_topics 
    match '/forums/:forum_id(.:format)/topics/new' => 'topics#new',as: :new_forum_topic, via: :get
    match '/forums/:forum_id(.:format)/topics' => 'topics#create', as: :forum_topic, via: :post
    match '/forums/:forum_id(.:format)/:topic_id(.:format)/edit' => 'topics#edit', as: :edit_forum_topic
    match '/forums/:forum_id(.:format)/:topic_id(.:format)' => 'topics#update', as: :forum_topic_id, via: :put
    
    match '/users/:user_id(.:format)/topics' => 'topics#own'

#posts
    match '/users/:user_id(.:format)/posts' => 'posts#own'
    
    match '/forums/:forum_id(.:format)/:topic_id(.:format)' => 'posts#index', as: :forum_topic_posts
    match '/forums/:forum_id(.:format)/:topic_id(.:format)/posts(.:format)' => 'posts#index', via: :get
    match '/forums/:forum_id(.:format)/:topic_id(.:format)/posts(.:format)' => 'posts#create', as: :forum_topic_post,via: :post

    match '/forums/:forum_id(.:format)/:topic_id(.:format)/:post_id(.:format)/edit' => 'posts#edit',as: :edit_forum_topic_post, via: :get
    match '/forums/:forum_id(.:format)/:topic_id(.:format)/:post_id(.:format)' => 'posts#update', as: :forum_topic_post_id, via: :put                  
  end

  root :to => 'main#index'

end
