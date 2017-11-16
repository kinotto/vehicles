import * as express from 'express';
import {Location} from '../storage/Location';
import Redis from '../utilities/redis';
import {Observable} from 'rxjs';

const router = express.Router();


//registration
router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(!req.body.id){
        return next(new Error('canno register an undefined id'));
    }
    Redis.set(req.body.id, JSON.stringify([]))
    .subscribe(
        (resp: any) => {
            console.log(`vehicle ${req.body.id} registered`);
            res.sendStatus(204);
        },
        err => next(err)
    )
})

//deregistration
router.delete('/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    /*Redis.deleteAll()
    .subscribe(
        (resp) => {}
    );*/
    Redis.get(req.params.id)
    .subscribe(
        markers => {
            if(!markers){
                return res.sendStatus(204); 
            }
            //update db
            Location.findOne({uid: req.params.id})
            .then((location: any) => {
                if(location && location.uid){
                    location.markers = [
                        ...location.markers,
                        markers
                    ]
                } else {
                    location = {
                        uid: req.params.id,
                        markers: markers ? JSON.parse(markers) : []
                    }
                }
                return Location.findOneAndUpdate({
                    uid: req.params.id
                }, {$set: location}, {new: true, upsert: true});
            })
            .then(resp => {
                Redis.delete(req.params.id)
                .subscribe(
                    resp => {
                        console.log(`vehicle ${req.params.id} cancelled from redis`);
                        res.sendStatus(204);
                    },
                    err => next(err)
                )
            })
            .catch(err => {
                next(err);
            })
        }
    )

})

/**
 * get all vehicles on db
 */
router.get('/archive', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Location.find({})
    .then(vehicles => {
        res.status(200).json(vehicles);
    })
    .catch(err => next(err));
})


/**
 * get all current active vehicles positions (on redis)
 */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Redis.getAll()
    .flatMap((keys) => {
            let allValues$ = keys.map((key: any) => Redis.get(key).switchMap(markers => {
                return key && key !== 'undefined' 
                    ? Observable.of({uid: key, locations: markers}) 
                    : Observable.of({});
            }));
            return Observable.forkJoin(...allValues$);
        }
    )
    .subscribe(
        array => {
            res.json(array);
        },
        err => {
            next(err);
        }
    )
})


module.exports = router;