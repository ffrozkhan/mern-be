import productsModel from "../models/productsModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { title, price, description, category } = req.fields;
    const { image } = req.files;

    if (!title) {
      return res
        .status(401)
        .send({ success: false, message: `Title is Required` });
    }
    if (!price) {
      return res
        .status(401)
        .send({ success: false, message: `Price is Required` });
    }
    if (!description) {
      return res
        .status(401)
        .send({ success: false, message: `Description is Required` });
    }
    if (!category) {
      return res
        .status(401)
        .send({ success: false, message: `Title is Required` });
    }
    // if (!photo) {
    //   return res
    //     .status(401)
    //     .send({ success: false, message: `Title is Required` });
    // }

    const newProduct = new productsModel({
      title,
      price,
      description,
      category,
    });
    newProduct.image.data = fs.readFileSync(image.path);
    newProduct.image.contentType = image.type;
    await newProduct.save();
    res.status(201).send({
      success: true,
      message: `New Product Created`,
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Creating Product`,
    });
  }
};