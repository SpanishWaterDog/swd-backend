## Project setup
1. Install mysql and add to PATH
2. Create local db user and testing database:
   ```
   CREATE SCHEMA IF NOT EXISTS `swd-test`;
   CREATE USER IF NOT EXISTS developer@localhost IDENTIFIED WITH mysql_native_password BY 'developer';
   GRANT ALL PRIVILEGES ON *.* TO developer@localhost;
   FLUSH PRIVILEGES;
   ```
3. Create `.env.test` file with given content:
   ```
   DATABASE_URL="mysql://developer:developer@localhost:3306/swd-test"
   ```
4. Run migrations by executing `yarn setup` script
5. Run `prisma generate`