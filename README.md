# Falkon Robotics' Engineering Expo 2025

README IN CONSTRUCTION

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