import { Schema, model, Types, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true, }, // select: false - to not receive
    password: { type: String, required: true },
    role: {type: String, require: true},
    favorites: [{ type: Types.ObjectId, ref: 'Hero' }],
})

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema)