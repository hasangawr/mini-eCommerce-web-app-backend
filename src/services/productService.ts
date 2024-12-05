import Product, { IImage, IProduct } from "../models/product";

export const _getAllProducts = async () => {
  const products = await Product.find({});

  return products;
};

export const _addProduct = async (
  sku: string,
  quantity: number,
  name: string,
  images: IImage[],
  description: string
) => {
  const product = await Product.findOne({ sku });

  if (!product) {
    const newProduct = new Product({
      sku,
      quantity,
      name,
      images,
      description,
    });

    await newProduct.save();

    return { sku, name };
  }

  return null;
};

export const _updateProduct = async (
  oldSku: string,
  sku: string,
  quantity: number,
  name: string,
  images: IImage[],
  description: string
) => {
  const product = await Product.findOne({ oldSku });
};

export const _deleteProduct = async (sku: string) => {
  const product = await Product.findOneAndDelete({ sku });
  return product;
};
