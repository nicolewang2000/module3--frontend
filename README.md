# BOOKCLUB!

BOOKCLUB! is a simple web-based platform for sharing, discovering, and creating different drinks.

## Setup

* BOOKCLUB! runs on Ruby 2.6.1 and Rails 6.0.3.2.

* If you would like to run this on your local Rails server: fork/clone both `module3--frontend` and `module3--backend`. On `module3--frontend`, `bundle install`, `rails db:migrate`, `rails db:seed` to seed the database with some sample users and groups, then `rails s` to start the local server. One thing to note: if `rails db:migrate` does not seem to be working, type in `rails c` in your terminal to access the console and copy the top half of the seed file first and when that finishes running, copy the bottom half in your console. 

## Homepage/ Signup / Login
* When you first encounter the site, it shows the main page with the signup button. Clicking on the button will redirect you to the signup page. Once you create an account, you'll be redirected to the login page. If you have an account already, just click Login at the navigation bar on top. You will not have access to the directory page unless you are logged in. Click to test what will happen if you try. 

## Directory 
* You do not have access to the signup button when you are logged in. Click to see what happens if you try. 
* When you Login, you can create a new drink, search for a drink, and get a random drink to create - if you're feeling adventurous. Note that it'll take time for the database to generate the first random drink so while you're waiting for that to load, enjoy the spinner. 
* When you're in the search bar, clicking on X will clear the search entry.
* You can rate other drinks which will automatically update the drink's average rating. 
* You can only delete drinks you've created.

