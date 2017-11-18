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
server.listen(process.env.PORT || config_1.config.server.PORT, console.log.bind(console, "server listening on port " + (process.env.PORT || config_1.config.server.PORT)));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGJmMDBjNjAwMzI5NTk3MWMzNWMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzL3JlZGlzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy8uL3NyYy9lbnYudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZyBeXFwuXFwvLipcXC5qc29uJCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2RldmVsb3BtZW50Lmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9wcm9kdWN0aW9uLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL21vbmdvLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvdmVoaWNsZXNSZWdpc3RyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UvTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkaXNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2FkZExvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3dlYnBhY2suY29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUMsRUFBQztZQUM1QyxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDdEIsR0FBRyxDQUFDLElBQUk7ZUFDVixDQUFDLENBQUM7UUFDUixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FDSjtTQUNBLFNBQVMsQ0FDTixjQUFJO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBd0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLG9CQUFpQixDQUFDLENBQUM7UUFDcEUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDLEVBQ0QsYUFBRyxJQUFJLFdBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQTNELENBQTJELENBQ3JFO0FBRUwsQ0FBQyxDQUFDO0FBR0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7QUNqQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDOUJBLGlDOzs7Ozs7QUNBQSxtRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGJmMDBjNjAwMzI5NTk3MWMzNWMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7QVBQX0VOVn0gZnJvbSAnLi9lbnYnO1xuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoYC4vY29uZmlnLyR7QVBQX0VOVn0uanNvbmApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25maWcudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1vbmdvb3NlXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgcmVkaXMgZnJvbSAncmVkaXMnO1xuaW1wb3J0IElMb2NhdGlvbiBmcm9tICcuLi9tb2RlbC9JTG9jYXRpb24nO1xuaW1wb3J0IHtjb25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5jb25zdCBjbGllbnQgPSByZWRpcy5jcmVhdGVDbGllbnQocHJvY2Vzcy5lbnYuUkVESVNfVVJMIHx8IGNvbmZpZy5yZWRpcy5ob3N0KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkaXMge1xuICAgIHN0YXRpYyBnZXRBbGwoKSA6T2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgICAgY2xpZW50LmtleXMoJyonLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBnZXQoaWQ6IGFueSkgOk9ic2VydmFibGU8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgIGNsaWVudC5nZXQoaWQsIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXNwKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgc3RhdGljIHNldChpZDogYW55LCBsb2NhdGlvbnM6IHN0cmluZykgOk9ic2VydmFibGU8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgIGNsaWVudC5zZXQoaWQsIGxvY2F0aW9ucywgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlKGlkOiBhbnkpe1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgICAgY2xpZW50LmRlbChpZCwgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3ApO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlQWxsKCl7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICAgICAgICBjbGllbnQuZmx1c2hkYigoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzcCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsaXRpZXMvcmVkaXMudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicnhqc1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBTZXJ2ZXIgZnJvbSAnLi9zZXJ2ZXInO1xuaW1wb3J0IHtjb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBNb25nbyBmcm9tICcuL21vbmdvJztcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5sZXQgc2VydmVyID0gU2VydmVyLmdldEluc3RhbmNlKCk7XG5zZXJ2ZXIudXNlKCcvdmVoaWNsZXMnLCByZXF1aXJlKCcuL3JvdXRlcy92ZWhpY2xlc1JlZ2lzdHJhdGlvbicpKTtcbnNlcnZlci51c2UoJy92ZWhpY2xlcycsIHJlcXVpcmUoJy4vcm91dGVzL2FkZExvY2F0aW9uJykpO1xuXG5Nb25nby5jb25uZWN0KCk7XG5cbi8qZ2VuZXJpYyBlcnJvciBoYW5kbGVyICovXG5zZXJ2ZXIudXNlKChlcnI6IEVycm9yLCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgIHJlcy5qc29uKHtcbiAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgJ2ludGVybmFsIHNlcnZlciBlcnJvcicsXG4gICAgICAgIHN0YWNrOiBlcnIuc3RhY2ssXG4gICAgICAgIHN0YXR1c0NvZGU6IDUwMFxuICAgIH0pXG59KVxuc2VydmVyLmxpc3Rlbihwcm9jZXNzLmVudi5QT1JUIHx8IGNvbmZpZy5zZXJ2ZXIuUE9SVCwgXG4gICAgY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAgYHNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCAke3Byb2Nlc3MuZW52LlBPUlQgfHwgY29uZmlnLnNlcnZlci5QT1JUfWApKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciB7XG4gICAgc3RhdGljIGluc3RhbmNlOiBTZXJ2ZXI7XG4gICAgc3RhdGljIGFwcDogZXhwcmVzcy5FeHByZXNzO1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBzZXJ2ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCl7XG4gICAgICAgIGlmKCFTZXJ2ZXIuaW5zdGFuY2Upe1xuICAgICAgICAgICAgU2VydmVyLmluc3RhbmNlID0gbmV3IFNlcnZlcigpO1xuICAgICAgICAgICAgU2VydmVyLmFwcCA9IGV4cHJlc3MoKTtcbiAgICAgICAgICAgIFNlcnZlci5hcHAudXNlKG1vcmdhbignZGV2JykpO1xuICAgICAgICAgICAgU2VydmVyLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgICAgICAgICAgU2VydmVyLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogZmFsc2V9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNlcnZlci5hcHA7XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1vcmdhblwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYm9keS1wYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY29uc3QgQVBQX0VOViA9IHByb2Nlc3MuZW52LkFQUF9FTlYgfHwgJ2RldmVsb3BtZW50JztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW52LnRzIiwidmFyIG1hcCA9IHtcblx0XCIuL2RldmVsb3BtZW50Lmpzb25cIjogMTIsXG5cdFwiLi9wcm9kdWN0aW9uLmpzb25cIjogMTNcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxMTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb25maWcgXlxcLlxcLy4qXFwuanNvbiRcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1wic2VydmVyXCI6e1wiUE9SVFwiOjkwMDJ9LFwiZGJcIjp7XCJob3N0XCI6XCJtb25nb2RiOi8vaGVyb2t1X2hzMDUzMG5xOnU0a2RtdjdnZThhbmg3MDB1dmV0ZHJoaTYzQGRzMTExNDc2Lm1sYWIuY29tOjExNDc2L2hlcm9rdV9oczA1MzBucVwifSxcInJlZGlzXCI6e1wiaG9zdFwiOlwicmVkaXM6Ly9oOnAwMmNkMWY2YTcxZDQzNzkwYWM4MjUxMjAzNTRhY2U1OTE2ZTU4MzI1N2E3OGM0ODQ3ZWY0NTlhNGJlYjBjNGIwQGVjMi0zNC0yMzYtMTE1LTI1MS5jb21wdXRlLTEuYW1hem9uYXdzLmNvbToxODMyOVwifX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb25maWcvZGV2ZWxvcG1lbnQuanNvblxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJzZXJ2ZXJcIjp7XCJQT1JUXCI6OTAwMn0sXCJkYlwiOntcImhvc3RcIjpcIm1vbmdvZGI6Ly9oZXJva3VfaHMwNTMwbnE6dTRrZG12N2dlOGFuaDcwMHV2ZXRkcmhpNjNAZHMxMTE0NzYubWxhYi5jb206MTE0NzYvaGVyb2t1X2hzMDUzMG5xXCJ9LFwicmVkaXNcIjp7XCJob3N0XCI6XCJyZWRpczovL2g6cDAyY2QxZjZhNzFkNDM3OTBhYzgyNTEyMDM1NGFjZTU5MTZlNTgzMjU3YTc4YzQ4NDdlZjQ1OWE0YmViMGM0YjBAZWMyLTM0LTIzNi0xMTUtMjUxLmNvbXB1dGUtMS5hbWF6b25hd3MuY29tOjE4MzI5XCJ9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbmZpZy9wcm9kdWN0aW9uLmpzb25cbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmdvIHtcbiAgICBzdGF0aWMgZGI6IG1vbmdvb3NlLkNvbm5lY3Rpb247XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cblxuICAgIHN0YXRpYyBjb25uZWN0KCl7XG4gICAgICAgIG1vbmdvb3NlLmNvbm5lY3QoY29uZmlnLmRiLmhvc3QsIHt1c2VNb25nb0NsaWVudDogdHJ1ZX0pO1xuICAgICAgICBNb25nby5kYiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247XG4gICAgICAgIE1vbmdvLmRiLm9uKCdlcnJvcicsIGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlLCAnY29ubmVjdGlvbiBlcnJvcicpKTtcbiAgICAgICAgTW9uZ28uZGIub24oJ29wZW4nLCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdjb25uZWN0ZWQgdG8gbW9uZ28gZGInKSk7XG4gICAgICAgIHJldHVybiBNb25nby5kYjtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vbmdvLnRzIiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJy4uL3N0b3JhZ2UvTG9jYXRpb24nO1xuaW1wb3J0IFJlZGlzIGZyb20gJy4uL3V0aWxpdGllcy9yZWRpcyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbi8vcmVnaXN0cmF0aW9uXG5yb3V0ZXIucG9zdCgnLycsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgIGlmKCFyZXEuYm9keS5pZCl7XG4gICAgICAgIHJldHVybiBuZXh0KG5ldyBFcnJvcignY2Fubm8gcmVnaXN0ZXIgYW4gdW5kZWZpbmVkIGlkJykpO1xuICAgIH1cbiAgICBSZWRpcy5zZXQocmVxLmJvZHkuaWQsIEpTT04uc3RyaW5naWZ5KFtdKSlcbiAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzcDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgdmVoaWNsZSAke3JlcS5ib2R5LmlkfSByZWdpc3RlcmVkYCk7XG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4gbmV4dChlcnIpXG4gICAgKVxufSlcblxuLy9kZXJlZ2lzdHJhdGlvblxucm91dGVyLmRlbGV0ZSgnLzppZCcsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgIC8qUmVkaXMuZGVsZXRlQWxsKClcbiAgICAuc3Vic2NyaWJlKFxuICAgICAgICAocmVzcCkgPT4ge31cbiAgICApOyovXG4gICAgUmVkaXMuZ2V0KHJlcS5wYXJhbXMuaWQpXG4gICAgLnN1YnNjcmliZShcbiAgICAgICAgbWFya2VycyA9PiB7XG4gICAgICAgICAgICBpZighbWFya2Vycyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDIwNCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy91cGRhdGUgZGJcbiAgICAgICAgICAgIExvY2F0aW9uLmZpbmRPbmUoe3VpZDogcmVxLnBhcmFtcy5pZH0pXG4gICAgICAgICAgICAudGhlbigobG9jYXRpb246IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGxvY2F0aW9uICYmIGxvY2F0aW9uLnVpZCl7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLm1hcmtlcnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5sb2NhdGlvbi5tYXJrZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IHJlcS5wYXJhbXMuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJzOiBtYXJrZXJzID8gSlNPTi5wYXJzZShtYXJrZXJzKSA6IFtdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIExvY2F0aW9uLmZpbmRPbmVBbmRVcGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICB1aWQ6IHJlcS5wYXJhbXMuaWRcbiAgICAgICAgICAgICAgICB9LCB7JHNldDogbG9jYXRpb259LCB7bmV3OiB0cnVlLCB1cHNlcnQ6IHRydWV9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwID0+IHtcbiAgICAgICAgICAgICAgICBSZWRpcy5kZWxldGUocmVxLnBhcmFtcy5pZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICByZXNwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB2ZWhpY2xlICR7cmVxLnBhcmFtcy5pZH0gY2FuY2VsbGVkIGZyb20gcmVkaXNgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKDIwNCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVyciA9PiBuZXh0KGVycilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIClcblxufSlcblxuLyoqXG4gKiBnZXQgYWxsIHZlaGljbGVzIG9uIGRiXG4gKi9cbnJvdXRlci5nZXQoJy9hcmNoaXZlJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgTG9jYXRpb24uZmluZCh7fSlcbiAgICAudGhlbih2ZWhpY2xlcyA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHZlaGljbGVzKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4gbmV4dChlcnIpKTtcbn0pXG5cblxuLyoqXG4gKiBnZXQgYWxsIGN1cnJlbnQgYWN0aXZlIHZlaGljbGVzIHBvc2l0aW9ucyAob24gcmVkaXMpXG4gKi9cbnJvdXRlci5nZXQoJy8nLCAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pID0+IHtcbiAgICBSZWRpcy5nZXRBbGwoKVxuICAgIC5mbGF0TWFwKChrZXlzKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWxsVmFsdWVzJCA9IGtleXMubWFwKChrZXk6IGFueSkgPT4gUmVkaXMuZ2V0KGtleSkuc3dpdGNoTWFwKG1hcmtlcnMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXkgJiYga2V5ICE9PSAndW5kZWZpbmVkJyBcbiAgICAgICAgICAgICAgICAgICAgPyBPYnNlcnZhYmxlLm9mKHt1aWQ6IGtleSwgbG9jYXRpb25zOiBtYXJrZXJzfSkgXG4gICAgICAgICAgICAgICAgICAgIDogT2JzZXJ2YWJsZS5vZih7fSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mb3JrSm9pbiguLi5hbGxWYWx1ZXMkKTtcbiAgICAgICAgfVxuICAgIClcbiAgICAuc3Vic2NyaWJlKFxuICAgICAgICBhcnJheSA9PiB7XG4gICAgICAgICAgICByZXMuanNvbihhcnJheSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH1cbiAgICApXG59KVxuXG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3V0ZXMvdmVoaWNsZXNSZWdpc3RyYXRpb24udHMiLCJpbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmNvbnN0IHNpbmdsZUxvY2F0aW9uU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgbGF0OiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGxuZzoge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBhdDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxufSlcblxuXG5jb25zdCBMb2NhdGlvblNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xuICAgIHVpZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB1bmlxdWU6IHRydWVcbiAgICB9LFxuICAgIG1hcmtlcnM6IHtcbiAgICAgICAgdHlwZTogW3NpbmdsZUxvY2F0aW9uU2NoZW1hXSxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGRlZmF1bHQ6IFtdXG4gICAgfVxufSlcbmV4cG9ydCBjb25zdCBMb2NhdGlvbiA9IG1vbmdvb3NlLm1vZGVsKCdMb2NhdGlvbicsIExvY2F0aW9uU2NoZW1hKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yYWdlL0xvY2F0aW9uLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkaXNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWRpc1wiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi4vc3RvcmFnZS9Mb2NhdGlvbic7XG5pbXBvcnQgSUxvY2F0aW9uIGZyb20gJy4uL21vZGVsL0lMb2NhdGlvbic7XG5pbXBvcnQgUmVkaXMgZnJvbSAnLi4vdXRpbGl0aWVzL3JlZGlzJztcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KCcvOmlkL2xvY2F0aW9ucycsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgIFJlZGlzLmdldChyZXEucGFyYW1zLmlkKVxuICAgIC5mbGF0TWFwKFxuICAgICAgICBtYXJrZXJzID0+IHtcbiAgICAgICAgICAgIGlmKCFtYXJrZXJzKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZlaGljbGUgbm90IHJlZ2lzdGVyZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHJlcS5ib2R5LmxhdCAmJiByZXEuYm9keS5sbmcgJiYgcmVxLmJvZHkuYXQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWRpcy5zZXQocmVxLnBhcmFtcy5pZCwgSlNPTi5zdHJpbmdpZnkoW1xuICAgICAgICAgICAgICAgICAgICAuLi5KU09OLnBhcnNlKG1hcmtlcnMpLFxuICAgICAgICAgICAgICAgICAgICByZXEuYm9keVxuICAgICAgICAgICAgICAgIF0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZW1wdHkgbG9jYXRpb24gYm9keScpO1xuICAgICAgICB9XG4gICAgKVxuICAgIC5zdWJzY3JpYmUoIFxuICAgICAgICByZXNwID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBuZXcgcG9zLiBmb3IgdmVoaWNsZSAke3JlcS5wYXJhbXMuaWR9IGFkZGVkIHRvIHJlZGlzYCk7XG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xuICAgICAgICB9LCBcbiAgICAgICAgZXJyID0+IG5leHQoe21lc3NhZ2U6ICd2ZWhpY2xlIG5vdCByZWdpc3RlcmVkJywgc3RhY2s6IGVyci5zdGFja30pXG4gICAgKVxuXG59KVxuXG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3V0ZXMvYWRkTG9jYXRpb24udHMiLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbnZhciBub2RlRXh0ZXJuYWxzID0gcmVxdWlyZSgnd2VicGFjay1ub2RlLWV4dGVybmFscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBlbnRyeTogJy4vc3JjL2luZGV4LnRzJyxcbiAgICBkZXZ0b29sOiAnaW5saW5lLXNvdXJjZS1tYXAnLFxuICAgIG91dHB1dDoge1xuICAgICAgICBwdWJsaWNQYXRoOiBcIi9cIixcbiAgICAgICAgcGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2J1aWxkJyksXG4gICAgICAgIGZpbGVuYW1lOiAnYnVuZGxlLmpzJ1xuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBleHRlbnNpb25zOiBbJy50cyddIC8vcmVzb2x2ZSBhbGwgdGhlIG1vZHVsZXMgb3RoZXIgdGhhbiBpbmRleC50c1xuICAgIH0sXG4gICAgbW9kdWxlOiB7XG4gICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbG9hZGVyOiAndHMtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwudHM/JC9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAgc3RhdHM6IHtcbiAgICAgICAgY29sb3JzOiB0cnVlLFxuICAgICAgICBtb2R1bGVzOiB0cnVlLFxuICAgICAgICByZWFzb25zOiB0cnVlLFxuICAgICAgICBlcnJvckRldGFpbHM6IHRydWVcbiAgICAgIH0sXG4gICAgdGFyZ2V0OiAnbm9kZScsXG4gICAgZXh0ZXJuYWxzOiBbbm9kZUV4dGVybmFscygpXSxcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3dlYnBhY2suY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLW5vZGUtZXh0ZXJuYWxzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2VicGFjay1ub2RlLWV4dGVybmFsc1wiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9