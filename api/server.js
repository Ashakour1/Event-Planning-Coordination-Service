import  Express  from "express";

import dotenv from "dotenv";

dotenv.config();
const App = Express();

import errorHandler  from "./middleware/errorMiddleware.js";

import AdminRoutes from "./routes/adminRoutes.js";


// console.log(process.env.DATABASE_URL);
App.use(Express.json());



App.use('/api/admin',AdminRoutes);

App.use(errorHandler);




export default App;