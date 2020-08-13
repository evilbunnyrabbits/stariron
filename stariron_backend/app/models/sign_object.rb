class SignObject < ApplicationRecord
  has_many :favorite
  has_many :users, through: :favorite
end
