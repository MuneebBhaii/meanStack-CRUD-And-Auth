const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Products = require('../model/useProduct')

// create product
router.post('/createProduct', async (req, res) => { 
    console.log(req.body)
    try {
        const newProduct = new Products({
            _id: new mongoose.Types.ObjectId(),
            name:req.body.name,
            price:req.body.price,
            category:req.body.category,
            tags:req.body.tags,
            specifications:req.body.specifications
        })
        const saveProduct = await newProduct.save()
        res.json(saveProduct)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//  see all  product
router.get('/products', async (req, res) => {
    try {
        const allProducts = await Products.find()
        if (!allProducts) {
            return res.status(404).json({ message: "Products not have" })
        }
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// see specific product
router.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const specificProduct = await Products.findById(productId)
        if (!specificProduct) {
            return res.status(404).json({ message: "Products not have" })
        }
        return res.status(200).json(specificProduct)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//  update product
router.put('/update/:id', async (req, res) => {
    // const {name , price , category,tags,specifications} = req.body
    try {
        const productId = req.params.id
        console.log(productId)
        console.log(req.body)
        const dataForUpdate = await new Products({
            // _id: productId,
            name:req.body.name?req.body.name: name,
            price:req.body.price,
            category:req.body.category,
            tags:req.body.tags,
            specifications:req.body.specifications
        })
        const updateProduct = await Products.findByIdAndUpdate(productId, dataForUpdate, {
            new: true,
        })
        if (!updateProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        return res.status(200).json({ message: 'product updated successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//  delete product
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id
    console.log(productId)
    try {
        const deleteProduct = await Products.findByIdAndDelete(productId)
        res.json(deleteProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router