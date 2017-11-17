/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __webpack_require__(9);
exports.config = __webpack_require__(10)("./" + env_1.APP_ENV + ".json");


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(4);
var redis = __webpack_require__(16);
var config_1 = __webpack_require__(1);
var client = redis.createClient(process.env.REDIS_URL || config_1.config.redis.host);
var Redis = /** @class */ (function () {
    function Redis() {
    }
    Redis.getAll = function () {
        return new rxjs_1.Observable(function (observer) {
            client.keys('*', function (err, resp) {
                if (err) {
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            });
        });
    };
    Redis.get = function (id) {
        return new rxjs_1.Observable(function (observer) {
            client.get(id, function (err, resp) {
                if (err) {
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            });
        });
    };
    Redis.set = function (id, locations) {
        return new rxjs_1.Observable(function (observer) {
            client.set(id, locations, function (err, resp) {
                if (err) {
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            });
        });
    };
    Redis.delete = function (id) {
        return new rxjs_1.Observable(function (observer) {
            client.del(id, function (err, resp) {
                if (err) {
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            });
        });
    };
    Redis.deleteAll = function () {
        return new rxjs_1.Observable(function (observer) {
            client.flushdb(function (err, resp) {
                if (err) {
                    return observer.error(err);
                }
                observer.next(resp);
                observer.complete();
            });
        });
    };
    return Redis;
}());
exports.default = Redis;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(6);
var config_1 = __webpack_require__(1);
var mongo_1 = __webpack_require__(13);
var server = server_1.default.getInstance();
server.use('/vehicles', __webpack_require__(14));
server.use('/vehicles', __webpack_require__(17));
mongo_1.default.connect();
/*generic error handler */
server.use(function (err, req, res, next) {
    res.json({
        message: err.message || 'internal server error',
        stack: err.stack,
        statusCode: 500
    });
});
server.listen(process.env.port || config_1.config.server.PORT, console.log.bind(console, "server listening on port " + (process.env.port || config_1.config.server.PORT)));
__webpack_require__(18);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(0);
var morgan = __webpack_require__(7);
var bodyParser = __webpack_require__(8);
var Server = /** @class */ (function () {
    function Server() {
    }
    /**
     * @returns an instance of server
     */
    Server.getInstance = function () {
        if (!Server.instance) {
            Server.instance = new Server();
            Server.app = express();
            Server.app.use(morgan('dev'));
            Server.app.use(bodyParser.json());
            Server.app.use(bodyParser.urlencoded({ extended: false }));
        }
        return Server.app;
    };
    return Server;
}());
exports.default = Server;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ENV = process.env.APP_ENV || 'development';


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./development.json": 11,
	"./production.json": 12
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"server":{"PORT":9002},"db":{"host":"mongodb://heroku_hs0530nq:u4kdmv7ge8anh700uvetdrhi63@ds111476.mlab.com:11476/heroku_hs0530nq"},"redis":{"host":"redis://h:p02cd1f6a71d43790ac825120354ace5916e583257a78c4847ef459a4beb0c4b0@ec2-34-236-115-251.compute-1.amazonaws.com:18329"}}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"server":{"PORT":9002},"db":{"host":"mongodb://heroku_hs0530nq:u4kdmv7ge8anh700uvetdrhi63@ds111476.mlab.com:11476/heroku_hs0530nq"},"redis":{"host":"redis://h:p02cd1f6a71d43790ac825120354ace5916e583257a78c4847ef459a4beb0c4b0@ec2-34-236-115-251.compute-1.amazonaws.com:18329"}}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __webpack_require__(2);
var config_1 = __webpack_require__(1);
var Mongo = /** @class */ (function () {
    function Mongo() {
    }
    Mongo.connect = function () {
        mongoose.connect(config_1.config.db.host, { useMongoClient: true });
        Mongo.db = mongoose.connection;
        Mongo.db.on('error', console.error.bind(console, 'connection error'));
        Mongo.db.on('open', console.log.bind(console, 'connected to mongo db'));
        return Mongo.db;
    };
    return Mongo;
}());
exports.default = Mongo;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(0);
var Location_1 = __webpack_require__(15);
var redis_1 = __webpack_require__(3);
var rxjs_1 = __webpack_require__(4);
var router = express.Router();
//registration
router.post('/', function (req, res, next) {
    if (!req.body.id) {
        return next(new Error('canno register an undefined id'));
    }
    redis_1.default.set(req.body.id, JSON.stringify([]))
        .subscribe(function (resp) {
        console.log("vehicle " + req.body.id + " registered");
        res.sendStatus(204);
    }, function (err) { return next(err); });
});
//deregistration
router.delete('/:id', function (req, res, next) {
    /*Redis.deleteAll()
    .subscribe(
        (resp) => {}
    );*/
    redis_1.default.get(req.params.id)
        .subscribe(function (markers) {
        if (!markers) {
            return res.sendStatus(204);
        }
        //update db
        Location_1.Location.findOne({ uid: req.params.id })
            .then(function (location) {
            if (location && location.uid) {
                location.markers = location.markers.concat([
                    markers
                ]);
            }
            else {
                location = {
                    uid: req.params.id,
                    markers: markers ? JSON.parse(markers) : []
                };
            }
            return Location_1.Location.findOneAndUpdate({
                uid: req.params.id
            }, { $set: location }, { new: true, upsert: true });
        })
            .then(function (resp) {
            redis_1.default.delete(req.params.id)
                .subscribe(function (resp) {
                console.log("vehicle " + req.params.id + " cancelled from redis");
                res.sendStatus(204);
            }, function (err) { return next(err); });
        })
            .catch(function (err) {
            next(err);
        });
    });
});
/**
 * get all vehicles on db
 */
router.get('/archive', function (req, res, next) {
    Location_1.Location.find({})
        .then(function (vehicles) {
        res.status(200).json(vehicles);
    })
        .catch(function (err) { return next(err); });
});
/**
 * get all current active vehicles positions (on redis)
 */
router.get('/', function (req, res, next) {
    redis_1.default.getAll()
        .flatMap(function (keys) {
        var allValues$ = keys.map(function (key) { return redis_1.default.get(key).switchMap(function (markers) {
            return key && key !== 'undefined'
                ? rxjs_1.Observable.of({ uid: key, locations: markers })
                : rxjs_1.Observable.of({});
        }); });
        return rxjs_1.Observable.forkJoin.apply(rxjs_1.Observable, allValues$);
    })
        .subscribe(function (array) {
        res.json(array);
    }, function (err) {
        next(err);
    });
});
module.exports = router;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __webpack_require__(2);
var singleLocationSchema = new mongoose.Schema({
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
});
var LocationSchema = new mongoose.Schema({
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
});
exports.Location = mongoose.model('Location', LocationSchema);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(0);
var redis_1 = __webpack_require__(3);
var router = express.Router();
router.post('/:id/locations', function (req, res, next) {
    redis_1.default.get(req.params.id)
        .flatMap(function (markers) {
        if (!markers) {
            throw new Error('vehicle not registered');
        }
        if (req.body.lat && req.body.lng && req.body.at) {
            return redis_1.default.set(req.params.id, JSON.stringify(JSON.parse(markers).concat([
                req.body
            ])));
        }
        throw new Error('empty location body');
    })
        .subscribe(function (resp) {
        console.log("new pos. for vehicle " + req.params.id + " added to redis");
        res.sendStatus(204);
    }, function (err) { return next({ message: 'vehicle not registered', stack: err.stack }); });
});
module.exports = router;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(4);
console.log('observables');
var createSubscriber = (function (type) {
    return {
        next: function (el) { return console.log("next " + type + " - " + (typeof (el) === 'object' ? JSON.stringify(el) : el)); },
        complete: function () { return console.log("complete " + type); },
        error: function (err) { return console.log("err " + type + " " + err); }
    };
});
rxjs_1.Observable.interval(300)
    .take(4)
    .map(function (el) { return (Math.random() * 100).toFixed(2); })
    .subscribe(createSubscriber('interval'));
var arr = [
    rxjs_1.Observable.of({ pippo: 'pluto' }),
    rxjs_1.Observable.of('pippo')
];
rxjs_1.Observable.forkJoin(arr)
    .subscribe(createSubscriber('fork'));
rxjs_1.Observable.from('pippo')
    .subscribe(createSubscriber('pippo'));
rxjs_1.Observable.from(['minnie', 'paperino'])
    .subscribe(createSubscriber('arrayFrom'));
rxjs_1.Observable.range(0, 10)
    .subscribe(createSubscriber('range'));
rxjs_1.Observable.from([0, 1, 2, 3, 4, 5])
    .map(function (el) { return el * 10; })
    .flatMap(function () { return rxjs_1.Observable.of('ciaone'); })
    .subscribe(createSubscriber('switchmap'));
var timer$ = rxjs_1.Observable.create(function (observer) {
    var interval = setInterval(function () {
        observer.next('finito!');
    }, 1000);
    //unsubscription cb
    return function () { return clearInterval(interval); };
});
var subscription = timer$
    .take(20)
    .subscribe(createSubscriber('timer$'));
setTimeout(function () { return subscription.unsubscribe(); }, 5000);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzUwNzgzN2FmY2I4MTYzNTBhNTQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3JlZGlzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy8uL3NyYy9lbnYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZyBeXFwuXFwvLipcXC5qc29uJCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2RldmVsb3BtZW50Lmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9wcm9kdWN0aW9uLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL21vbmdvLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvdmVoaWNsZXNSZWdpc3RyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UvTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkaXNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2FkZExvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9vYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFF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QU8sQ0FBQyxjQUFNLHdCQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUF2QixDQUF1QixDQUFDO0tBQ3RDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUd6QyxJQUFJLE1BQU0sR0FBRyxpQkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQWE7SUFDekMsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFN0IsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUVSLG1CQUFtQjtJQUNuQixNQUFNLENBQUMsY0FBTSxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxFQUF2QixDQUF1QjtBQUV4QyxDQUFDLENBQUM7QUFFRixJQUFJLFlBQVksR0FBRyxNQUFNO0tBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDUixTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFdEMsVUFBVSxDQUFDLGNBQU0sbUJBQVksQ0FBQyxXQUFXLEVBQUUsRUFBMUIsQ0FBMEIsRUFBRSxJQUFJLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzUwNzgzN2FmY2I4MTYzNTBhNTQiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7QVBQX0VOVn0gZnJvbSAnLi9lbnYnO1xyXG5leHBvcnQgY29uc3QgY29uZmlnID0gcmVxdWlyZShgLi9jb25maWcvJHtBUFBfRU5WfS5qc29uYCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29vc2VcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIHJlZGlzIGZyb20gJ3JlZGlzJztcclxuaW1wb3J0IElMb2NhdGlvbiBmcm9tICcuLi9tb2RlbC9JTG9jYXRpb24nO1xyXG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcclxuY29uc3QgY2xpZW50ID0gcmVkaXMuY3JlYXRlQ2xpZW50KHByb2Nlc3MuZW52LlJFRElTX1VSTCB8fCBjb25maWcucmVkaXMuaG9zdCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRpcyB7XHJcbiAgICBzdGF0aWMgZ2V0QWxsKCkgOk9ic2VydmFibGU8YW55PntcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQua2V5cygnKicsIChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldChpZDogYW55KSA6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGNsaWVudC5nZXQoaWQsIChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldChpZDogYW55LCBsb2NhdGlvbnM6IHN0cmluZykgOk9ic2VydmFibGU8YW55PntcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQuc2V0KGlkLCBsb2NhdGlvbnMsIChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGRlbGV0ZShpZDogYW55KXtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQuZGVsKGlkLCAoZXJyLCByZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwKTtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGVBbGwoKXtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQuZmx1c2hkYigoZXJyLCByZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwKTtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdGllcy9yZWRpcy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyeGpzXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFNlcnZlciBmcm9tICcuL3NlcnZlcic7XHJcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCBNb25nbyBmcm9tICcuL21vbmdvJztcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxubGV0IHNlcnZlciA9IFNlcnZlci5nZXRJbnN0YW5jZSgpO1xyXG5zZXJ2ZXIudXNlKCcvdmVoaWNsZXMnLCByZXF1aXJlKCcuL3JvdXRlcy92ZWhpY2xlc1JlZ2lzdHJhdGlvbicpKTtcclxuc2VydmVyLnVzZSgnL3ZlaGljbGVzJywgcmVxdWlyZSgnLi9yb3V0ZXMvYWRkTG9jYXRpb24nKSk7XHJcblxyXG5Nb25nby5jb25uZWN0KCk7XHJcblxyXG4vKmdlbmVyaWMgZXJyb3IgaGFuZGxlciAqL1xyXG5zZXJ2ZXIudXNlKChlcnI6IEVycm9yLCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgcmVzLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlIHx8ICdpbnRlcm5hbCBzZXJ2ZXIgZXJyb3InLFxyXG4gICAgICAgIHN0YWNrOiBlcnIuc3RhY2ssXHJcbiAgICAgICAgc3RhdHVzQ29kZTogNTAwXHJcbiAgICB9KVxyXG59KVxyXG5zZXJ2ZXIubGlzdGVuKHByb2Nlc3MuZW52LnBvcnQgfHwgY29uZmlnLnNlcnZlci5QT1JULCBcclxuICAgIGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgIGBzZXJ2ZXIgbGlzdGVuaW5nIG9uIHBvcnQgJHtwcm9jZXNzLmVudi5wb3J0IHx8IGNvbmZpZy5zZXJ2ZXIuUE9SVH1gKSk7XHJcblxyXG5cclxucmVxdWlyZSgnLi9vYnNlcnZhYmxlLnRzJyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XHJcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZTogU2VydmVyO1xyXG4gICAgc3RhdGljIGFwcDogZXhwcmVzcy5FeHByZXNzO1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIGFuIGluc3RhbmNlIG9mIHNlcnZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCl7XHJcbiAgICAgICAgaWYoIVNlcnZlci5pbnN0YW5jZSl7XHJcbiAgICAgICAgICAgIFNlcnZlci5pbnN0YW5jZSA9IG5ldyBTZXJ2ZXIoKTtcclxuICAgICAgICAgICAgU2VydmVyLmFwcCA9IGV4cHJlc3MoKTtcclxuICAgICAgICAgICAgU2VydmVyLmFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XHJcbiAgICAgICAgICAgIFNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuICAgICAgICAgICAgU2VydmVyLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogZmFsc2V9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTZXJ2ZXIuYXBwO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb3JnYW5cIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNvbnN0IEFQUF9FTlYgPSBwcm9jZXNzLmVudi5BUFBfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Vudi50cyIsInZhciBtYXAgPSB7XG5cdFwiLi9kZXZlbG9wbWVudC5qc29uXCI6IDExLFxuXHRcIi4vcHJvZHVjdGlvbi5qc29uXCI6IDEyXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29uZmlnIF5cXC5cXC8uKlxcLmpzb24kXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcInNlcnZlclwiOntcIlBPUlRcIjo5MDAyfSxcImRiXCI6e1wiaG9zdFwiOlwibW9uZ29kYjovL2hlcm9rdV9oczA1MzBucTp1NGtkbXY3Z2U4YW5oNzAwdXZldGRyaGk2M0BkczExMTQ3Ni5tbGFiLmNvbToxMTQ3Ni9oZXJva3VfaHMwNTMwbnFcIn0sXCJyZWRpc1wiOntcImhvc3RcIjpcInJlZGlzOi8vaDpwMDJjZDFmNmE3MWQ0Mzc5MGFjODI1MTIwMzU0YWNlNTkxNmU1ODMyNTdhNzhjNDg0N2VmNDU5YTRiZWIwYzRiMEBlYzItMzQtMjM2LTExNS0yNTEuY29tcHV0ZS0xLmFtYXpvbmF3cy5jb206MTgzMjlcIn19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29uZmlnL2RldmVsb3BtZW50Lmpzb25cbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wic2VydmVyXCI6e1wiUE9SVFwiOjkwMDJ9LFwiZGJcIjp7XCJob3N0XCI6XCJtb25nb2RiOi8vaGVyb2t1X2hzMDUzMG5xOnU0a2RtdjdnZThhbmg3MDB1dmV0ZHJoaTYzQGRzMTExNDc2Lm1sYWIuY29tOjExNDc2L2hlcm9rdV9oczA1MzBucVwifSxcInJlZGlzXCI6e1wiaG9zdFwiOlwicmVkaXM6Ly9oOnAwMmNkMWY2YTcxZDQzNzkwYWM4MjUxMjAzNTRhY2U1OTE2ZTU4MzI1N2E3OGM0ODQ3ZWY0NTlhNGJlYjBjNGIwQGVjMi0zNC0yMzYtMTE1LTI1MS5jb21wdXRlLTEuYW1hem9uYXdzLmNvbToxODMyOVwifX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb25maWcvcHJvZHVjdGlvbi5qc29uXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25nbyB7XHJcbiAgICBzdGF0aWMgZGI6IG1vbmdvb3NlLkNvbm5lY3Rpb247XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fVxyXG5cclxuICAgIHN0YXRpYyBjb25uZWN0KCl7XHJcbiAgICAgICAgbW9uZ29vc2UuY29ubmVjdChjb25maWcuZGIuaG9zdCwge3VzZU1vbmdvQ2xpZW50OiB0cnVlfSk7XHJcbiAgICAgICAgTW9uZ28uZGIgPSBtb25nb29zZS5jb25uZWN0aW9uO1xyXG4gICAgICAgIE1vbmdvLmRiLm9uKCdlcnJvcicsIGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlLCAnY29ubmVjdGlvbiBlcnJvcicpKTtcclxuICAgICAgICBNb25nby5kYi5vbignb3BlbicsIGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ2Nvbm5lY3RlZCB0byBtb25nbyBkYicpKTtcclxuICAgICAgICByZXR1cm4gTW9uZ28uZGI7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9uZ28udHMiLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICcuLi9zdG9yYWdlL0xvY2F0aW9uJztcclxuaW1wb3J0IFJlZGlzIGZyb20gJy4uL3V0aWxpdGllcy9yZWRpcyc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuXHJcbi8vcmVnaXN0cmF0aW9uXHJcbnJvdXRlci5wb3N0KCcvJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBpZighcmVxLmJvZHkuaWQpe1xyXG4gICAgICAgIHJldHVybiBuZXh0KG5ldyBFcnJvcignY2Fubm8gcmVnaXN0ZXIgYW4gdW5kZWZpbmVkIGlkJykpO1xyXG4gICAgfVxyXG4gICAgUmVkaXMuc2V0KHJlcS5ib2R5LmlkLCBKU09OLnN0cmluZ2lmeShbXSkpXHJcbiAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHZlaGljbGUgJHtyZXEuYm9keS5pZH0gcmVnaXN0ZXJlZGApO1xyXG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyID0+IG5leHQoZXJyKVxyXG4gICAgKVxyXG59KVxyXG5cclxuLy9kZXJlZ2lzdHJhdGlvblxyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAvKlJlZGlzLmRlbGV0ZUFsbCgpXHJcbiAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwKSA9PiB7fVxyXG4gICAgKTsqL1xyXG4gICAgUmVkaXMuZ2V0KHJlcS5wYXJhbXMuaWQpXHJcbiAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIG1hcmtlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZighbWFya2Vycyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoMjA0KTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy91cGRhdGUgZGJcclxuICAgICAgICAgICAgTG9jYXRpb24uZmluZE9uZSh7dWlkOiByZXEucGFyYW1zLmlkfSlcclxuICAgICAgICAgICAgLnRoZW4oKGxvY2F0aW9uOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvY2F0aW9uICYmIGxvY2F0aW9uLnVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ubWFya2VycyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubG9jYXRpb24ubWFya2VycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpZDogcmVxLnBhcmFtcy5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyczogbWFya2VycyA/IEpTT04ucGFyc2UobWFya2VycykgOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBMb2NhdGlvbi5maW5kT25lQW5kVXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICB1aWQ6IHJlcS5wYXJhbXMuaWRcclxuICAgICAgICAgICAgICAgIH0sIHskc2V0OiBsb2NhdGlvbn0sIHtuZXc6IHRydWUsIHVwc2VydDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwID0+IHtcclxuICAgICAgICAgICAgICAgIFJlZGlzLmRlbGV0ZShyZXEucGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHZlaGljbGUgJHtyZXEucGFyYW1zLmlkfSBjYW5jZWxsZWQgZnJvbSByZWRpc2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyID0+IG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICApXHJcblxyXG59KVxyXG5cclxuLyoqXHJcbiAqIGdldCBhbGwgdmVoaWNsZXMgb24gZGJcclxuICovXHJcbnJvdXRlci5nZXQoJy9hcmNoaXZlJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBMb2NhdGlvbi5maW5kKHt9KVxyXG4gICAgLnRoZW4odmVoaWNsZXMgPT4ge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHZlaGljbGVzKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IG5leHQoZXJyKSk7XHJcbn0pXHJcblxyXG5cclxuLyoqXHJcbiAqIGdldCBhbGwgY3VycmVudCBhY3RpdmUgdmVoaWNsZXMgcG9zaXRpb25zIChvbiByZWRpcylcclxuICovXHJcbnJvdXRlci5nZXQoJy8nLCAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIFJlZGlzLmdldEFsbCgpXHJcbiAgICAuZmxhdE1hcCgoa2V5cykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYWxsVmFsdWVzJCA9IGtleXMubWFwKChrZXk6IGFueSkgPT4gUmVkaXMuZ2V0KGtleSkuc3dpdGNoTWFwKG1hcmtlcnMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSAmJiBrZXkgIT09ICd1bmRlZmluZWQnIFxyXG4gICAgICAgICAgICAgICAgICAgID8gT2JzZXJ2YWJsZS5vZih7dWlkOiBrZXksIGxvY2F0aW9uczogbWFya2Vyc30pIFxyXG4gICAgICAgICAgICAgICAgICAgIDogT2JzZXJ2YWJsZS5vZih7fSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZm9ya0pvaW4oLi4uYWxsVmFsdWVzJCk7XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG4gICAgLnN1YnNjcmliZShcclxuICAgICAgICBhcnJheSA9PiB7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKGFycmF5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICApXHJcbn0pXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdXRlcy92ZWhpY2xlc1JlZ2lzdHJhdGlvbi50cyIsImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmNvbnN0IHNpbmdsZUxvY2F0aW9uU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICBsYXQ6IHtcclxuICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICBsbmc6IHtcclxuICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH0sXHJcbiAgICBhdDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfVxyXG59KVxyXG5cclxuXHJcbmNvbnN0IExvY2F0aW9uU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICB1aWQ6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgdW5pcXVlOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgbWFya2Vyczoge1xyXG4gICAgICAgIHR5cGU6IFtzaW5nbGVMb2NhdGlvblNjaGVtYV0sXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdDogW11cclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNvbnN0IExvY2F0aW9uID0gbW9uZ29vc2UubW9kZWwoJ0xvY2F0aW9uJywgTG9jYXRpb25TY2hlbWEpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RvcmFnZS9Mb2NhdGlvbi50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZGlzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkaXNcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi4vc3RvcmFnZS9Mb2NhdGlvbic7XHJcbmltcG9ydCBJTG9jYXRpb24gZnJvbSAnLi4vbW9kZWwvSUxvY2F0aW9uJztcclxuaW1wb3J0IFJlZGlzIGZyb20gJy4uL3V0aWxpdGllcy9yZWRpcyc7XHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIucG9zdCgnLzppZC9sb2NhdGlvbnMnLCAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIFJlZGlzLmdldChyZXEucGFyYW1zLmlkKVxyXG4gICAgLmZsYXRNYXAoXHJcbiAgICAgICAgbWFya2VycyA9PiB7XHJcbiAgICAgICAgICAgIGlmKCFtYXJrZXJzKXtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndmVoaWNsZSBub3QgcmVnaXN0ZXJlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlcS5ib2R5LmxhdCAmJiByZXEuYm9keS5sbmcgJiYgcmVxLmJvZHkuYXQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZGlzLnNldChyZXEucGFyYW1zLmlkLCBKU09OLnN0cmluZ2lmeShbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uSlNPTi5wYXJzZShtYXJrZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICByZXEuYm9keVxyXG4gICAgICAgICAgICAgICAgXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZW1wdHkgbG9jYXRpb24gYm9keScpO1xyXG4gICAgICAgIH1cclxuICAgIClcclxuICAgIC5zdWJzY3JpYmUoIFxyXG4gICAgICAgIHJlc3AgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbmV3IHBvcy4gZm9yIHZlaGljbGUgJHtyZXEucGFyYW1zLmlkfSBhZGRlZCB0byByZWRpc2ApO1xyXG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIGVyciA9PiBuZXh0KHttZXNzYWdlOiAndmVoaWNsZSBub3QgcmVnaXN0ZXJlZCcsIHN0YWNrOiBlcnIuc3RhY2t9KVxyXG4gICAgKVxyXG5cclxufSlcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm91dGVzL2FkZExvY2F0aW9uLnRzIiwiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuY29uc29sZS5sb2coJ29ic2VydmFibGVzJyk7XHJcblxyXG5jb25zdCBjcmVhdGVTdWJzY3JpYmVyID0gKCh0eXBlOiBhbnkpID0+IHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IChlbDogYW55KSA9PiBjb25zb2xlLmxvZyhgbmV4dCAke3R5cGV9IC0gJHt0eXBlb2YoZWwpID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGVsKSA6IGVsfWApLFxyXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiBjb25zb2xlLmxvZyhgY29tcGxldGUgJHt0eXBlfWApLFxyXG4gICAgICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IGNvbnNvbGUubG9nKGBlcnIgJHt0eXBlfSAke2Vycn1gKVxyXG4gICAgfVxyXG59KVxyXG5cclxuT2JzZXJ2YWJsZS5pbnRlcnZhbCgzMDApXHJcbi50YWtlKDQpXHJcbi5tYXAoZWwgPT4gKE1hdGgucmFuZG9tKCkgKiAxMDApLnRvRml4ZWQoMikpXHJcbi5zdWJzY3JpYmUoY3JlYXRlU3Vic2NyaWJlcignaW50ZXJ2YWwnKSk7XHJcblxyXG5sZXQgYXJyID0gW1xyXG4gICAgT2JzZXJ2YWJsZS5vZih7cGlwcG86ICdwbHV0byd9KSxcclxuICAgIE9ic2VydmFibGUub2YoJ3BpcHBvJylcclxuXVxyXG5cclxuXHJcbk9ic2VydmFibGUuZm9ya0pvaW4oYXJyKVxyXG4uc3Vic2NyaWJlKGNyZWF0ZVN1YnNjcmliZXIoJ2ZvcmsnKSlcclxuXHJcblxyXG5PYnNlcnZhYmxlLmZyb20oJ3BpcHBvJylcclxuLnN1YnNjcmliZShjcmVhdGVTdWJzY3JpYmVyKCdwaXBwbycpKVxyXG5cclxuT2JzZXJ2YWJsZS5mcm9tKFsnbWlubmllJywgJ3BhcGVyaW5vJ10pXHJcbi5zdWJzY3JpYmUoY3JlYXRlU3Vic2NyaWJlcignYXJyYXlGcm9tJykpXHJcblxyXG5PYnNlcnZhYmxlLnJhbmdlKDAsIDEwKVxyXG4uc3Vic2NyaWJlKGNyZWF0ZVN1YnNjcmliZXIoJ3JhbmdlJykpXHJcblxyXG5PYnNlcnZhYmxlLmZyb20oWzAsIDEsIDIsIDMsIDQsIDVdKVxyXG4ubWFwKGVsID0+IGVsICogMTApXHJcbi5mbGF0TWFwKCgpID0+IE9ic2VydmFibGUub2YoJ2NpYW9uZScpKVxyXG4uc3Vic2NyaWJlKGNyZWF0ZVN1YnNjcmliZXIoJ3N3aXRjaG1hcCcpKVxyXG5cclxuXHJcbmxldCB0aW1lciQgPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xyXG4gICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQoJ2Zpbml0byEnKTtcclxuICBcclxuICAgIH0sIDEwMDApXHJcblxyXG4gICAgLy91bnN1YnNjcmlwdGlvbiBjYlxyXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpXHJcblxyXG59KVxyXG5cclxubGV0IHN1YnNjcmlwdGlvbiA9IHRpbWVyJFxyXG4udGFrZSgyMClcclxuLnN1YnNjcmliZShjcmVhdGVTdWJzY3JpYmVyKCd0aW1lciQnKSlcclxuXHJcbnNldFRpbWVvdXQoKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCksIDUwMDApO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL29ic2VydmFibGUudHMiXSwic291cmNlUm9vdCI6IiJ9