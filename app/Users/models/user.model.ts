import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>({

    uuid: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: Object, required: true }

}, { versionKey: false, timestamps: true });

const UserModel = model('User', UserSchema);

export default UserModel;