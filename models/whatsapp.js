import mongoose from 'mongoose';

const whatsappSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },

});
const whatsappModel = mongoose.model('whatsapp', whatsappSchema);

export default whatsappModel;