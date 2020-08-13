class User < ApplicationRecord
  has_many :favorites
  has_many :sign_objects, through: :favorites
end
