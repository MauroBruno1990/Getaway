const Product = require("../models/Product");
const Category = require("../models/Category");
const ProductCategories = require("../models/ProductCategories");
const { Op } = require("sequelize");

const productController = {
  findAll(req, res, next) {
    console.log(req.query);
    if (!Object.keys(req.query).length) {
      Product.findAll({ order: [["id", "ASC"]] })
        .then((products) => {
          return res.status(200).json(products);
        })
        .catch((e) => next(e));
    }
    else{
    const { name } = req.query;

    Product.findAll({
      order: [["id", "ASC"]],
      where: { name: { [Op.like]: `%${name}%` } },
    })
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((e) => next(e));
  }},

  findById(req, res, next) {
    const { id } = req.params;
    Product.findOne({ where: { id } })
      .then((product) => res.status(200).json(product))
      .catch((e) => next(e));
  },

  findByCategory(req, res, next) {
    const id = req.params.id;
    Category.findOne({
      where: { id },
      include: [{ model: Product }],
    })

      .then((category) => {
        console.log(category);
        res.send(category);
      })
      .catch(next);
  },

  createProduct(req, res, next) {
    const {
      name,
      price,
      stock,
      description,
      image,
      expiry,
      quantity,
      category,
    } = req.body;
    Product.create({
      name,
      price,
      stock,
      description,
      image,
      expiry,
      quantity,
    }).then((product) => {
      product.setCategories(category);
      console.log(Object.keys(product.__proto__));
      res.status(201).send(product);
    });
  },

  editProduct(req, res, next) {
    const { id } = req.params;
    Product.findOne({ where: { id } }).then((product) => {
      product
        .update(req.body, { returning: true })
        .then((product) => res.status(201).send(product[0]));
    });
  },

  deleteProduct(req, res, next) {
    const id = req.params.id;
    Product.destroy({ where: { id } }).then(() =>
      res.status(200).send("Producto eliminado")
    );
  },
};

module.exports = productController;
