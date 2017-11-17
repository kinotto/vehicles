import Server from './server';
import {config} from './config';
import Mongo from './mongo';
import * as express from 'express';
let server = Server.getInstance();
server.use('/vehicles', require('./routes/vehiclesRegistration'));
server.use('/vehicles', require('./routes/addLocation'));

Mongo.connect();

/*generic error handler */
server.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.json({
        message: err.message || 'internal server error',
        stack: err.stack,
        statusCode: 500
    })
})
server.listen(process.env.port || config.server.PORT, 
    console.log.bind(console,  `server listening on port ${process.env.port || config.server.PORT}`));


require('./observable.ts');