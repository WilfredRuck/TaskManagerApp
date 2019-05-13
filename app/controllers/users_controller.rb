class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @tasks = @user.tasks.select{ |task| task.completed == true }
  end

end
