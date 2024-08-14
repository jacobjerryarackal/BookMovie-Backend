import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});


const AdminModels = mongoose.model('Admin', adminSchema);

export default AdminModels;
