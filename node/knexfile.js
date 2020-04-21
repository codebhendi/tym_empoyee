const path = require('path');

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite',
  },
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations'),
  },
};
