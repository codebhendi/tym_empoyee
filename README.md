## Steps to start each service

### web service
1. After cloning this respository install react-sctips using npm install -g react-scripts;
2. Go to the web folder
3. Do npm install.
4. Run npm run start to start the web service

### node service
1. Go to the node folder.
2. Do npm install and after that install sqlite3 for your respective OS.
3. Then run node sr/server.js. You can also do npm run start but for that you need to have gulp configured.
4. After that do knex migrate:latest. This will perform all database migrations.
