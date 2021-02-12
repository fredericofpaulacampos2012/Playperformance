const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

///Conecta no Banco de Dados
mongoose.connect(config.connectionString);

//Carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

///Carrega as Rotas//
const indexRoute = require('./routes/index-routes');
const productsRoute = require('./routes/products-routes');
const customersRoute = require('./routes/customers-routes');
const ordersRoute = require('./routes/orders-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',indexRoute);
app.use('/products',productsRoute);
app.use('/customers',customersRoute);
app.use('/orders',ordersRoute);

module.exports=app;