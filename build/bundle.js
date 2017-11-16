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
var env_1 = __webpack_require__(10);
exports.config = __webpack_require__(11)("./" + env_1.APP_ENV + ".json");


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
var redis = __webpack_require__(17);
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

__webpack_require__(6);
module.exports = __webpack_require__(19);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __webpack_require__(7);
var config_1 = __webpack_require__(1);
var mongo_1 = __webpack_require__(14);
var server = server_1.default.getInstance();
server.use('/vehicles', __webpack_require__(15));
server.use('/vehicles', __webpack_require__(18));
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(0);
var morgan = __webpack_require__(8);
var bodyParser = __webpack_require__(9);
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
/* 8 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ENV = process.env.APP_ENV || 'development';


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./development.json": 12,
	"./production.json": 13
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
webpackContext.id = 11;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"server":{"PORT":9002},"db":{"host":"mongodb://heroku_hs0530nq:u4kdmv7ge8anh700uvetdrhi63@ds111476.mlab.com:11476/heroku_hs0530nq"},"redis":{"host":"redis://h:p02cd1f6a71d43790ac825120354ace5916e583257a78c4847ef459a4beb0c4b0@ec2-34-236-115-251.compute-1.amazonaws.com:18329"}}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"server":{"PORT":9002},"db":{"host":"mongodb://heroku_hs0530nq:u4kdmv7ge8anh700uvetdrhi63@ds111476.mlab.com:11476/heroku_hs0530nq"},"redis":{"host":"redis://h:p02cd1f6a71d43790ac825120354ace5916e583257a78c4847ef459a4beb0c4b0@ec2-34-236-115-251.compute-1.amazonaws.com:18329"}}

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(0);
var Location_1 = __webpack_require__(16);
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
        //if(keys){
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
router.get('/prova', function (req, res, next) {
    redis_1.default.get("pippo")
        .switchMap(function (markers) {
        return rxjs_1.Observable.of({ uid: "pippo", locations: markers });
    })
        .subscribe(function (el) {
        var p = el;
    });
});
module.exports = router;


/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(20);
var nodeExternals = __webpack_require__(21);

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts'] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.ts?$/
            }
        ]
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      },
    target: 'node',
    externals: [nodeExternals()],
}
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGFiN2Q3OThiZTBjZTMyYTMyOWYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3JlZGlzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy8uL3NyYy9lbnYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZyBeXFwuXFwvLipcXC5qc29uJCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2RldmVsb3BtZW50Lmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9wcm9kdWN0aW9uLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL21vbmdvLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvdmVoaWNsZXNSZWdpc3RyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UvTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkaXNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2FkZExvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3dlYnBhY2suY29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEM7Ozs7Ozs7QUM5QkEsaUM7Ozs7OztBQ0FBLG1EIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwYWI3ZDc5OGJlMGNlMzJhMzI5ZiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtBUFBfRU5WfSBmcm9tICcuL2Vudic7XHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSByZXF1aXJlKGAuL2NvbmZpZy8ke0FQUF9FTlZ9Lmpzb25gKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uZmlnLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb25nb29zZVwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICogYXMgcmVkaXMgZnJvbSAncmVkaXMnO1xyXG5pbXBvcnQgSUxvY2F0aW9uIGZyb20gJy4uL21vZGVsL0lMb2NhdGlvbic7XHJcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi9jb25maWcnO1xyXG5jb25zdCBjbGllbnQgPSByZWRpcy5jcmVhdGVDbGllbnQocHJvY2Vzcy5lbnYuUkVESVNfVVJMIHx8IGNvbmZpZy5yZWRpcy5ob3N0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZGlzIHtcclxuICAgIHN0YXRpYyBnZXRBbGwoKSA6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGNsaWVudC5rZXlzKCcqJywgKGVyciwgcmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcCk7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0KGlkOiBhbnkpIDpPYnNlcnZhYmxlPGFueT57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcclxuICAgICAgICAgICAgY2xpZW50LmdldChpZCwgKGVyciwgcmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcCk7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc2V0KGlkOiBhbnksIGxvY2F0aW9uczogc3RyaW5nKSA6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZXQoaWQsIGxvY2F0aW9ucywgKGVyciwgcmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcCk7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGVsZXRlKGlkOiBhbnkpe1xyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGNsaWVudC5kZWwoaWQsIChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGRlbGV0ZUFsbCgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGNsaWVudC5mbHVzaGRiKChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbGl0aWVzL3JlZGlzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJ4anNcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgU2VydmVyIGZyb20gJy4vc2VydmVyJztcclxuaW1wb3J0IHtjb25maWd9IGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IE1vbmdvIGZyb20gJy4vbW9uZ28nO1xyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5sZXQgc2VydmVyID0gU2VydmVyLmdldEluc3RhbmNlKCk7XHJcbnNlcnZlci51c2UoJy92ZWhpY2xlcycsIHJlcXVpcmUoJy4vcm91dGVzL3ZlaGljbGVzUmVnaXN0cmF0aW9uJykpO1xyXG5zZXJ2ZXIudXNlKCcvdmVoaWNsZXMnLCByZXF1aXJlKCcuL3JvdXRlcy9hZGRMb2NhdGlvbicpKTtcclxuXHJcbk1vbmdvLmNvbm5lY3QoKTtcclxuXHJcbi8qZ2VuZXJpYyBlcnJvciBoYW5kbGVyICovXHJcbnNlcnZlci51c2UoKGVycjogRXJyb3IsIHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICByZXMuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgJ2ludGVybmFsIHNlcnZlciBlcnJvcicsXHJcbiAgICAgICAgc3RhY2s6IGVyci5zdGFjayxcclxuICAgICAgICBzdGF0dXNDb2RlOiA1MDBcclxuICAgIH0pXHJcbn0pXHJcbnNlcnZlci5saXN0ZW4ocHJvY2Vzcy5lbnYucG9ydCB8fCBjb25maWcuc2VydmVyLlBPUlQsIFxyXG4gICAgY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAgYHNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCAke3Byb2Nlc3MuZW52LnBvcnQgfHwgY29uZmlnLnNlcnZlci5QT1JUfWApKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0ICogYXMgbW9yZ2FuIGZyb20gJ21vcmdhbic7XHJcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZTogU2VydmVyO1xyXG4gICAgc3RhdGljIGFwcDogZXhwcmVzcy5FeHByZXNzO1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIGFuIGluc3RhbmNlIG9mIHNlcnZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCl7XHJcbiAgICAgICAgaWYoIVNlcnZlci5pbnN0YW5jZSl7XHJcbiAgICAgICAgICAgIFNlcnZlci5pbnN0YW5jZSA9IG5ldyBTZXJ2ZXIoKTtcclxuICAgICAgICAgICAgU2VydmVyLmFwcCA9IGV4cHJlc3MoKTtcclxuICAgICAgICAgICAgU2VydmVyLmFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XHJcbiAgICAgICAgICAgIFNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuICAgICAgICAgICAgU2VydmVyLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogZmFsc2V9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTZXJ2ZXIuYXBwO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb3JnYW5cIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNvbnN0IEFQUF9FTlYgPSBwcm9jZXNzLmVudi5BUFBfRU5WIHx8ICdkZXZlbG9wbWVudCc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Vudi50cyIsInZhciBtYXAgPSB7XG5cdFwiLi9kZXZlbG9wbWVudC5qc29uXCI6IDEyLFxuXHRcIi4vcHJvZHVjdGlvbi5qc29uXCI6IDEzXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTE7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29uZmlnIF5cXC5cXC8uKlxcLmpzb24kXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcInNlcnZlclwiOntcIlBPUlRcIjo5MDAyfSxcImRiXCI6e1wiaG9zdFwiOlwibW9uZ29kYjovL2hlcm9rdV9oczA1MzBucTp1NGtkbXY3Z2U4YW5oNzAwdXZldGRyaGk2M0BkczExMTQ3Ni5tbGFiLmNvbToxMTQ3Ni9oZXJva3VfaHMwNTMwbnFcIn0sXCJyZWRpc1wiOntcImhvc3RcIjpcInJlZGlzOi8vaDpwMDJjZDFmNmE3MWQ0Mzc5MGFjODI1MTIwMzU0YWNlNTkxNmU1ODMyNTdhNzhjNDg0N2VmNDU5YTRiZWIwYzRiMEBlYzItMzQtMjM2LTExNS0yNTEuY29tcHV0ZS0xLmFtYXpvbmF3cy5jb206MTgzMjlcIn19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29uZmlnL2RldmVsb3BtZW50Lmpzb25cbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wic2VydmVyXCI6e1wiUE9SVFwiOjkwMDJ9LFwiZGJcIjp7XCJob3N0XCI6XCJtb25nb2RiOi8vaGVyb2t1X2hzMDUzMG5xOnU0a2RtdjdnZThhbmg3MDB1dmV0ZHJoaTYzQGRzMTExNDc2Lm1sYWIuY29tOjExNDc2L2hlcm9rdV9oczA1MzBucVwifSxcInJlZGlzXCI6e1wiaG9zdFwiOlwicmVkaXM6Ly9oOnAwMmNkMWY2YTcxZDQzNzkwYWM4MjUxMjAzNTRhY2U1OTE2ZTU4MzI1N2E3OGM0ODQ3ZWY0NTlhNGJlYjBjNGIwQGVjMi0zNC0yMzYtMTE1LTI1MS5jb21wdXRlLTEuYW1hem9uYXdzLmNvbToxODMyOVwifX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb25maWcvcHJvZHVjdGlvbi5qc29uXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25nbyB7XHJcbiAgICBzdGF0aWMgZGI6IG1vbmdvb3NlLkNvbm5lY3Rpb247XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fVxyXG5cclxuICAgIHN0YXRpYyBjb25uZWN0KCl7XHJcbiAgICAgICAgbW9uZ29vc2UuY29ubmVjdChjb25maWcuZGIuaG9zdCwge3VzZU1vbmdvQ2xpZW50OiB0cnVlfSk7XHJcbiAgICAgICAgTW9uZ28uZGIgPSBtb25nb29zZS5jb25uZWN0aW9uO1xyXG4gICAgICAgIE1vbmdvLmRiLm9uKCdlcnJvcicsIGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlLCAnY29ubmVjdGlvbiBlcnJvcicpKTtcclxuICAgICAgICBNb25nby5kYi5vbignb3BlbicsIGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ2Nvbm5lY3RlZCB0byBtb25nbyBkYicpKTtcclxuICAgICAgICByZXR1cm4gTW9uZ28uZGI7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9uZ28udHMiLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICcuLi9zdG9yYWdlL0xvY2F0aW9uJztcclxuaW1wb3J0IFJlZGlzIGZyb20gJy4uL3V0aWxpdGllcy9yZWRpcyc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuXHJcbi8vcmVnaXN0cmF0aW9uXHJcbnJvdXRlci5wb3N0KCcvJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBpZighcmVxLmJvZHkuaWQpe1xyXG4gICAgICAgIHJldHVybiBuZXh0KG5ldyBFcnJvcignY2Fubm8gcmVnaXN0ZXIgYW4gdW5kZWZpbmVkIGlkJykpO1xyXG4gICAgfVxyXG4gICAgUmVkaXMuc2V0KHJlcS5ib2R5LmlkLCBKU09OLnN0cmluZ2lmeShbXSkpXHJcbiAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHZlaGljbGUgJHtyZXEuYm9keS5pZH0gcmVnaXN0ZXJlZGApO1xyXG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyID0+IG5leHQoZXJyKVxyXG4gICAgKVxyXG59KVxyXG5cclxuLy9kZXJlZ2lzdHJhdGlvblxyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAvKlJlZGlzLmRlbGV0ZUFsbCgpXHJcbiAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwKSA9PiB7fVxyXG4gICAgKTsqL1xyXG4gICAgUmVkaXMuZ2V0KHJlcS5wYXJhbXMuaWQpXHJcbiAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIG1hcmtlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZighbWFya2Vycyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoMjA0KTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy91cGRhdGUgZGJcclxuICAgICAgICAgICAgTG9jYXRpb24uZmluZE9uZSh7dWlkOiByZXEucGFyYW1zLmlkfSlcclxuICAgICAgICAgICAgLnRoZW4oKGxvY2F0aW9uOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvY2F0aW9uICYmIGxvY2F0aW9uLnVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ubWFya2VycyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubG9jYXRpb24ubWFya2VycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpZDogcmVxLnBhcmFtcy5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyczogbWFya2VycyA/IEpTT04ucGFyc2UobWFya2VycykgOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBMb2NhdGlvbi5maW5kT25lQW5kVXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICB1aWQ6IHJlcS5wYXJhbXMuaWRcclxuICAgICAgICAgICAgICAgIH0sIHskc2V0OiBsb2NhdGlvbn0sIHtuZXc6IHRydWUsIHVwc2VydDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwID0+IHtcclxuICAgICAgICAgICAgICAgIFJlZGlzLmRlbGV0ZShyZXEucGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHZlaGljbGUgJHtyZXEucGFyYW1zLmlkfSBjYW5jZWxsZWQgZnJvbSByZWRpc2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyID0+IG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICApXHJcblxyXG59KVxyXG5cclxuLyoqXHJcbiAqIGdldCBhbGwgdmVoaWNsZXMgb24gZGJcclxuICovXHJcbnJvdXRlci5nZXQoJy9hcmNoaXZlJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBMb2NhdGlvbi5maW5kKHt9KVxyXG4gICAgLnRoZW4odmVoaWNsZXMgPT4ge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHZlaGljbGVzKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IG5leHQoZXJyKSk7XHJcbn0pXHJcblxyXG5cclxuLyoqXHJcbiAqIGdldCBhbGwgY3VycmVudCBhY3RpdmUgdmVoaWNsZXMgcG9zaXRpb25zIChvbiByZWRpcylcclxuICovXHJcbnJvdXRlci5nZXQoJy8nLCAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIFJlZGlzLmdldEFsbCgpXHJcbiAgICAuZmxhdE1hcCgoa2V5cykgPT4ge1xyXG4gICAgICAgICAgICAvL2lmKGtleXMpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGFsbFZhbHVlcyQgPSBrZXlzLm1hcCgoa2V5OiBhbnkpID0+IFJlZGlzLmdldChrZXkpLnN3aXRjaE1hcChtYXJrZXJzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5ICYmIGtleSAhPT0gJ3VuZGVmaW5lZCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gT2JzZXJ2YWJsZS5vZih7dWlkOiBrZXksIGxvY2F0aW9uczogbWFya2Vyc30pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IE9ic2VydmFibGUub2Yoe30pO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZm9ya0pvaW4oLi4uYWxsVmFsdWVzJCk7XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG4gICAgLnN1YnNjcmliZShcclxuICAgICAgICBhcnJheSA9PiB7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKGFycmF5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICApXHJcbn0pXHJcblxyXG5yb3V0ZXIuZ2V0KCcvcHJvdmEnLCAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIFJlZGlzLmdldChcInBpcHBvXCIpXHJcbiAgICAuc3dpdGNoTWFwKG1hcmtlcnMgPT4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHt1aWQ6IFwicGlwcG9cIiwgbG9jYXRpb25zOiBtYXJrZXJzfSk7XHJcbiAgICB9KVxyXG4gICAgLnN1YnNjcmliZShlbCA9PiB7XHJcbiAgICAgICAgbGV0IHAgPSBlbDtcclxuICAgIH0pXHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm91dGVzL3ZlaGljbGVzUmVnaXN0cmF0aW9uLnRzIiwiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3Qgc2luZ2xlTG9jYXRpb25TY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIGxhdDoge1xyXG4gICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGxuZzoge1xyXG4gICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGF0OiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuY29uc3QgTG9jYXRpb25TY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIHVpZDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB1bmlxdWU6IHRydWVcclxuICAgIH0sXHJcbiAgICBtYXJrZXJzOiB7XHJcbiAgICAgICAgdHlwZTogW3NpbmdsZUxvY2F0aW9uU2NoZW1hXSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0OiBbXVxyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY29uc3QgTG9jYXRpb24gPSBtb25nb29zZS5tb2RlbCgnTG9jYXRpb24nLCBMb2NhdGlvblNjaGVtYSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yYWdlL0xvY2F0aW9uLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkaXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWRpc1wiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICcuLi9zdG9yYWdlL0xvY2F0aW9uJztcclxuaW1wb3J0IElMb2NhdGlvbiBmcm9tICcuLi9tb2RlbC9JTG9jYXRpb24nO1xyXG5pbXBvcnQgUmVkaXMgZnJvbSAnLi4vdXRpbGl0aWVzL3JlZGlzJztcclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5wb3N0KCcvOmlkL2xvY2F0aW9ucycsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgUmVkaXMuZ2V0KHJlcS5wYXJhbXMuaWQpXHJcbiAgICAuZmxhdE1hcChcclxuICAgICAgICBtYXJrZXJzID0+IHtcclxuICAgICAgICAgICAgaWYoIW1hcmtlcnMpe1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2ZWhpY2xlIG5vdCByZWdpc3RlcmVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmVxLmJvZHkubGF0ICYmIHJlcS5ib2R5LmxuZyAmJiByZXEuYm9keS5hdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVkaXMuc2V0KHJlcS5wYXJhbXMuaWQsIEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICAgICAgICAuLi5KU09OLnBhcnNlKG1hcmtlcnMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5ib2R5XHJcbiAgICAgICAgICAgICAgICBdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbXB0eSBsb2NhdGlvbiBib2R5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG4gICAgLnN1YnNjcmliZSggXHJcbiAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBuZXcgcG9zLiBmb3IgdmVoaWNsZSAke3JlcS5wYXJhbXMuaWR9IGFkZGVkIHRvIHJlZGlzYCk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKDIwNCk7XHJcbiAgICAgICAgfSwgXHJcbiAgICAgICAgZXJyID0+IG5leHQoe21lc3NhZ2U6ICd2ZWhpY2xlIG5vdCByZWdpc3RlcmVkJywgc3RhY2s6IGVyci5zdGFja30pXHJcbiAgICApXHJcblxyXG59KVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcm91dGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3V0ZXMvYWRkTG9jYXRpb24udHMiLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxudmFyIG5vZGVFeHRlcm5hbHMgPSByZXF1aXJlKCd3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGVudHJ5OiAnLi9zcmMvaW5kZXgudHMnLFxyXG4gICAgZGV2dG9vbDogJ2lubGluZS1zb3VyY2UtbWFwJyxcclxuICAgIG91dHB1dDoge1xyXG4gICAgICAgIHB1YmxpY1BhdGg6IFwiL1wiLFxyXG4gICAgICAgIHBhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdidWlsZCcpLFxyXG4gICAgICAgIGZpbGVuYW1lOiAnYnVuZGxlLmpzJ1xyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBleHRlbnNpb25zOiBbJy50cyddIC8vcmVzb2x2ZSBhbGwgdGhlIG1vZHVsZXMgb3RoZXIgdGhhbiBpbmRleC50c1xyXG4gICAgfSxcclxuICAgIG1vZHVsZToge1xyXG4gICAgICAgIHJ1bGVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxvYWRlcjogJ3RzLWxvYWRlcicsXHJcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwudHM/JC9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBzdGF0czoge1xyXG4gICAgICAgIGNvbG9yczogdHJ1ZSxcclxuICAgICAgICBtb2R1bGVzOiB0cnVlLFxyXG4gICAgICAgIHJlYXNvbnM6IHRydWUsXHJcbiAgICAgICAgZXJyb3JEZXRhaWxzOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICB0YXJnZXQ6ICdub2RlJyxcclxuICAgIGV4dGVybmFsczogW25vZGVFeHRlcm5hbHMoKV0sXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3dlYnBhY2suY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2VicGFjay1ub2RlLWV4dGVybmFsc1wiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9