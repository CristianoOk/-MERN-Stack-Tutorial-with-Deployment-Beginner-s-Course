import express from "express";
import dotenv  from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 //Lo ideal sería que haya algo en PORT y que lo reconozca, pero por cualquier cosita le decimos que use de última 5000 (que es lo mismo que tiene asignado PORT en el archivo .env)

app.use(express.json()); //allows us to accept JSON data in the body

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:" +PORT);
});