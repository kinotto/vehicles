import * as mongoose from 'mongoose';
import {config} from './config';

export default class Mongo {
    static db: mongoose.Connection;
    private constructor(){}

    static connect(){
        mongoose.connect(config.db.host, {useMongoClient: true});
        Mongo.db = mongoose.connection;
        Mongo.db.on('error', console.error.bind(console, 'connection error'));
        Mongo.db.on('open', console.log.bind(console, 'connected to mongo db'));
        return Mongo.db;
    }
}