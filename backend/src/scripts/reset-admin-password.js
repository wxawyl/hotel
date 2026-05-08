const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../../database/hotel.db'));

const username = 'admin';
const newPassword = 'admin123';
const hashedPassword = bcrypt.hashSync(newPassword, 10);

db.run(
  'UPDATE admin_users SET password = ? WHERE username = ?',
  [hashedPassword, username],
  function(err) {
    if (err) {
      console.error('Error updating admin password:', err.message);
    } else if (this.changes === 0) {
      console.log('No admin user found, inserting new one...');
      db.run(
        'INSERT INTO admin_users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function(err) {
          if (err) {
            console.error('Error inserting admin user:', err.message);
          } else {
            console.log(`Admin user created successfully!`);
            console.log(`Username: ${username}`);
            console.log(`Password: ${newPassword}`);
          }
          db.close();
        }
      );
    } else {
      console.log(`Admin password updated successfully!`);
      console.log(`Username: ${username}`);
      console.log(`Password: ${newPassword}`);
      db.close();
    }
  }
);
