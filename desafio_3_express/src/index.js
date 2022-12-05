import express from "express";
import {productManager} from "./managers/index.js"


const app = express ();

const PORT = 8080;

app.get ('/api/products', async (req, res) => {
    try {

        const {limit} = req.query

    const allProducts = await productManager.getProducts() 

    if(!limit || limit < 1) {
        return res.send({success: true, products: allProducts});  
    }

    const products = allProducts.slice(0, limit);
    res.send({success: true, products});
        
    } catch (error) {
        console.log(error);
        res.send({success: false, error: "ha ocurrido un error"});
    }
});

app.get('/api/prodcuts/:id', async (req, res) => {
    try {
        const {id:paramID} = req.params;
        const id = Number(paramID)

        if (id < 0) {
            return res.send({success: false, error: "El id debe ser un numero valido"})
        }

        await productManager.getProductsById(id)
        
    } catch (error) {
        
    }
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`));