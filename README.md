# Anime Streaming Platform

A web application for streaming anime episodes, allowing users to rate, bookmark, and interact with content. This project leverages PostgreSQL, Node.js, TypeScript, and dotenv for a secure and structured backend environment.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This anime streaming service has been in the work for some time now as a hobby project of mine. This repo is mainly comprised of TypeScript and JavaScript. The database im using to save everything is in PostgreSQL.

## Features
- **User Authentication** with JWT and bcrypt for secure user logins
- **Content Rating System** with periodic updates to average ratings
- **Bookmark System** to manage user bookmarks across content types
- **Anime Episode Navigation** with smooth transitions between episodes and seasons
- **Custom API** for interacting with anime, episodes, and ratings

## Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14+ recommended)
- **PostgreSQL** (v12+ recommended)
- **Git**

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/RyanCulkin4/anime-streaming-platform.git
    cd anime-streaming-platform
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3a. Run the Client using the following command:
    ```bash
    npm run dev
    ```
3b. Run the Web Server using the following command: 
    NOTE - Requires that you have created a .env and connected it to a PostgreSQL Database (Working On Publishing my db skema for you to play with it)
    ```bash
    npm run sdev
    ```

## Environment Variables

To configure your database and other settings, create a `.env` file in the root directory with the following variables:

```plaintext
DB_USER=yourDatabaseUsername
DB_HOST=yourDatabaseHost
DB_NAME=yourDatabaseName
DB_PASSWORD=yourDatabasePassword
DB_PORT=5432
NODE_ENV=development
