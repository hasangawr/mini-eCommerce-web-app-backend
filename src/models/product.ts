import { ObjectId, Schema, model } from "mongoose";

export interface IImage {
  data: Buffer;
  contentType: string;
}

export interface IProduct {
  _id: ObjectId;
  sku: string;
  quantity: number;
  name: string;
  images: IImage[];
  description: string;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [{ data: Buffer, contentType: String }],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
