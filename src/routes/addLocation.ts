import * as express from 'express';
import {Location} from '../storage/Location';
import ILocation from '../model/ILocation';
import Redis from '../utilities/redis';
const router = express.Router();

router.post('/:id/locations', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Redis.get(req.params.id)
    .flatMap(
        markers => {
            if(!markers){
                throw new Error('vehicle not registered');
            }
            if(req.body.lat && req.body.lng && req.body.at){
                return Redis.set(req.params.id, JSON.stringify([
                    ...JSON.parse(markers),
                    req.body
                ]));
            }
            throw new Error('empty location body');
        }
    )
    .subscribe( 
        resp => {
            console.log(`new pos. for vehicle ${req.params.id} added to redis`);
            res.sendStatus(204);
        }, 
        err => next({message: 'vehicle not registered', stack: err.stack})
    )

})


module.exports = router;