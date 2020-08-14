class SignObjectController < ApplicationController

  def index
    sign_objects = SignObject.all
    render json: sign_objects
  end

  def create
    sign_object = SignObject.find_by(params[:id])
    render json: sign_object
  end

  def update
    sign_object = SignObject.find_by(params[:id])
    sign_object.update!(favorite_params)
    render json: sign_object
  end

  def destroy
    sign_object = SignObject.find_by(params[:id])
    sign_object.destroy!
    render json: {}
  end

  private

  def favorite_params
    params.require(:sign_object).permit(:description)
  end

end
