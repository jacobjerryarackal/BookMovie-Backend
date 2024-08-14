import express from 'express';
import { createPaymentOrder, createPaymentVerify } from '../controller/paymentController.js';

const payroutes = express.Router();

payroutes.post ("/order", createPaymentOrder);
payroutes.post ("/verify", createPaymentVerify);

export default payroutes