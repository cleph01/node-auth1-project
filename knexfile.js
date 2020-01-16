// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    // necessary when using sqlite3
    useNullAsDefault: true,
    connection: {
      filename: './data/auth-app.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  }

};
