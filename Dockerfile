# Set the base image first
FROM node:4.3

# Specify maintainer(s)
MAINTAINER Tarmo Leppänen <tarmo.leppanen@protacon.com>

# Basics
RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby
RUN gem install sass

# Install gulp and bower globally
RUN npm install gulp -g
RUN npm install bower -g

# Create direcory for application and set it as workdir
RUN mkdir /frontend
WORKDIR /frontend

# Copy all necessary stuff to docker
COPY . /frontend

# Install all dependencies; npm + bower
RUN npm install
RUN ./node_modules/bower/bin/bower install --allow-root

# Set default ENV variable
ENV BADGE_BACKENDURL http://localhost/

# Expose port 4000
EXPOSE 4000

# And finally create dist version and serve it
CMD gulp dist && gulp production
