# MongoDB Atlas Guide

MongoDB has a new cloud-based Atlas feature that has replaced M Lab. Unfortunately, it's also much more complicated for setting up simple databases.

### Build your first "cluster"

Cluster basically means database. If you already have a cluster created (You see text like Cluster0), you can skip all these steps and go to "Create your database user".

1. Sign up for <http://cloud.mongodb.com>

2. Go to "Create New Cluster" (if it isn't already selected)

3. By default, typically, AWS, and a FREE TIER AVAILABLE cluster should be selected, but if it isn't, make sure you select those.

4. At the bottom of your screen, there should be a bar that has a `Create Cluster`, there should be the words "FREE" and "Free forever!" or something

5. Click the `Create Cluster` button.

6. It will then take you a "creating cluster page". It will warn you that it could take 5-10 minutes to create your cluster and get it ready. Some students have reported it has taken even longer than that. Cross your fingers that it will only take a few minutes!

7. Refresh after a bit of time to see if it has been created. If it was successful you should see something like `Cluster0` in big text with some graphs about performance of your (currently) empty DB


### Create your database user

Every time you want to use your cluster, you will have to follow this procedure of whitelisting your IP.

1. Once your cluster is created, click the `CONNECT` gray button underneath it's name.

2. Look under the `(2) Create a MongoDB User`, write a Username (can be anything, make it simple and easy to remember, this will just be for your app / teammates), and password (should only be alphanumeric, so just click the "Autogenerate Secure Password" is a good idea). Now, write down somewhwere this username and password. For example: dbUser and aB9OKFdCJmP9flZu

3. Now, click `[Create a MongoDB User]` button

* **Note:** For username and password, pick ones that are just alphabetical or alphanumeric, since you'll be having to include this in configuration and it's easy to mess up if you include special characters.


### Whitelist your IP address

By default, MongoDB bans everybody, except IP addresses on the "whitelist" (like a guestlist for IPs).

1. Look under `(1) Whitelist your connection IP address`

2. Click the green button `Add Your Current IP Address`

3. Click the green button `Add IP Address`



**Recommended:** Add `0.0.0.0/0` in addition / instead of your current IP
address. This will whitelist ALL IP addresses. (Less secure, but more
convenient for development.)


**Explaination:** While building your app or before launching, if it gets too
annoying to continually whitelist IP addresses, you might want to whitelist a
"wildcard" IP address that will allow all connections going forward. To do
that, add the special code `0.0.0.0/0` to your whitelist, which is means "allow
ANY IP addresses".  The reason is when you work somewhere else -- e.g. your
home, coffee shop, office, school, etc -- Your IP address changes when you
change connections, so unless you add the wildcard as above, you may have to
repeat the previous steps to add your new IP to the whitelist. You will know if
an IP address is not working if you are positive everything is correctly set
up, but you are still getting a "failing to connect" error.


### Connect to your cluster

The first connection we should do will be to connect in a terminal, to test everything and make sure it works. If you want, you can skip this section, and go to the next, setting up MERN.

1. Click `Choose a connection method` green button

2. Click Connect with the Mongo Shell

3. Click the "I have the Mongo Shell installed" (since you should have that)

4. Look at `(2) Run your connection string in the command line`, and copy the command you see there. Depending on the command they give you, you might have to replace the `<password>` with the password you created when you created a MongoDB user, or you might have to enter it in after you run the command.

5. Paste it into a terminal

If all goes well, it should spit out lots of warnings and even some error messages, but in the end show a prompt with a `> `.

You should be able to test some Mongo commands here, if you wish:

    db.testCollection.insertOne({test: 'stuff'})
    db.testCollection.find({})


### Connect your cluster to your MERN backend

Now, you want to have your MERN backend connect to your MongoDB database.

1. Click `[Go Back]` if necessary, so you are at the `Choose a connection method` step

2. Click the `Connect Your Application` button

3. Copy the `Connection String Only`

4. In your MERN starter, create a `.env.local` file that has the following line:

    export MONGODB_URI='mongodb+srv://dbUser:<password>@cluster0-udki0.mongodb.net/test'

NOTE: You will have to replace everything between the quotes with the string that you got from Atlas. Also, you will have to change the `<password>` to be the password you created before.

5. Now, run `run.sh` and the test application should work!


