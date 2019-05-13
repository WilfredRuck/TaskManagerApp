Rails.application.routes.draw do
  root to: 'static_pages#root'
  devise_for :users
  
  namespace :api, defaults: {format: :json} do
    resources :projects do
      resources :tasks
    end
  end
  resources :users, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
