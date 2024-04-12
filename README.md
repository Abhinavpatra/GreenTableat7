
# Greentable - Connects Restaurants with Leftover Food to Those in Need

Greentable is a web application built using the MERN (MongoDB, Express.js, React, Node.js) stack that aims to connect restaurants with leftover food to people in need. The application allows restaurants to register, list their available food items, and manage their inventory. Users can view available restaurants, see their food offerings, and access their details.

## Features

- **Authentication**: Restaurants can sign up and log in using a specific password obtained by calling a designated phone number. Users can access the platform without authentication to view available restaurants and food items.
- **Restaurant Dashboard**: Authenticated restaurants have access to a dashboard where they can manage their restaurant details and update their food inventory.
- **User Dashboard**: Users can view a list of restaurants in their city along with their food offerings, addresses, opening hours, and vegetarian/non-vegetarian options.
- **CRUD Operations**: The application supports Create, Read, Update, and Delete operations for restaurant data and food items.

## Installation

1. Clone the repository:



2. Install dependencies:

npm i
after reaching the directory server
and then: do node app.js
then change the directory by
 cd ..
 npm i
 
 ready.

1. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

MONGO_URL =
JWT_SECRET_KEY = 

4. Run the application: npm run dev in the main folder outside the src.


## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **State Management**: Recoil
- **Hooks**:useEffect,useNavigate,useSetRecoilState,useState
- **Authentication**: JWT (JSON Web Tokens)
- **Form Validation**: Zod
- **Styling**: CSS,css modules

## Folder Structure

- `client`: Contains the frontend code built with React.js.
- `server`: Contains the backend code built with Node.js, Express.js, and MongoDB.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under mine LICENSE.
