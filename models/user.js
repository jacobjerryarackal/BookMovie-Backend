import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phonenumber : {type: Number, required:true},
  username : { type: String, required: true}
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
