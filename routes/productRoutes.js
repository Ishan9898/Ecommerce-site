import express from 'express';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryConttroller, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controller/productController.js";
import formidable from 'express-formidable';
import braintree from 'braintree';
import { orderStatusController } from '../controller/authController.js';
const router = express.Router();

// routes
router.post('/create-product' , requireSignIn , isAdmin , formidable() , createProductController);

//routes 
router.put('/update-product/:pid' , requireSignIn , isAdmin , formidable() , updateProductController);

// // get products
router.get("/get-product", getProductController);

// // get single product
router.get('/get-product/:slug', getSingleProductController);

// get photo
router.get('/product-photo/:pid' , productPhotoController);

//delete
router.delete('/product/:pid',deleteProductController);

// filter product 
router.post('/product-filters',productFiltersController);

// product count
router.get('/product-count', productCountController);

// product per page
router.get('/product-list/:page', productListController);

// search product
router.get('/search/:keyword',searchProductController);

// similar Product
router.get('/related-product/:pid/:cid',relatedProductController);

// category wise product
router.get('/product-category/:slug',productCategoryConttroller);

// Payment route
// token
router.get('/braintree/token',braintreeTokenController);

// payements
router.post('/braintree/payements',requireSignIn,brainTreePaymentController);

//order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
export default router;