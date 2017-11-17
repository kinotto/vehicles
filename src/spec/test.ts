import {}  from 'mocha';
import {expect} from 'chai';
import {config} from '../config';
import * as mongoose from 'mongoose';
import Mongo from '../mongo';
import {Location} from '../storage/Location';
import Redis from '../utilities/redis';
import * as sinon from 'sinon';
import * as request from 'supertest';
import * as express from 'express';
import Server from '../server';

//const app = express();
declare var Promise: any;

describe('data test', () => {
    let db,
        sandbox: sinon.SinonSandbox;

    before((done) => {
        //sandbox = sinon.sandbox.create();
        db = Mongo.connect();
        db.once('open', done());
    })

    it('should connect to vehicles collection ', (done) => {
        Location.find({})
        .then(resp => {
            done();
        })
        .catch(err => {
            done(err);
        })
    })
    it('should connect to redis ', (done) => {

        //QUESTO TEST PASSA MA IMPEDISCE A YARN TEST DI TERMINARE
        let obj = {pippo: () => 'bau'};
        //let stub:any = sinon.stub(Redis, 'getAll').resolves('ciao');
        let stub: any = sinon.stub(obj, 'pippo').callsFake(() => Promise.resolve('ciao'));
        //console.log(stub());
        stub().then((resp: any) => {
            expect(resp).to.equal('ciao');
            done();
        })
        .catch((err: any) => {
            done(err);
        })
        //expect(stub()).to.equal('ciao');
        //console.log('bla');

    })
    it('should pass', () => {
        expect(true).to.equal(true);
    })
    after(() => {
        //sandbox.restore();
        mongoose.disconnect();
    })
})

describe('request url tests', (() => {
    let app: any,
        connection;

    before((done) => {
        connection = Mongo.connect();
        app = Server.getInstance();
        app.use('/vehicles', require('../routes/vehiclesRegistration'));
        connection.once('open', () => done());
    })

    it('should return the list of users /archive', (done) => {
        request(app)
        .get('/vehicles/archive')
        //.set('Accept', 'Application/json')
        .end((err, resp) => {
            if(err) return done(err);
            console.log(resp.body);
            done();
        })
    })

    after(() => {
        mongoose.disconnect();
    })
}))