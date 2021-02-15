const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

///Conecta no Banco de Dados
mongoose.connect(config.connectionString,{ useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true});

//Carrega os models
const Customer = require('./models/customer');
const Service = require('./models/service');
const Expense = require('./models/expenses');
const SignaturePlan = require('./models/signatureplan');
const Signature = require('./models/signature');
const Income = require('./models/income');
const Schedule = require('./models/schedule');
const Feedback = require('./models/feedback');

///Carrega as Rotas//
const indexRoute = require('./routes/index-routes');
const customersRoute = require('./routes/customers-routes');
const servicesRoute = require('./routes/services-routes');
const expensesRoute = require('./routes/expenses-routes');
const signatureplanRoute = require('./routes/signatureplan-routes');
const signatureRoute = require('./routes/signatures-routes');
const incomesRoute = require('./routes/incomes-routes');
const schedulesRoute = require('./routes/schedules-routes');
const feedbacksRoute = require('./routes/feedbacks-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',indexRoute);
app.use('/customers',customersRoute);
app.use('/services',servicesRoute);
app.use('/expenses',expensesRoute);
app.use('/plans',signatureplanRoute);
app.use('/signatures',signatureRoute);
app.use('/incomes',incomesRoute);
app.use('/schedules',schedulesRoute);
app.use('/feedbacks',feedbacksRoute);

module.exports=app;