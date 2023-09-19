import { Schema, model, InferSchemaType } from 'mongoose';

const imageSchema = new Schema({
    filename: String,
    url: String,
});

type ImageModel = InferSchemaType<typeof imageSchema>;

export default model<ImageModel>('ImageModel', imageSchema)