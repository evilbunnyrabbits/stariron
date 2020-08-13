class Favorite < ApplicationRecord
  belongs_to :sign_object
  belongs_to :users
end
