class Api::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    @tasks = Project.find(params[:project_id]).tasks
    render json: @tasks
  end

  def create
    @task = Task.new(task_params)
    @task.project_id = params[:project_id] 
    @task.save
    render :show
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    render :show
  end

  private

  def task_params
    params.require(:task).permit(:name, :completed, :project_id)
  end

end
