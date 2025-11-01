
# Falkon Robotics' Engineering Expo 2025

## Deployment
To run this server for production...
1. `git clone https://github.com/589EngineeringExpo/2025-Falkon-Robotics-Engineering-Expo.git expo`
2. `cd expo`
3. `docker compose up -d`
4. `docker ps`
5. Note down the container ID for 2025-falkon-robotics-engineering-expo-main-expo
6. `docker exec -it ID_OF_CONTAINER sh` - Replace 	ID_OF_CONTAINER with the actual ID (i.e docker exec -it 245cf82e29ce sh)
7. `npm run generateToken` - Copy down the admin token it gives you, and store it securely (It will look something like zzxq0cl6) (random 8 character alphanumeric token)
8. `exit`

The server will run on port 80

## Any installation instructions below this MAY BE OUTDATED

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

5. IMPORTANT
- Generate a temporary admin token via `npm run generateToken`



