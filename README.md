# LittleVictories

LittleVictories is an app designed for iOS devices that allows users to add and track tasks, track daily refletion data, and enter journal entries.

## Installation

Use npm to install dependencies.
`npm install`

Make sure you have mysql running on port 3306.
To create database and tables run:
`mysql -u root < server/src/database/schema.sql`
from your repository root directory.

You will need to have an iOS simulator installed to run a test version of the app. We used xcode.

## Usage

Run `npm run start-dev` to boot up the server.
Run `npm run ios` to boot up the simulator for iOS.
You will also have needed to make sure mysql is running and the db and tables are created (commands in ##Installation).

## Contributors

Team members: David Palacios, Jon Hourcade, and Persis Randolph

## Tech Stack

- MySQL / Sequelize
- React Native
- TypeScript
- Expo
- Express Server
- NodeJS

## APIs

- ZenQuotes.io https://zenquotes.io/
  No API key required.
