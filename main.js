'use strict';
const { db } = require('./server/db/models');
const app = require('./server');
const PORT = process.env.PORT || 8080;
// eslint-disable-next-line no-trailing-spaces
db.sync().then(() => {
  console.log('db synced');
  app.listen(PORT, () =>
    console.log(`studiously serving silly sounds on port ${PORT}`)
  );
});
