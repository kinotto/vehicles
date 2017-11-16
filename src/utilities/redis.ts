import { Observable } from 'rxjs';
import * as redis from 'redis';
import ILocation from '../model/ILocation';
import {config} from '../config';
const client = redis.createClient(process.env.REDIS_URL || config.redis.host);

export default class Redis {
    static getAll() :Observable<any>{
        return new Observable(observer => {
            client.keys('*', (err, resp) => {
                if(err){
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            })
        })
    }
    static get(id: any) :Observable<any>{
        return new Observable(observer => {
            client.get(id, (err, resp) => {
                if(err){
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            })
        })
    }
    static set(id: any, locations: string) :Observable<any>{
        return new Observable(observer => {
            client.set(id, locations, (err, resp) => {
                if(err){
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            })
        })
    }
    static delete(id: any){
        return new Observable(observer => {
            client.del(id, (err, resp) => {
                if(err){
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            })
        })
    }
    static deleteAll(){
        return new Observable(observer => {
            client.flushdb((err, resp) => {
                if(err){
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            })
        })
    }
    
}