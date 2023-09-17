import { Schema, model, InferSchemaType } from 'mongoose';

const heroSchema = new Schema({
    nickname: { type: String, required: true, unique: true },
    real_name: { type: String, required: true },
    origin_description: { type: String, required: true },
    superpowers: { type: String, required: true },
    catch_phase: { type: String, required: true },
    images: [{ link: String }]
    // owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

type Hero = InferSchemaType<typeof heroSchema>;

export default model<Hero>('Hero', heroSchema)