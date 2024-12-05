import { connect } from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product";

dotenv.config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI as string);

    // const product = new Product({
    //   sku: "#SKU",
    //   quantity: 4,
    //   name: "Test Product",
    // });

    // await product.save();

    console.log("Successfully connected to the database!");
  } catch (error) {
    console.log("Couldn't connect to the database: ", error);
  }
};

export default connectDB;
