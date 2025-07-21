# Social Media Post Scheduler

The application is an API only Ruby on Rails backend to the social media post scheduler application. It serves up content on `localhost:3000` in development by default.

This project was built with:
Ruby 3.2.2
Ruby on Rails 8.0.2

Currently the project utilizes SQLite as the database.

## Installation

### Dependencies

Copy the code base locally and run

`bundle install`

with proper Ruby and bundler versions setup.

### Database

You will need to ensure the database exists and migrations have been executed.

`rails db:create`
`rails db:migrate`

Seed data has been provided if you would like to seed the database with test data. You can seed using:

`rails db:seed`

## Operation

To start the application for development, you simple run

`rails s`

## API Endpoints

### /posts

Returns a full list of post data

Return Example:
```
[{"id":1,"title":"First Post","post_text":"This is the first post.","scheduled_date":"2025-06-21T22:54:29.356-05:00","created_at":"2025-07-21T22:54:29.363-05:00","updated_at":"2025-07-21T22:54:29.363-05:00"},{"id":2,"title":"Second Post","post_text":"This is the second post.","scheduled_date":"2025-07-01T22:54:29.410-05:00","created_at":"2025-07-21T22:54:29.411-05:00","updated_at":"2025-07-21T22:54:29.411-05:00"}]
```

### /posts/:id

Returns the data associated with the post id provided

Return Example:
`/posts/2`
```
{"id":2,"title":"Second Post","post_text":"This is the second post.","scheduled_date":"2025-07-01T22:54:29.410-05:00","created_at":"2025-07-21T22:54:29.411-05:00","updated_at":"2025-07-21T22:54:29.411-05:00"}
```

## Testing

Tests are written using RSpec. To run the full test suite, you can use:

`bundle exec rspec`
