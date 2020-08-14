class FavoritesController < ApplicationController

  def index
    favorites = Favorite.all
    render json: favorites
  end

  def create
    favorite = Favorite.find_by(params[:id])
    render json: favorite
  end

  def update
    favorite = Favorite.find_by(params[:id])
    favorite.update!(favorite_params)
    render json: favorite
  end

  def destroy
    favorite = Favorite.find_by(params[:id])
    favorite.destroy!
    render json: {}
  end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :sign_object_id)
  end


end
