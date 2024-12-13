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
  const product = await Product.findOne({ sku: oldSku });
  const productWithNewSku = await Product.findOne({ sku });

  if (oldSku === sku && product) {
    product.quantity = quantity;
    product.name = name;
    product.images = images;
    product.description = description;

    await product.save();

    return product;
  } else {
    if (product && !productWithNewSku) {
      product.sku = sku;
      product.quantity = quantity;
      product.name = name;
      product.images = images;
      product.description = description;

      await product.save();

      return product;
    }
  }

  return null;
};

export const _deleteProduct = async (sku: string) => {
  const product = await Product.findOneAndDelete({ sku });
  return product;
};

export const _changeFav = async (sku: string) => {
  const product = await Product.findOne({ sku });

  if (product) {
    product.isFavourite = !product.isFavourite;

    await product.save();

    return product;
  }

  return null;
};
