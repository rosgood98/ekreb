# 'ekreb' - the word guessing game!
Author: Ricky Osgood; richard.m.osgood@vanderbilt.edu

'ekreb' is a simple word guessing game. Users are prompted with scrambled words and try to guess the unscrambled version of the word. Created with React and Node.js.

## Table of Contents

  - ['ekreb' - the word guessing game!](#ekreb---the-word-guessing-game)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)
  - [Configuration](#configuration)
  - [Acknowledgments](#acknowledgments)
  - [Next Steps](#next-steps)

## Introduction

Created for [Change++](https://www.changeplusplus.org/) at Vanderbilt University.

## Features

- Start, Game, and End Pages
- Users can select how many rounds the game will last (including during the game)
- Users can select how many characters the word they are guessing will be (including during the game)
- Custom popups for correct and incorrect guesses
- Timer that dynamically adjusts depending on the length of the word that the user is guessing; adjusts color automatically based on the proportion of time remaining
- Dynamically styled statistics dependent on user's performance
- Robust error handling
- The repository also includes a simple CI/CD process in `main_ci.yml`

## Getting Started

See below.

### Prerequisites

- **[Node.js](https://nodejs.org/en)** - You need to have Node.js installed.
- **npm** - This project uses npm as the package manager. npm is included with Node.js installation. Check you have npm installed with `npm -v`.

### Installation

First, `git clone` this repo.

This project uses [concurrently](https://www.npmjs.com/package/concurrently) to simplify the process of installation and running. After cloning, navigate to the root directory. In terminal, enter `npm start`. This will start both the frontend and backend without requiring you to enter separate commands in both directories. The game should open automatically. If not, navigate to your default localhost (usually http://localhost:3000/).

## Usage

Once the game has opened, you can begin by simply clicking "Start Game".

## API Documentation

The backend exposes one endpoint (`/word`). This GET request calls an [external API](https://random-word-api.herokuapp.com/home) using a predefined endpoint(`https://random-word-api.herokuapp.com/word?number=`) to get a random word with a specified length.

## Configuration

The only configuration available to users is the number of rounds as well as the length of each word.

## Acknowledgments

This project uses a number of dependencies. The following is a list of them including their uses:

- [Concurrently](https://www.npmjs.com/package/concurrently) - to simplify the process of installing dependencies and starting the front and backend.
- [React](https://react.dev/) - for building the entire frontend (includes several React packages).
- [Chai](https://www.chaijs.com/) and [Mocha](https://mochajs.org/) - testing frameworks for the backend of the app.
- [Express](https://expressjs.com/) - to build out a small API on the backend.
- [Cors](https://www.npmjs.com/package/cors) - middleware that allows interaction between frontend/backend and Express.js.

## Next Steps

The next steps for the project are to add additional features, including: providing hints to users, additional API endpoints, and improving performance. Currently, the external API used to retrieve random words takes between 500ms - 1000ms to make a request. It would be nice to find a different API with better performance. Finally, some styling and layout additions would make the game appear cleaner.