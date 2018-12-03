const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());

/////////////////////////////////////////////
// Logger & configuration
function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}
app.use(logger);
/////////////////////////////////////////////



//
// Example route (without use of MongoDB)
app.get('/api/some/example/route/', (request, response) => {
  console.log('Example route is being used...');

  response.json({
    someExample: 'data',
  });
});


//
// Example route (with use of MongoDB)
app.get('/api/some/example/with/mongodb/', (request, response) => {
  console.log('Example route with MongoDB is being used...');

  db.collection('nameOfCollection')
    .find({})
    .toArray((err, results) => {
      // Got data back.. send to client
      if (err) throw err;
      response.json(results);
    });
});



//
// Totally insecure backend routes, good for rapid prototyping
// DELETE before use in a real application
app.get('/api/mongodb/:collectionName/', (request, response) => {
  const collectionName = request.params.collectionName;

  // Get GET params
  const query = request.query || {};
  db.collection(collectionName)
    .find(query)
    .toArray((err, results) => {
      // Got data back.. send to client
      if (err) throw err;
      response.json(results);
    });
});

app.post('/api/mongodb/:collectionName/', (request, response) => {
  const collectionName = request.params.collectionName;
  const data = request.body;

  db.collection(collectionName)
    .insert(data)
    .toArray((err, results) => {
      // Got data back.. send to client
      if (err) throw err;
      response.json({
        'success': true,
        'results': results,
      });
    });
});


// PUT endpoint for modifying an existing item
app.put('/api/mongodb/:collectionName/', (request, response) => {
  const collectionName = request.params.collectionName;
  const data = request.body;
  const query = request.query;

  db.collection(collectionName)
    .update(query, {$set: data}, (err, results) => {
      if (err) throw err;

      // If we modified exactly 1, then success, otherwise failure
      if (results.result.nModified === 1) {
        response.json({
          success: true,
        });
      } else {
        response.json({
          success: false,
        });
      }
    });
});


// D in CRUD, delete a single item with given criteria
app.delete('/api/mongodb/:collectionName/', (request, response) => {
  const collectionName = request.params.collectionName;
  const data = request.body;
  const query = request.query;

  db.collection(collectionName)
    .deleteOne(query, (err, results) => {
      if (err) throw err;

      // If we deleted exactly 1, then success, otherwise failure
      if (results.result.n === 1) {
        response.json({
          success: true,
        });
      } else {
        response.json({
          success: false,
        });
      }
    })
});





app.post('/api/mongodb/:collectionName/', (request, response) => {
  const collection = request.params.collectionName;
});




/////////////////////////////////////////////
// Boilerplate, no need to touch what's below

// For production, handle any requests that don't match the ones above
app.use(express.static(path.join(__dirname, 'client/build')));

// Wild-card, so handle everything else
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


// Set up configuration variables
if (!process.env.MONGODB_URI) {
  console.log('- Error - Must specify the following env variables:');
  console.log("MONGODB_URI='mongodb://someUser:somePassword@something.com:1234/someDatabaseName'");
  console.log('- Consider putting into .env.local');
  process.exit(1);
}
const MONGODB_URL = process.env.MONGODB_URI;
const splitUrl = MONGODB_URL.split('/');
const mongoDbDatabaseName = splitUrl[splitUrl.length - 1];

let db;
// Connect to the MongoDB
MongoClient.connect(MONGODB_URL, (err, client) => {
  if (err) throw err;
  console.log("--MongoDB connection successful");
  db = client.db(mongoDbDatabaseName);

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`
      *********************************************
      * Insecure prototyping backend is running!  *
      * Only use for prototyping                  *
      * Backend server up at ${PORT}              *
      *********************************************
    `);
  })
});
