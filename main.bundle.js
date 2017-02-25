webpackJsonp([1,4],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });

var LocationService = (function () {
    function LocationService() {
    }
    /**
     * The the user's current location.
     */
    LocationService.prototype.getCurrentLocation = function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve(position.coords);
            }, function (err) {
                console.log("Can't get users location", err);
                reject("Cant get users location");
            }, {
                maximumAge: 1000 * 60 * 1000,
                enableHighAccuracy: false
            });
        });
    };
    LocationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], LocationService);
    return LocationService;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/location.service.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Photo; });
var Photo = (function () {
    function Photo() {
    }
    Photo.prototype.setUrls = function (farm, server, id, secret) {
        this.URL_tumb = this.getUrl(farm, server, id, secret, 'm');
        this.URL_large = this.getUrl(farm, server, id, secret, 'z');
    };
    Photo.prototype.getUrl = function (farm, server, id, secret, size) {
        var url = 'https://farm' + farm + '.staticflickr.com/' +
            server + '/' + id + '_' + secret + '_' + size + '.jpg';
        return url;
    };
    return Photo;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/photo.model.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__location_service__ = __webpack_require__(302);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotosService; });





var FLICKR_URL = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].FLICKR_URL;
var FLICKR_API_KEY = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].FLICKR_API_KEY;
var PhotosService = (function () {
    function PhotosService(http, location) {
        this.http = http;
        this.location = location;
    }
    PhotosService.prototype.getPhotos = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getLocation().then(function (coords) {
                _this.getPhotosAtLocation(coords).then(resolve);
            });
        });
        //return this.getLocation().then(this.getPhotosAtLocation);
    };
    PhotosService.prototype.getLocation = function () {
        return this.location.getCurrentLocation();
    };
    PhotosService.prototype.getPhotosAtLocation = function (coords) {
        var parameter_string = '?method=flickr.photos.search'
            + this.getQueryParameter('lat', coords.latitude)
            + this.getQueryParameter('lon', coords.longitude)
            + this.getQueryParameter('sort', 'interestingness-desc');
        return this.postToFlickr(parameter_string).then(function (res) {
            console.log("getPhotosAtLocation", res);
            return res;
        });
    };
    PhotosService.prototype.postToFlickr = function (parameter_string) {
        var url = FLICKR_URL + parameter_string;
        url = this.addQueryParameter(url, 'api_key', FLICKR_API_KEY);
        url = this.addQueryParameter(url, 'format', 'json');
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'content-type': 'multipart/form-data' });
        var ops = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(url, {}, ops).toPromise().then(function (res) {
            var photos = {};
            var jsonFlickrApi = function (response) {
                console.log("Got response from Flickr-API with the following photos: %o", response.photos);
                photos = response.photos;
            };
            var jsonResponse = res._body;
            eval("(" + jsonResponse + ")");
            return photos;
        });
    };
    PhotosService.prototype.addQueryParameter = function (url, parameter_name, value) {
        return url + this.getQueryParameter(parameter_name, value);
    };
    PhotosService.prototype.getQueryParameter = function (parameter_name, value) {
        return '&' + parameter_name + '=' + value;
    };
    PhotosService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    PhotosService.prototype.jsonFlickrApi = function (response) {
        console.log("Got response from Flickr-API with the following photos: %o", response.photos);
        // Handle the response here. I.E update the DOM, trigger event handlers etc.
    };
    PhotosService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__location_service__["a" /* LocationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__location_service__["a" /* LocationService */]) === 'function' && _b) || Object])
    ], PhotosService);
    return PhotosService;
    var _a, _b;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/photos.service.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    FLICKR_URL: 'https://api.flickr.com/services/rest/',
    FLICKR_API_KEY: '2428c2ce8073f680a6048a32693384d9',
};
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/environment.js.map

/***/ }),

/***/ 349:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 349;


/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_helpers__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ts_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(305);





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/main.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(616),
            styles: [__webpack_require__(612)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/app.component.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_location_service__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_photos_service__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__photo_gallery_photo_gallery_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__photo_detail_photo_detail_component__ = __webpack_require__(459);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });









var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__photo_gallery_photo_gallery_component__["a" /* PhotoGalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_8__photo_detail_photo_detail_component__["a" /* PhotoDetailComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_1__shared_photos_service__["a" /* PhotosService */], __WEBPACK_IMPORTED_MODULE_0__shared_location_service__["a" /* LocationService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/app.module.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_photo_model__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoDetailComponent; });


var PhotoDetailComponent = (function () {
    function PhotoDetailComponent() {
        this.close = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* EventEmitter */]();
    }
    PhotoDetailComponent.prototype.ngOnInit = function () {
        console.log("init");
        console.log(this.photo);
    };
    PhotoDetailComponent.prototype.onClose = function () {
        this.close.emit();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["w" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_photo_model__["a" /* Photo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__shared_photo_model__["a" /* Photo */]) === 'function' && _a) || Object)
    ], PhotoDetailComponent.prototype, "photo", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["T" /* Output */])(), 
        __metadata('design:type', Object)
    ], PhotoDetailComponent.prototype, "close", void 0);
    PhotoDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["U" /* Component */])({
            selector: 'app-photo-detail',
            template: __webpack_require__(617),
            styles: [__webpack_require__(613)]
        }), 
        __metadata('design:paramtypes', [])
    ], PhotoDetailComponent);
    return PhotoDetailComponent;
    var _a;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/photo-detail.component.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_photo_model__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_photos_service__ = __webpack_require__(304);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoGalleryComponent; });



