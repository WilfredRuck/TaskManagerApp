class Api::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @projects = current_user.projects.includes(:tasks)
    render json: @projects
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user
    @project.save
    render :show
  end

  private

  def project_params
    params.require(:project).permit(:name)
  end
end
