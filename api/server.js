import Express from "express";

import dotenv from "dotenv";
dotenv.config();

const App = Express();

import errorHandler from "./middleware/errorMiddleware.js";

import AdminRoutes from "./routes/adminRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

// console.log(process.env.DATABASE_URL);
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }))

App.use("/api/admin", AdminRoutes);
App.use("/api/users", UserRoutes);
App.use("/api/events", eventRoutes);

App.use(errorHandler);


export default App;
