import { Schema, model } from 'mongoose'

const RoleSchema = new Schema({

    uuid: { type: String },
    name: { type: String, unique: true },

}, { versionKey: false, timestamps: true });

const RoleModel = model('Role', RoleSchema);

export default RoleModel;