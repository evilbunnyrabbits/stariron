
class UsersController < ApplicationController


  def index
    users = User.all
    render json: users
  end

  def create
    user = User.find_by(params[:id])
    render json: user
  end

  def update
    user = user.find_by(params[:id])
    user.update!(favorite_params)
    render json: user
  end

  def destroy
    user = User.find_by(params[:id])
    user.destroy!
    render json: {}
  end

  private

  def favorite_params
    params.require(:user).permit(:name)
  end

end