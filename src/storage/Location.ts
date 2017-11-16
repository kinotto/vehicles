import * as mongoose from 'mongoose';

const singleLocationSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    at: {
        type: String,
        required: true
    }
})


const LocationSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    markers: {
        type: [singleLocationSchema],
        required: true,
        default: []
    }
})
export const Location = mongoose.model('Location', LocationSchema);
