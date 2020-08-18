# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
SignObject.destroy_all
Favorite.destroy_all

user1 = User.create(name: "Test_User", birthday: "2015-12-08")

sign_object1 = SignObject.create(description: "My First Favorite Sign")
sign_object2 = SignObject.create(description: "My Second Favorite Sign")
sign_object3 = SignObject.create(description: "My Third Favorite Sign")

favorite1 = Favorite.create(user_id: user1.id, sign_object_id: sign_object1.id)
favorite2 = Favorite.create(user_id: user1.id, sign_object_id: sign_object2.id)
favorite3 = Favorite.create(user_id: user1.id, sign_object_id: sign_object3.id)

puts user1.id