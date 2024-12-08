# VENTTUP Order Tracking software
<img width="1440" alt="Screenshot 2024-12-06 at 1 14 11 PM" src="https://github.com/user-attachments/assets/5ca98161-20f9-49ab-a7bd-af1fdb1c1cf7">

This is a MVP, which demonstrates a backend API built with Express.js and a frontend built with Vite and React.

<img width="1440" alt="Screenshot 2024-12-06 at 1 15 01 PM" src="https://github.com/user-attachments/assets/0331c7aa-b9a4-44a8-9af0-d555f2afcc13">
<img width="1440" alt="Screenshot 2024-12-06 at 1 17 01 PM" src="https://github.com/user-attachments/assets/08556a4a-836a-4025-995a-42ffda4c4a5e">

## Getting Started

Clone the Repository:

```bash
  git clone https://github.com/pushpitjain2006/Venttup-Tracking-software-MVP.git
```

Install Dependencies:   

Navigate to the project directory and install dependencies for both the frontend and backend:

```bash
cd Venttup-Tracking-software-MVP/venttup/Backend
npm install
cd ../Frontend
npm install
```


### Run the Backend:


First of all setup the .env file 
- Go to /Backend
- Make a new file .env
- Copy contents from .env.example and make changes according to you.

Start the Express.js server with:
```bash
node ./app.js
```

This will typically run the server on port 3000 (default for Express.js). You can access the API at http://localhost:3000 (or adjust the port if configured differently).

Run the Frontend:

Start the Vite development server with:

```bash
npm run dev
```

This will launch the React application in development mode, usually accessible at http://localhost:5173 (default for Vite). You can find the exact URL in your terminal output.

