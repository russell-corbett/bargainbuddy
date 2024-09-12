# DesignTeam6400 - TrackSale

TrackSale is a web application that allows users to find the best deals on products from various online retailers. Users can search for products and view the best deals available from multiple retailers. Users can also create an account to save their favorite products and receive notifications when the price of a product drops. BargainBuddy is designed to help users save money by finding the best deals on products they are interested in.

## Installation

To run the application, you will need to have Node.js installed on your machine. You can download Node.js from the official website: https://nodejs.org/en/download/

After installing Node.js, you can clone the repository and install the required dependencies by running the following commands:

```bash
git clone https://github.com/Foul-Trouble/DesignTeam6400
npm install
```

## Usage

To start the application locally, run the following command:

```bash
cd frontend
npm run dev
```

or to connect to the production server, go to the following link:

```bash
http://tracksale.russellcorbett.ca/
```

## Technologies Used

- Frontend
  - NextJS
    - Used as a frontend project generator and a convenient way to accomplish multi-page routing  
  - React
    - A frontend DOM-based component rendering system for convenient, dynamic UI
  - TailwindCSS
    - A utility-first CSS framework for quickly building custom designs
- Backend
  - Express.js
    - Backend framework for building high-performance RESTful APIs  
  - Prisma
    - A powerful ORM for ensuring a solid request and response schema for the database makes queries much easier to develop while also ensuring language continuity by writing queries in TypeScript rather than SQL.
  - SQLite
    - A lightweight SQL-based relational database that is stored within a single file
  - Bcrypt
    - Encryption library for password hashing. Uses SHA-256 for encryption
  - JSONWebToken
    - Library for generating session tokens to help store user sessions in the client
  - Routing-Controllers
    - A library adding convenient decorators that help with making object-oriented REST APIs with Express
  - SocketIO
    - WebSocket library for JavaScript. They are used in this project to make real-time messaging possible.
  - Socket-Controllers
    - Similar to Routing-Controller in providing convenient decorators for making object-oriented SocketIO services
