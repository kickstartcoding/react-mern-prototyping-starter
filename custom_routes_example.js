// Note: This file contains some sample code, presently unused. To use the
// sample code, copy it into the spot that says "YOUR ROUTES GO HERE".

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

