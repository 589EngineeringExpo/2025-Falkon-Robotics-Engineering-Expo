# Falkon Robotics' Engineering Expo 2025

README MAY BE OUTDATED

This website was meant to guide guests through the Engineering Expo event.

Made with ❤️ by Falkon Robotics' members.
## Installation

1. Download dependencies
- https://nodejs.org/en/download - Node.js
- https://www.docker.com/products/docker-desktop - Docker (For running MongoDB)

2. Download the backend
- Navigate to /
- Run `npm install`
- Make a duplicate of `.env.example`, then rename it to `.env`
- Open `.env`, then edit the fields if needed

3. Install MongoDB
- Open Docker
- Open the search box, then find `mongodb/mongodb-community-server`
- Click "pull"
- Go to "images"
- Press the run/start icon next to `mongodb/mongodb-community-server`
- Under "optional settings", enter a `Container Name`
- Under "optional settings", input `27017` under `Host port`
- Click `run`

4. (Optional) Install MongoDB Compass
- https://www.mongodb.com/try/download/compass - MongoDB Compass (A way for you to visually see your database and the data inside)
- Click the plus arrow next to "Connections"
- Put `mongodb://localhost:27017/expo` in `URI`
- Press "Save"
- Next to the new connection (Default name: localhost:27017), press "Connect"
- Navigate to `expo` under the connection
- Open any of the folders to find current data in the database
- (Use Ctrl + R to rescan the database for new or changed entries)

