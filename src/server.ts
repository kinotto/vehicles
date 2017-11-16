import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

export default class Server {
    static instance: Server;
    static app: express.Express;
    private constructor(){}

    /**
     * @returns an instance of server
     */
    public static getInstance(){
        if(!Server.instance){
            Server.instance = new Server();
            Server.app = express();
            Server.app.use(morgan('dev'));
            Server.app.use(bodyParser.json());
            Server.app.use(bodyParser.urlencoded({extended: false}));
        }
        return Server.app;
    }

}