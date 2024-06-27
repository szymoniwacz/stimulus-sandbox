# Stimulus Sandbox

This Rails application demonstrates a simple to-do list using Rails 7, Stimulus JS, and PostgreSQL.
It includes functionality to add to-do items, mark them as checked, and dynamically update their appearance using Stimulus.

## Features

- Add to-do items via a text input.
- Mark items as checked with a checkbox.
- Items marked as checked will display with a strikethrough style.
- Use of Rails 7 with Import Maps and Stimulus for front-end interactions.
- Persistent storage of to-do items using PostgreSQL.

## Setup

To get the project running locally, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://your-repository-url.git
   cd stimulus-sandbox
   ```

2. Install the required Ruby gems:

   ```
   bundle install
   ```

3. Setup the database:

   ```
   rails db:create
   rails db:migrate
   ```

4. Start the Rails server:

   ```
   rails server
   ```

5. Visit `http://localhost:3000` in your web browser to view the application.

## License

This project is open source and available under the [MIT License](LICENSE).