var PhotoGalleryComponent = (function () {
    function PhotoGalleryComponent(photosService) {
        this.photosService = photosService;
        this.photos = [];
        this.currentDetail = null;
        this.imagesLoaded = 20;
    }
    PhotoGalleryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.photosService.getPhotos().then(function (res) {
            res.photo.forEach(function (data) {
                var photo = new __WEBPACK_IMPORTED_MODULE_0__shared_photo_model__["a" /* Photo */]();
                photo.setUrls(data.farm, data.server, data.id, data.secret);
                _this.photos.push(photo);
            });
        });
    };
    PhotoGalleryComponent.prototype.showDetail = function (photo) {
        this.currentDetail = photo;
    };
    PhotoGalleryComponent.prototype.closeDetail = function () {
        this.currentDetail = null;
    };
    PhotoGalleryComponent.prototype.onScroll = function (event) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // you're at the bottom of the page
            this.imagesLoaded += 20;
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["V" /* HostListener */])('window:scroll', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], PhotoGalleryComponent.prototype, "onScroll", null);
    PhotoGalleryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["U" /* Component */])({
            selector: 'app-photo-gallery',
            template: __webpack_require__(618),
            styles: [__webpack_require__(614)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_photos_service__["a" /* PhotosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_photos_service__["a" /* PhotosService */]) === 'function' && _a) || Object])
    ], PhotoGalleryComponent);
    return PhotoGalleryComponent;
    var _a;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/photo-gallery.component.js.map

/***/ }),

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(100)();
// imports


// module
exports.push([module.i, "h1 {\n    text-align: center;\n    font-family: \"Brush Script MT\", cursive;\n    font-size: 40px;\n    font-style: normal;\n    font-variant: normal;\n    font-weight: 500;\n    line-height: 26.4px;\n    margin-top: 15vh;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(100)();
// imports


// module
exports.push([module.i, ".detail-view {\n    position: fixed;\n    width: 100%;\n    height: 100vh;\n    background-color: rgba(255, 255, 255, 0.7);\n}\n\n.detail-view img {\n    width: auto;\n    margin-top: 10vh;\n    height: 80vh;\n}\n\nbutton.close {\n    position: fixed;\n    top: 20px;\n    right: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(100)();
// imports


// module
exports.push([module.i, ".photo-item.loaded, .photo-item {\n    height: 240px;\n    margin-bottom: 20px;\n}\n\n\n.photo-gallery {\n    margin-top: 15vh;\n}\n\n.loading:before {\n    transform: translate3d(0, 0, 0);\n    -ms-transform: translate3d(0, 0, 0);\n    -moz-transform: translate3d(0, 0, 0);\n    -webkit-transform: translate3d(0, 0, 0);\n    -o-transform: translate3d(0, 0, 0);\n    -webkit-transition: opacity 0.5s ease-out;\n    transition: opacity 0.5s ease-out;\n    -webkit-animation: rotating 1s linear infinite;\n    animation: rotating 1s linear infinite;\n    opacity: 1;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    position: absolute;\n    margin: auto;\n    color: rgba(0, 0, 0, 0.3);\n    content: \"\";\n    color: #fff;\n    background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KICAgdmlld0JveD0iMCAwIDI5MCAyOTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5MCAyOTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE0NSwyNDEuNmMtNTMuMywwLTk2LjYtNDMuMi05Ni42LTk2LjZjMC01My4zLDQzLjItOTYuNiw5Ni42LTk2LjZjNTMuMywwLDk2LjYsNDMuMiw5Ni42LDk2LjYNCiAgYzAsMjYuNy0xMC44LDUwLjktMjguMyw2OC4zbDcuNiw3LjZjMTkuNC0xOS40LDMxLjUtNDYuMywzMS41LTc1LjljMC01OS4zLTQ4LTEwNy4zLTEwNy4zLTEwNy4zUzM3LjcsODUuNywzNy43LDE0NQ0KICBjMCw1OS4zLDQ4LDEwNy4zLDEwNy4zLDEwNy4zVjI0MS42eiIvPg0KPC9zdmc+DQo=\");\n    background-size: 50px 50px;\n    height: 50px;\n    width: 50px;\n    background-repeaomt: no-repeat;\n}\n\napp-photo-detail {\n    position: fixed;\n    top: 0;\n    left: 0;\n}\n\n@keyframes rotating {\n    from {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg);\n    }\n}\n\n@-webkit-keyframes rotating {\n    from {\n        -webkit-transform: rotate(0deg);\n    }\n    to {\n        -webkit-transform: rotate(360deg);\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 616:
/***/ (function(module, exports) {

module.exports = "<h1>\n  Photos from your neighborhood\n</h1>\n\n<app-photo-gallery></app-photo-gallery>"

/***/ }),

/***/ 617:
/***/ (function(module, exports) {

module.exports = "<div class=\"detail-view\" (click)=\"onClose()\">\n<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <img class=\"center-block\" src=\"{{photo.URL_large}}\" alt=\"\">\n</div>"

/***/ }),

/***/ 618:
/***/ (function(module, exports) {

module.exports = "<div class=\"container photo-gallery\">\n  <div class=\"row\">\n    <div *ngFor=\" let photo of photos; let i = index \">\n      <div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12 photo-item\" *ngIf=\"i < imagesLoaded\">\n        <img (click)=\"showDetail(photo)\" src=\"{{photo.URL_tumb}}\" class=\"center-block \" alt=\" \">\n      </div>\n    </div>\n  </div>\n</div>\n\n<app-photo-detail [photo]=\"currentDetail\" (close)=\"closeDetail()\" *ngIf=\"currentDetail\"></app-photo-detail>"

/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(350);


/***/ })

},[632]);
//# sourceMappingURL=main.bundle.js.map