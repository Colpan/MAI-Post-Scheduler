# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Setup some initial posts for local testing
Post.find_or_create_by!(title: "First Post", post_text: "This is the first post.", scheduled_date: 30.days.ago)
Post.find_or_create_by!(title: "Second Post", post_text: "This is the second post.", scheduled_date: 20.days.ago)
Post.find_or_create_by!(title: "Third Post", post_text: "This is the third post.", scheduled_date: 3.days.from_now)
Post.find_or_create_by!(title: "Fourth Post", post_text: "This is the fourth post.", scheduled_date: 3.hours.from_now)
Post.find_or_create_by!(title: "Fifth Post", post_text: "This is the fifth post.", scheduled_date: 1.year.from_now)
Post.find_or_create_by!(title: "Sixth Post", post_text: "This is the sixth post.", scheduled_date: 2.years.ago)
Post.find_or_create_by!(title: "Seventh Post", post_text: "This is the seventh post.", scheduled_date: 27.hours.ago)
