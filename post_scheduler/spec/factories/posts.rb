FactoryBot.define do
  factory :post do
    title { "MyString" }
    post_text { "MyText" }
    # Use a dynamic date for scheduled_date to ensure uniqueness in tests
    scheduled_date { 7.hours.from_now }
  end
end
