import express from 'express';
import { sendWhatsAppMessage } from '../controller/whatsappController.js';

const whatsapproute = express.Router();

whatsapproute.post("/send-whatsapp",sendWhatsAppMessage)

export default whatsapproute;