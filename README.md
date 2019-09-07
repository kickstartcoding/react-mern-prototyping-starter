![Kickstart Coding Logo](./client/public/kickstart_coding_logo.png)

# MERN Prototyping Starter

This is an example start project for [Kickstart Coding](http://kickstartcoding.com/)
MERN MVP projects.

It provides a solid foundation for building a MERN project that's ready to
launch to Heroku or similar web-hosting service.

**DO NOT** use this project as-is in production. It exposes an API to MongoDB
without any sort of security. The only purpose of the API is to allow rapid
front-end prototyping without much (or any) backend modifications. See the
"Securing the backend" section below for more info.

## About

### Features

* `react` and `react-router` are set-up in a normal, `create-react-app` layout
    * Does NOT use Redux, to keep things simpler

* Example blogging single page app App that does all four CRUD operation in a
  heavily commented way, for examples to do everything

* MongoDB, Express, and Node.js are set-up
    * Does NOT use Mongoose, to keep things simpler
    * Purposefully exposes the MongoDB API to the front-end for
      rapid-prototyping without the need of doing any back-end coding

* Handy `run.sh` script that brings in a `.env.local` file for configuration

* Ready-to-go to launch to Heroku


### Who is this for

* This is for **new JavaScript/Reeact programmers**, including **coding class
  students** who want a solid start for a React project and want to create
  application prototypes without having to touch any backend coding, while
  keeping the option open to transition to a secure MERN stack.

* The documentation assumes you already have fundamental JavaScript, React, Bash
  and Heroku knowledge. If you are new to Heroku, read our [Heroku Getting
  Started guide](http://github.com/kickstartcoding/heroku-getting-started/).

* The documentation *does not* explicitly support Windows. It assumes you use
  either **macOS** or a **GNU/Linux** distribution such as Ubuntu. That said,
  it might work.

> This was original created for Kickstart Coding, the affordable,
> inclusive, and intensive coding course teaching cutting-edge Python /
> Django and JavaScript / React web development in Oakland, CA.
> [Learn more and enroll here.](http://kickstartcoding.com/?utm_source=github&utm_campaign=cheatsheets)

## Usage

### Set-up

1. Get the code. You can either download this repo as a tar.gz or zip file,
then extract, do a git pull and copy over the files into your project, or fork
this project.

2. Set-up your MongoDB database.

    - Either set-up a [MongoDB Atlas](https://cloud.mongodb.com) database
      testing purposes with your team (easiest). A full guide for this is
      included here, in the included
      [`mongodb_atlas_guide.md`](./mongodb_atlas_guide.md)

    - Or install and configure a local DB for testing

3. Create a ".env.local" file, that contains your credentials. If you followed
the [`mongodb_atlas_guide.md`](./mongodb_atlas_guide.md) tutorial, you will
have already done this.

    - This file WILL NOT go into your git repo (because it is in .gitignore).
      If you will be using the supplied run.sh, it should be in the following
      format:

        export MONGODB_URI='mongodb://USERNAME:PASSWORD@something.com:1234/DB_NAME'

    - Where USERNAME and PASSWORD is replaced with an actual username and
      password on the MongoDB. In the case of MongoDB Atlas, you will have to
      create a username and password as a separate step (see the
      [`mongodb_atlas_guide.md`](./mongodb_atlas_guide.md))

4. NPM install backend:

    npm install

5. NPM install frontend:

    cd client
    npm install


### Running

For local development, use the included "run.sh" Bash script:

    bash run.sh

Look inside the script. Can you understand what it is doing?  It's main goal is
just to save you the steps of opening up two terminal windows or tabs. You can,
however, still do that method, it's up to you.


### Heroku

The `.env.local` file does not get copied over to Heroku.  If you want to use
your MongoDB Atlas database on Heroku, you will need to configure it with
Heroku. Use a command like below, except with the same string you did in the
previous steps (`.env.local`):

    heroku config:set MONGODB_URI='mongodb://someUser:...'


To ensure Heroku has the right configuration values set (which should occur
after you have done `heroku create` to make a new Heroku app), do a command
like the following:


    heroku config

You should see your `MONGODB_URI` specified, something like:

    MONGODB_URI  mongodb://someUser:somePassword@something.com:1234/someDatabaseName 

Launching to Heroku is like any other app:

    git push heroku master


# Understanding the code

Once you have it locally running, try the following:

1. Create an article

2. View the articles API using localhost:8080/api/mongodb/blogposts/


# Securing the backend

After the prototype is built, the backend can be incrementally secured by
creating custom routes that do the logic required for your application, and
delete each generic / insecure route. For example, instead of allowing deletion
of ANY documents, it could only allow queries in a certain format to only
delete from a certain collection, relevant to your application. Also, you may
consider using an authentication framework for Express.js, such as Passport.

Once you replace a given insecure route, and make the front-end use the new
route, you can delete the old route.

Once you have deleted ALL of the generic / in-secure routes, and only have
custom and securely written routes, then this prototyping set-up will be as
secure as any other typical MERN-backend.


