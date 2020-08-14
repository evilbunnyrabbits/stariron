class SignObjectController < ApplicationController

  def index
    sign_objects = SignObject.all
    render json: sign_objects
  end

end
