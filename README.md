# Spots
## Introduction
Spots is a dynamic, geolocation-based progressive web application for the parkour community. The core feature is an interactive map that displays user-curated parkour spots. These map data are crowd-sourced and user-moderated to ensure constant updates and quality control.

Users can also add their own favorite parkour spots to the map, extending the application's data set. Each new submission requires descriptive data, type of spot tags, user-taken photographs, and optional tips.

## Technologies Used

### Frontend

- **Vue3:** A Progressive Javascript Framework with Vite inbuilt and an API based around Single File Components.
- **TypeScript:** A statically typed superset of JavaScript that enhances code quality and readability.
- **Pinia:** Intuitive, type safe, light and flexible Store for Vue using the composition api with DevTools support.
- **Google Maps API:** An API to make a customisable map interface.

### Backend

- **MongoDB:** MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
- **Mongoose:** A ORM (Object-Relational Mapping) for managing MongoDB.
- **Koa.js:** Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.
- **TypeScript:** Used for the backend to bring static typing and better tooling to Node.js development.

## Getting Started

To begin using Real Time Trivia, follow these steps:

1. Clone this repository.
  ```
  git clone https://github.com/msunay/spots.git
  ```
2. Set up the frontend by navigating to the frontend directory and running `npm install`.
  ```
  cd spots/client
  npm install
  ```
3. Similarly, set up the backend by going to the backend directory and running `npm install`.
  ```
  cd spots/server
  npm install
  ```
4. Create a MongoDB database for the application and update the connection configuration in the backend's `.env` file.
5. Start the backend server using `npm run dev` in the backend directory.
  ```
  cd spots/server
  npm run dev
  ```
6. Start the frontend development server using `npm run dev` in the frontend directory.
  ```
  cd spots/client
  npm run dev
  ```
## Contributing

Improvements are welcome :)

Fork the repo and do your thing. Push to your fork and submit a pull request.

## Author

Alex Eze - [Github](https://github.com/msunay) - [LinkedIn](https://www.linkedin.com/in/alex-eze-822255a7/)
