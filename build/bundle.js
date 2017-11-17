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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTgzM2VkNTc3ZDM5ZmYwMTUwZTUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3JlZGlzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy8uL3NyYy9lbnYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZyBeXFwuXFwvLipcXC5qc29uJCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2RldmVsb3BtZW50Lmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9wcm9kdWN0aW9uLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL21vbmdvLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvdmVoaWNsZXNSZWdpc3RyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UvTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkaXNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2FkZExvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3dlYnBhY2suY29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLG9DOzs7Ozs7Ozs7QUNBQSxvQ0FBOEI7QUFDakIsY0FBTSxHQUFHLDRCQUFRLEdBQVksYUFBTyxVQUFPLENBQUMsQ0FBQzs7Ozs7OztBQ0QxRCxxQzs7Ozs7Ozs7O0FDQUEsb0NBQWtDO0FBQ2xDLG9DQUErQjtBQUUvQixzQ0FBaUM7QUFDakMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTlFO0lBQUE7SUF5REEsQ0FBQztJQXhEVSxZQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDLGtCQUFRO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7Z0JBQ3ZCLEVBQUUsRUFBQyxHQUFHLENBQUMsRUFBQztvQkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNNLFNBQUcsR0FBVixVQUFXLEVBQU87UUFDZCxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDLGtCQUFRO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7Z0JBQ3JCLEVBQUUsRUFBQyxHQUFHLENBQUMsRUFBQztvQkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNNLFNBQUcsR0FBVixVQUFXLEVBQU8sRUFBRSxTQUFpQjtRQUNqQyxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDLGtCQUFRO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJO2dCQUNoQyxFQUFFLEVBQUMsR0FBRyxDQUFDLEVBQUM7b0JBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDTSxZQUFNLEdBQWIsVUFBYyxFQUFPO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsa0JBQVE7WUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtnQkFDckIsRUFBRSxFQUFDLEdBQUcsQ0FBQyxFQUFDO29CQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO2dCQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7SUFDTixDQUFDO0lBQ00sZUFBUyxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsa0JBQVE7WUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO2dCQUNyQixFQUFFLEVBQUMsR0FBRyxDQUFDLEVBQUM7b0JBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTCxZQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7QUMvREQsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsc0NBQThCO0FBQzlCLHNDQUFnQztBQUNoQyxzQ0FBNEI7QUFFNUIsSUFBSSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxtQkFBTyxDQUFDLEVBQStCLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLG1CQUFPLENBQUMsRUFBc0IsQ0FBQyxDQUFDLENBQUM7QUFFekQsZUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRWhCLDBCQUEwQjtBQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBVSxFQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUMzRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksdUJBQXVCO1FBQy9DLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztRQUNoQixVQUFVLEVBQUUsR0FBRztLQUNsQixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxlQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFHLCtCQUE0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxlQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ25CdEcscUNBQW1DO0FBQ25DLG9DQUFpQztBQUNqQyx3Q0FBMEM7QUFFMUM7SUFHSTtJQUFzQixDQUFDO0lBRXZCOztPQUVHO0lBQ1csa0JBQVcsR0FBekI7UUFDSSxFQUFFLEVBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUM7WUFDakIsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7WUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7QUN2QkQsbUM7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7QUNBYSxlQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDOzs7Ozs7O0FDQTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCOzs7Ozs7QUNsQkEsa0JBQWtCLFVBQVUsWUFBWSxPQUFPLHNHQUFzRyxVQUFVLHVJOzs7Ozs7QUNBL0osa0JBQWtCLFVBQVUsWUFBWSxPQUFPLHNHQUFzRyxVQUFVLHVJOzs7Ozs7Ozs7QUNBL0osc0NBQXFDO0FBQ3JDLHNDQUFnQztBQUVoQztJQUVJO0lBQXNCLENBQUM7SUFFaEIsYUFBTyxHQUFkO1FBQ0ksUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3pELEtBQUssQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUMvQixLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN0RSxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7O0FDZEQscUNBQW1DO0FBQ25DLHlDQUE2QztBQUM3QyxxQ0FBdUM7QUFDdkMsb0NBQWdDO0FBRWhDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUdoQyxjQUFjO0FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDckYsRUFBRSxFQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDRCxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDekMsU0FBUyxDQUNOLFVBQUMsSUFBUztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWEsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxFQUNELGFBQUcsSUFBSSxXQUFJLENBQUMsR0FBRyxDQUFDLEVBQVQsQ0FBUyxDQUNuQjtBQUNMLENBQUMsQ0FBQztBQUVGLGdCQUFnQjtBQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUMxRjs7O1FBR0k7SUFDSixlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ3ZCLFNBQVMsQ0FDTixpQkFBTztRQUNILEVBQUUsRUFBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELFdBQVc7UUFDWCxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxDQUFDO2FBQ3JDLElBQUksQ0FBQyxVQUFDLFFBQWE7WUFDaEIsRUFBRSxFQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQ3pCLFFBQVEsQ0FBQyxPQUFPLEdBQ1QsUUFBUSxDQUFDLE9BQU87b0JBQ25CLE9BQU87a0JBQ1Y7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osUUFBUSxHQUFHO29CQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7aUJBQzlDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxtQkFBUSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2FBQ3JCLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxjQUFJO1lBQ04sZUFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztpQkFDMUIsU0FBUyxDQUNOLGNBQUk7Z0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSwwQkFBdUIsQ0FBQyxDQUFDO2dCQUM3RCxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsRUFDRCxhQUFHLElBQUksV0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFULENBQVMsQ0FDbkI7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsYUFBRztZQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FDSjtBQUVMLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDM0YsbUJBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ2hCLElBQUksQ0FBQyxrQkFBUTtRQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxhQUFHLElBQUksV0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFULENBQVMsQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQztBQUdGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDcEYsZUFBSyxDQUFDLE1BQU0sRUFBRTtTQUNiLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDTixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBUSxJQUFLLHNCQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxpQkFBTztZQUNwRSxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxXQUFXO2dCQUM3QixDQUFDLENBQUMsaUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQztnQkFDL0MsQ0FBQyxDQUFDLGlCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxFQUpzQyxDQUl0QyxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsaUJBQVUsQ0FBQyxRQUFRLE9BQW5CLGlCQUFVLEVBQWEsVUFBVSxFQUFFO0lBQzlDLENBQUMsQ0FDSjtTQUNBLFNBQVMsQ0FDTixlQUFLO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDLEVBQ0QsYUFBRztRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FDSjtBQUNMLENBQUMsQ0FBQztBQUdGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7Ozs7Ozs7O0FDNUd4QixzQ0FBcUM7QUFFckMsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDN0MsR0FBRyxFQUFFO1FBQ0QsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUdGLElBQU0sY0FBYyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1FBQzVCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZDtDQUNKLENBQUM7QUFDVyxnQkFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7O0FDOUJuRSxrQzs7Ozs7Ozs7O0FDQUEscUNBQW1DO0FBR25DLHFDQUF1QztBQUN2QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUNsRyxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ3ZCLE9BQU8sQ0FDSixpQkFBTztRQUNILEVBQUUsRUFBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxFQUFFLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQztZQUM1QyxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDdEIsR0FBRyxDQUFDLElBQUk7ZUFDVixDQUFDLENBQUM7UUFDUixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FDSjtTQUNBLFNBQVMsQ0FDTixjQUFJO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBd0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLG9CQUFpQixDQUFDLENBQUM7UUFDcEUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDLEVBQ0QsYUFBRyxJQUFJLFdBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQTNELENBQTJELENBQ3JFO0FBRUwsQ0FBQyxDQUFDO0FBR0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7QUNqQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDOUJBLGlDOzs7Ozs7QUNBQSxtRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTgzM2VkNTc3ZDM5ZmYwMTUwZTUiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7QVBQX0VOVn0gZnJvbSAnLi9lbnYnO1xyXG5leHBvcnQgY29uc3QgY29uZmlnID0gcmVxdWlyZShgLi9jb25maWcvJHtBUFBfRU5WfS5qc29uYCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbmZpZy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29vc2VcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIHJlZGlzIGZyb20gJ3JlZGlzJztcclxuaW1wb3J0IElMb2NhdGlvbiBmcm9tICcuLi9tb2RlbC9JTG9jYXRpb24nO1xyXG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcclxuY29uc3QgY2xpZW50ID0gcmVkaXMuY3JlYXRlQ2xpZW50KHByb2Nlc3MuZW52LlJFRElTX1VSTCB8fCBjb25maWcucmVkaXMuaG9zdCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRpcyB7XHJcbiAgICBzdGF0aWMgZ2V0QWxsKCkgOk9ic2VydmFibGU8YW55PntcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQua2V5cygnKicsIChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldChpZDogYW55KSA6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIGNsaWVudC5nZXQoaWQsIChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldChpZDogYW55LCBsb2NhdGlvbnM6IHN0cmluZykgOk9ic2VydmFibGU8YW55PntcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQuc2V0KGlkLCBsb2NhdGlvbnMsIChlcnIsIHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGRlbGV0ZShpZDogYW55KXtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQuZGVsKGlkLCAoZXJyLCByZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwKTtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGVBbGwoKXtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBjbGllbnQuZmx1c2hkYigoZXJyLCByZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwKTtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdGllcy9yZWRpcy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyeGpzXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFNlcnZlciBmcm9tICcuL3NlcnZlcic7XHJcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCBNb25nbyBmcm9tICcuL21vbmdvJztcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxubGV0IHNlcnZlciA9IFNlcnZlci5nZXRJbnN0YW5jZSgpO1xyXG5zZXJ2ZXIudXNlKCcvdmVoaWNsZXMnLCByZXF1aXJlKCcuL3JvdXRlcy92ZWhpY2xlc1JlZ2lzdHJhdGlvbicpKTtcclxuc2VydmVyLnVzZSgnL3ZlaGljbGVzJywgcmVxdWlyZSgnLi9yb3V0ZXMvYWRkTG9jYXRpb24nKSk7XHJcblxyXG5Nb25nby5jb25uZWN0KCk7XHJcblxyXG4vKmdlbmVyaWMgZXJyb3IgaGFuZGxlciAqL1xyXG5zZXJ2ZXIudXNlKChlcnI6IEVycm9yLCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgcmVzLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlIHx8ICdpbnRlcm5hbCBzZXJ2ZXIgZXJyb3InLFxyXG4gICAgICAgIHN0YWNrOiBlcnIuc3RhY2ssXHJcbiAgICAgICAgc3RhdHVzQ29kZTogNTAwXHJcbiAgICB9KVxyXG59KVxyXG5zZXJ2ZXIubGlzdGVuKHByb2Nlc3MuZW52LnBvcnQgfHwgY29uZmlnLnNlcnZlci5QT1JULCBcclxuICAgIGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgIGBzZXJ2ZXIgbGlzdGVuaW5nIG9uIHBvcnQgJHtwcm9jZXNzLmVudi5wb3J0IHx8IGNvbmZpZy5zZXJ2ZXIuUE9SVH1gKSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xyXG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciB7XHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6IFNlcnZlcjtcclxuICAgIHN0YXRpYyBhcHA6IGV4cHJlc3MuRXhwcmVzcztcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpe1xyXG4gICAgICAgIGlmKCFTZXJ2ZXIuaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICBTZXJ2ZXIuaW5zdGFuY2UgPSBuZXcgU2VydmVyKCk7XHJcbiAgICAgICAgICAgIFNlcnZlci5hcHAgPSBleHByZXNzKCk7XHJcbiAgICAgICAgICAgIFNlcnZlci5hcHAudXNlKG1vcmdhbignZGV2JykpO1xyXG4gICAgICAgICAgICBTZXJ2ZXIuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XHJcbiAgICAgICAgICAgIFNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6IGZhbHNlfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gU2VydmVyLmFwcDtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9yZ2FuXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCBBUFBfRU5WID0gcHJvY2Vzcy5lbnYuQVBQX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnYudHMiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZGV2ZWxvcG1lbnQuanNvblwiOiAxMixcblx0XCIuL3Byb2R1Y3Rpb24uanNvblwiOiAxM1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDExO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbmZpZyBeXFwuXFwvLipcXC5qc29uJFxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJzZXJ2ZXJcIjp7XCJQT1JUXCI6OTAwMn0sXCJkYlwiOntcImhvc3RcIjpcIm1vbmdvZGI6Ly9oZXJva3VfaHMwNTMwbnE6dTRrZG12N2dlOGFuaDcwMHV2ZXRkcmhpNjNAZHMxMTE0NzYubWxhYi5jb206MTE0NzYvaGVyb2t1X2hzMDUzMG5xXCJ9LFwicmVkaXNcIjp7XCJob3N0XCI6XCJyZWRpczovL2g6cDAyY2QxZjZhNzFkNDM3OTBhYzgyNTEyMDM1NGFjZTU5MTZlNTgzMjU3YTc4YzQ4NDdlZjQ1OWE0YmViMGM0YjBAZWMyLTM0LTIzNi0xMTUtMjUxLmNvbXB1dGUtMS5hbWF6b25hd3MuY29tOjE4MzI5XCJ9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbmZpZy9kZXZlbG9wbWVudC5qc29uXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcInNlcnZlclwiOntcIlBPUlRcIjo5MDAyfSxcImRiXCI6e1wiaG9zdFwiOlwibW9uZ29kYjovL2hlcm9rdV9oczA1MzBucTp1NGtkbXY3Z2U4YW5oNzAwdXZldGRyaGk2M0BkczExMTQ3Ni5tbGFiLmNvbToxMTQ3Ni9oZXJva3VfaHMwNTMwbnFcIn0sXCJyZWRpc1wiOntcImhvc3RcIjpcInJlZGlzOi8vaDpwMDJjZDFmNmE3MWQ0Mzc5MGFjODI1MTIwMzU0YWNlNTkxNmU1ODMyNTdhNzhjNDg0N2VmNDU5YTRiZWIwYzRiMEBlYzItMzQtMjM2LTExNS0yNTEuY29tcHV0ZS0xLmFtYXpvbmF3cy5jb206MTgzMjlcIn19XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29uZmlnL3Byb2R1Y3Rpb24uanNvblxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uZ28ge1xyXG4gICAgc3RhdGljIGRiOiBtb25nb29zZS5Db25uZWN0aW9uO1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxuXHJcbiAgICBzdGF0aWMgY29ubmVjdCgpe1xyXG4gICAgICAgIG1vbmdvb3NlLmNvbm5lY3QoY29uZmlnLmRiLmhvc3QsIHt1c2VNb25nb0NsaWVudDogdHJ1ZX0pO1xyXG4gICAgICAgIE1vbmdvLmRiID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcclxuICAgICAgICBNb25nby5kYi5vbignZXJyb3InLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSwgJ2Nvbm5lY3Rpb24gZXJyb3InKSk7XHJcbiAgICAgICAgTW9uZ28uZGIub24oJ29wZW4nLCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdjb25uZWN0ZWQgdG8gbW9uZ28gZGInKSk7XHJcbiAgICAgICAgcmV0dXJuIE1vbmdvLmRiO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vbmdvLnRzIiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi4vc3RvcmFnZS9Mb2NhdGlvbic7XHJcbmltcG9ydCBSZWRpcyBmcm9tICcuLi91dGlsaXRpZXMvcmVkaXMnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcblxyXG4vL3JlZ2lzdHJhdGlvblxyXG5yb3V0ZXIucG9zdCgnLycsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgaWYoIXJlcS5ib2R5LmlkKXtcclxuICAgICAgICByZXR1cm4gbmV4dChuZXcgRXJyb3IoJ2Nhbm5vIHJlZ2lzdGVyIGFuIHVuZGVmaW5lZCBpZCcpKTtcclxuICAgIH1cclxuICAgIFJlZGlzLnNldChyZXEuYm9keS5pZCwgSlNPTi5zdHJpbmdpZnkoW10pKVxyXG4gICAgLnN1YnNjcmliZShcclxuICAgICAgICAocmVzcDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGB2ZWhpY2xlICR7cmVxLmJvZHkuaWR9IHJlZ2lzdGVyZWRgKTtcclxuICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoMjA0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVyciA9PiBuZXh0KGVycilcclxuICAgIClcclxufSlcclxuXHJcbi8vZGVyZWdpc3RyYXRpb25cclxucm91dGVyLmRlbGV0ZSgnLzppZCcsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgLypSZWRpcy5kZWxldGVBbGwoKVxyXG4gICAgLnN1YnNjcmliZShcclxuICAgICAgICAocmVzcCkgPT4ge31cclxuICAgICk7Ki9cclxuICAgIFJlZGlzLmdldChyZXEucGFyYW1zLmlkKVxyXG4gICAgLnN1YnNjcmliZShcclxuICAgICAgICBtYXJrZXJzID0+IHtcclxuICAgICAgICAgICAgaWYoIW1hcmtlcnMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDIwNCk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdXBkYXRlIGRiXHJcbiAgICAgICAgICAgIExvY2F0aW9uLmZpbmRPbmUoe3VpZDogcmVxLnBhcmFtcy5pZH0pXHJcbiAgICAgICAgICAgIC50aGVuKChsb2NhdGlvbjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihsb2NhdGlvbiAmJiBsb2NhdGlvbi51aWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLm1hcmtlcnMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmxvY2F0aW9uLm1hcmtlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlcnNcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IHJlcS5wYXJhbXMuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlcnM6IG1hcmtlcnMgPyBKU09OLnBhcnNlKG1hcmtlcnMpIDogW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTG9jYXRpb24uZmluZE9uZUFuZFVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlkOiByZXEucGFyYW1zLmlkXHJcbiAgICAgICAgICAgICAgICB9LCB7JHNldDogbG9jYXRpb259LCB7bmV3OiB0cnVlLCB1cHNlcnQ6IHRydWV9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBSZWRpcy5kZWxldGUocmVxLnBhcmFtcy5pZClcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB2ZWhpY2xlICR7cmVxLnBhcmFtcy5pZH0gY2FuY2VsbGVkIGZyb20gcmVkaXNgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoMjA0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVyciA9PiBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG5cclxufSlcclxuXHJcbi8qKlxyXG4gKiBnZXQgYWxsIHZlaGljbGVzIG9uIGRiXHJcbiAqL1xyXG5yb3V0ZXIuZ2V0KCcvYXJjaGl2ZScsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgTG9jYXRpb24uZmluZCh7fSlcclxuICAgIC50aGVuKHZlaGljbGVzID0+IHtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih2ZWhpY2xlcyk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiBuZXh0KGVycikpO1xyXG59KVxyXG5cclxuXHJcbi8qKlxyXG4gKiBnZXQgYWxsIGN1cnJlbnQgYWN0aXZlIHZlaGljbGVzIHBvc2l0aW9ucyAob24gcmVkaXMpXHJcbiAqL1xyXG5yb3V0ZXIuZ2V0KCcvJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBSZWRpcy5nZXRBbGwoKVxyXG4gICAgLmZsYXRNYXAoKGtleXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFsbFZhbHVlcyQgPSBrZXlzLm1hcCgoa2V5OiBhbnkpID0+IFJlZGlzLmdldChrZXkpLnN3aXRjaE1hcChtYXJrZXJzID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXkgJiYga2V5ICE9PSAndW5kZWZpbmVkJyBcclxuICAgICAgICAgICAgICAgICAgICA/IE9ic2VydmFibGUub2Yoe3VpZDoga2V5LCBsb2NhdGlvbnM6IG1hcmtlcnN9KSBcclxuICAgICAgICAgICAgICAgICAgICA6IE9ic2VydmFibGUub2Yoe30pO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmZvcmtKb2luKC4uLmFsbFZhbHVlcyQpO1xyXG4gICAgICAgIH1cclxuICAgIClcclxuICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgYXJyYXkgPT4ge1xyXG4gICAgICAgICAgICByZXMuanNvbihhcnJheSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG59KVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcm91dGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3V0ZXMvdmVoaWNsZXNSZWdpc3RyYXRpb24udHMiLCJpbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBzaW5nbGVMb2NhdGlvblNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgbGF0OiB7XHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgbG5nOiB7XHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgYXQ6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH1cclxufSlcclxuXHJcblxyXG5jb25zdCBMb2NhdGlvblNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgdWlkOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHVuaXF1ZTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIG1hcmtlcnM6IHtcclxuICAgICAgICB0eXBlOiBbc2luZ2xlTG9jYXRpb25TY2hlbWFdLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6IFtdXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjb25zdCBMb2NhdGlvbiA9IG1vbmdvb3NlLm1vZGVsKCdMb2NhdGlvbicsIExvY2F0aW9uU2NoZW1hKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JhZ2UvTG9jYXRpb24udHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWRpc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZGlzXCJcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJy4uL3N0b3JhZ2UvTG9jYXRpb24nO1xyXG5pbXBvcnQgSUxvY2F0aW9uIGZyb20gJy4uL21vZGVsL0lMb2NhdGlvbic7XHJcbmltcG9ydCBSZWRpcyBmcm9tICcuLi91dGlsaXRpZXMvcmVkaXMnO1xyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLnBvc3QoJy86aWQvbG9jYXRpb25zJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBSZWRpcy5nZXQocmVxLnBhcmFtcy5pZClcclxuICAgIC5mbGF0TWFwKFxyXG4gICAgICAgIG1hcmtlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZighbWFya2Vycyl7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZlaGljbGUgbm90IHJlZ2lzdGVyZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyZXEuYm9keS5sYXQgJiYgcmVxLmJvZHkubG5nICYmIHJlcS5ib2R5LmF0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWRpcy5zZXQocmVxLnBhcmFtcy5pZCwgSlNPTi5zdHJpbmdpZnkoW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLkpTT04ucGFyc2UobWFya2VycyksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmJvZHlcclxuICAgICAgICAgICAgICAgIF0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VtcHR5IGxvY2F0aW9uIGJvZHknKTtcclxuICAgICAgICB9XHJcbiAgICApXHJcbiAgICAuc3Vic2NyaWJlKCBcclxuICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYG5ldyBwb3MuIGZvciB2ZWhpY2xlICR7cmVxLnBhcmFtcy5pZH0gYWRkZWQgdG8gcmVkaXNgKTtcclxuICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoMjA0KTtcclxuICAgICAgICB9LCBcclxuICAgICAgICBlcnIgPT4gbmV4dCh7bWVzc2FnZTogJ3ZlaGljbGUgbm90IHJlZ2lzdGVyZWQnLCBzdGFjazogZXJyLnN0YWNrfSlcclxuICAgIClcclxuXHJcbn0pXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdXRlcy9hZGRMb2NhdGlvbi50cyIsInZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG52YXIgbm9kZUV4dGVybmFscyA9IHJlcXVpcmUoJ3dlYnBhY2stbm9kZS1leHRlcm5hbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZW50cnk6ICcuL3NyYy9pbmRleC50cycsXHJcbiAgICBkZXZ0b29sOiAnaW5saW5lLXNvdXJjZS1tYXAnLFxyXG4gICAgb3V0cHV0OiB7XHJcbiAgICAgICAgcHVibGljUGF0aDogXCIvXCIsXHJcbiAgICAgICAgcGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2J1aWxkJyksXHJcbiAgICAgICAgZmlsZW5hbWU6ICdidW5kbGUuanMnXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLnRzJ10gLy9yZXNvbHZlIGFsbCB0aGUgbW9kdWxlcyBvdGhlciB0aGFuIGluZGV4LnRzXHJcbiAgICB9LFxyXG4gICAgbW9kdWxlOiB7XHJcbiAgICAgICAgcnVsZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAndHMtbG9hZGVyJyxcclxuICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC50cz8kL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHN0YXRzOiB7XHJcbiAgICAgICAgY29sb3JzOiB0cnVlLFxyXG4gICAgICAgIG1vZHVsZXM6IHRydWUsXHJcbiAgICAgICAgcmVhc29uczogdHJ1ZSxcclxuICAgICAgICBlcnJvckRldGFpbHM6IHRydWVcclxuICAgICAgfSxcclxuICAgIHRhcmdldDogJ25vZGUnLFxyXG4gICAgZXh0ZXJuYWxzOiBbbm9kZUV4dGVybmFscygpXSxcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd2VicGFjay5jb25maWcuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2stbm9kZS1leHRlcm5hbHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzXCJcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=