const path = require("path");
const dishes = require(path.resolve("src/data/dishes-data"));
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
function bodyDataHas(propertyName) {
    return function (req, res, next) {
        const { data = {} } = req.body
        if (data[propertyName]) {
            return next()
        }
        next({
            status: 400,
            message: `Must include ${propertyName}`
        })
    }
}

function create(req, res, next) {
    const { data: { name, description, price, image_url } = {} } = req.body
    const newDish = {
        id: Number(nextId),
        name: name,
        description: description,
        price: price,
        image_url: image_url,
    }
    dishes.push(newDish)
    res.status(201).json({ data: newDish })
}

function checkPriceLessThanZero(req, res, next) {
    const { data: { price } = {} } = req.body
    if (price >= 0) {
        return next()
    }
    next({
        status: 400,
        message: "The price cannot be less than zero(0)"
    })
}


module.exports = {
    create: [
        bodyDataHas("name"),
        bodyDataHas("description"),
        bodyDataHas("price"),
        bodyDataHas("image_url"),
        checkPriceLessThanZero,
        create,
    ] 
}