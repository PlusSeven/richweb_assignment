Rich Web Assignment

This repository is to manage the rich web assignment by Jiaqi Jiang(D09124234)

This project uses Ruby on Rails framework. The Ruby version is Ruby-1.9.3 and Ruby on Rails version is Rails-3.2

-------------------------------------------------------------------------------------
Steps to build and setup the project:

1. Install Ruby v1.9.3 and Ruby on Rails v3.2
  $ sudo apt-get install ruby1.9.3
  $ sudo gem install rails --version 3.2.0

2. use command to install the gems which are libraries in Gemfile
  $bundle install

3. In the config/database.yml file add the username and password for the database. 

4. The database used in this project is MySQL. To install mysql, use the command below
  $sudo apt-get install mysql-server

5. After the mysql installed successfully, you need use the mysql command-line client to create the 
database which is the same name to the database variable in config/database.yml file. And then set the privileges on the database using the "username" and "password" added in step 3
  $ mysql -u root
  > CREATE DATABASE richweb_development;
  > GRANT ALL PRIVILEGES ON richweb_development.*
  TO 'username'@'localhost' IDENTIFIED BY 'password';

6. The next step is to create the database tables using the command below
  $ rake db:migrate

7. After creating the tables, use the command to generate the sample records to the database. The records are stored in db/seeds.rb file.
  $ rake db:seed

8. Then you can run the project using the command
  $ Rails server

9. If it is successful, you can now access the system on the browser to use the URL localhost:3000
and sign in the system using the username "admin" and password "123123"

If you have any questions, please contact me through Email: d09124234@mydit.ie


------------------------------------------------------------------------------------------
Features:
1. Sign up
2. Sign in
3. Sign out
4. Operate profile

5. Learn course
	- Learn courses with information and animation
	- User can add notes for one course
6. Users can help with each other in the forum
	- Each course has one forum
	- Each forum has many topics
	- Each topic contains posts which are answers
	- User can vote the questions and answers
7. User can see his own list of questions and answers

8. See more details in the about page

------------------------------------------------------------------------------------------
Other issues

1. The JavaScript code used are basically in file course.js and views/posts/show.html.erb Some other JavaScript files in assets/javascripts are for the course animations created by Adebe Egde Animation. The JavaScript code uses Jquery-1.9.1 library.

2. The layout are based on Bootstrap and some other online websites. Some other Style code is in the bootstrap_and_overrides.css.scss file

3. The project has been tested in Chrome, Firefox and IE.

4. The HTML5 template in views/layouts/application.html.erb is generated from http://www.initializr.com/
