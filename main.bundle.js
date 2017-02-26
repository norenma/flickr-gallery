webpackJsonp([1,4],{

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coordinate_model__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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
                var coords = new __WEBPACK_IMPORTED_MODULE_0__coordinate_model__["a" /* Coordinate */]();
                coords.latitude = position.coords.latitude;
                coords.longitude = position.coords.longitude;
                resolve(coords);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], LocationService);
    return LocationService;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/location.service.js.map

/***/ }),

/***/ 345:
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

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__location_location_service__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotosService; });






var FLICKR_URL = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].FLICKR_URL;
var FLICKR_API_KEY = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].FLICKR_API_KEY;
// Fallback position: Gothenburg city centre.
var gbgLocation = {
    'latitude': 57.708870,
    'longitude': 11.974560,
};
// Error strings
var locationError = 'Can not get your location, showing images from Gothenburg!';
var apiError = 'Can not reach the flickr service, try again later';
var PhotosService = (function () {
    function PhotosService(http, location) {
        this.http = http;
        this.location = location;
        this.errorSubject = new __WEBPACK_IMPORTED_MODULE_0_rxjs__["Subject"]();
        this.$error = this.errorSubject.asObservable();
    }
    PhotosService.prototype.getPhotos = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getLocation().then(function (coords) {
                _this.getPhotosAtLocation(coords).then(resolve);
            });
        });
    };
    PhotosService.prototype.getLocation = function () {
        var _this = this;
        return this.location.getCurrentLocation().then(function (res) {
            console.log("got location");
            return res;
        }, function (err) {
            console.log("error");
            _this.errorSubject.next(locationError);
            return gbgLocation;
        });
    };
    PhotosService.prototype.getPhotosAtLocation = function (coords) {
        console.log('#getPhotosAtLocation');
        var parameter_string = '?method=flickr.photos.search'
            + this.getQueryParameter('lat', coords.latitude)
            + this.getQueryParameter('lon', coords.longitude)
            + this.getQueryParameter('sort', 'interestingness-desc');
        return this.postToFlickr(parameter_string);
    };
    PhotosService.prototype.postToFlickr = function (parameter_string) {
        var _this = this;
        var url = FLICKR_URL + parameter_string;
        url = this.addQueryParameter(url, 'api_key', FLICKR_API_KEY);
        url = this.addQueryParameter(url, 'format', 'json');
        console.log("postToFlickr");
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Headers */]({ 'content-type': 'multipart/form-data' });
        var ops = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* RequestOptions */]({ headers: headers });
        if (window['XDomainRequest']) {
            var xdr = new XDomainRequest();
            xdr.open("get", "http://example.com/api/method");
            xdr.onprogress = function () {
                //Progress
                console.log("progg");
            };
            xdr.ontimeout = function () {
                //Timeout
            };
            xdr.onerror = function () {
                //Error Occured
                console.log("errrr");
            };
            xdr.onload = function () {
                //success(xdr.responseText);
                console.log((xdr.responseText));
            };
            setTimeout(function () {
                xdr.send();
            }, 0);
        }
        return this.http.post(url, {}, ops).toPromise().then(function (res) {
            console.log("res", res);
            var photos = {};
            var jsonFlickrApi = function (response) {
                if (response.stat === 'fail') {
                    console.log("state fail");
                    _this.errorSubject.next(apiError);
                }
                photos = response.photos;
            };
            var jsonResponse = res._body;
            eval("(" + jsonResponse + ")");
            return photos;
        }, function (err) {
            console.log("err", err);
            _this.errorSubject.next(apiError);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__location_location_service__["a" /* LocationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__location_location_service__["a" /* LocationService */]) === 'function' && _b) || Object])
    ], PhotosService);
    return PhotosService;
    var _a, _b;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/photos.service.js.map

/***/ }),

/***/ 347:
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

/***/ 413:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 413;


/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_helpers__ = __webpack_require__(966);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ts_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(347);





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/main.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(690),
            styles: [__webpack_require__(686)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/app.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__location_location_service__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__photos_photos_service__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__photo_gallery_photo_gallery_component__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__photo_detail_photo_detail_component__ = __webpack_require__(524);
/* unused harmony export NoXSRFStrategy */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });









var NoXSRFStrategy = (function () {
    function NoXSRFStrategy() {
    }
    NoXSRFStrategy.prototype.configureRequest = function (req) {
        // Remove `x-xsrf-token` from request headers
    };
    return NoXSRFStrategy;
}());
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__photo_gallery_photo_gallery_component__["a" /* PhotoGalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_8__photo_detail_photo_detail_component__["a" /* PhotoDetailComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_1__photos_photos_service__["a" /* PhotosService */], __WEBPACK_IMPORTED_MODULE_0__location_location_service__["a" /* LocationService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/app.module.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Coordinate; });
var Coordinate = (function () {
    function Coordinate() {
    }
    return Coordinate;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/coordinate.model.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__photos_photo_model__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__photos_photo_model__["a" /* Photo */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__photos_photo_model__["a" /* Photo */]) === 'function' && _a) || Object)
    ], PhotoDetailComponent.prototype, "photo", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["T" /* Output */])(), 
        __metadata('design:type', Object)
    ], PhotoDetailComponent.prototype, "close", void 0);
    PhotoDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["U" /* Component */])({
            selector: 'app-photo-detail',
            template: __webpack_require__(691),
            styles: [__webpack_require__(687)]
        }), 
        __metadata('design:paramtypes', [])
    ], PhotoDetailComponent);
    return PhotoDetailComponent;
    var _a;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/photo-detail.component.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__photos_photo_model__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__photos_photos_service__ = __webpack_require__(346);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoGalleryComponent; });



var PhotoGalleryComponent = (function () {
    function PhotoGalleryComponent(photosService) {
        var _this = this;
        this.photosService = photosService;
        this.photos = [];
        this.currentDetail = null;
        this.imagesLoaded = 20;
        this.loading = false;
        this.error = false;
        this.errorText = "";
        this.showError = function (error) {
            _this.errorText = error;
            _this.error = true;
        };
    }
    PhotoGalleryComponent.prototype.ngOnInit = function () {
        this.photosService.$error.subscribe(this.showError);
        this.getImages();
    };
    PhotoGalleryComponent.prototype.getImages = function () {
        var _this = this;
        this.showLoading();
        this.photosService.getPhotos().then(function (res) {
            _this.createPhotos(res);
            _this.hideLoading();
        });
    };
    PhotoGalleryComponent.prototype.createPhotos = function (data) {
        var _this = this;
        if (data) {
            data.photo.forEach(function (data) {
                var photo = new __WEBPACK_IMPORTED_MODULE_0__photos_photo_model__["a" /* Photo */]();
                photo.setUrls(data.farm, data.server, data.id, data.secret);
                _this.photos.push(photo);
            });
        }
    };
    PhotoGalleryComponent.prototype.showLoading = function () {
        this.loading = true;
    };
    PhotoGalleryComponent.prototype.hideLoading = function () {
        this.loading = false;
    };
    PhotoGalleryComponent.prototype.showDetail = function (photo) {
        this.currentDetail = photo;
    };
    PhotoGalleryComponent.prototype.closeDetail = function () {
        this.currentDetail = null;
    };
    // Detects when user has scrolled to the end of the page, template will load more images. 
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
            template: __webpack_require__(692),
            styles: [__webpack_require__(688)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__photos_photos_service__["a" /* PhotosService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__photos_photos_service__["a" /* PhotosService */]) === 'function' && _a) || Object])
    ], PhotoGalleryComponent);
    return PhotoGalleryComponent;
    var _a;
}());
//# sourceMappingURL=/Users/Markus/Projects/cygni-home-task copy/src/photo-gallery.component.js.map

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(121)();
// imports


// module
exports.push([module.i, "h1 {\n    text-align: center;\n    font-family: \"Brush Script MT\", cursive;\n    font-size: 40px;\n    font-style: normal;\n    font-variant: normal;\n    font-weight: 500;\n    line-height: 26.4px;\n    margin-top: 15vh;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(121)();
// imports


// module
exports.push([module.i, ".detail-view {\n    position: fixed;\n    width: 100%;\n    height: 100vh;\n    background-color: rgba(255, 255, 255, 0.7);\n}\n\n.detail-view img {\n    width: auto;\n    margin-top: 10vh;\n    height: 80vh;\n}\n\nbutton.close {\n    position: fixed;\n    top: 20px;\n    right: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(121)();
// imports


// module
exports.push([module.i, ".photo-item.loaded,\n.photo-item {\n    height: 240px;\n    margin-bottom: 20px;\n}\n\n.photo-gallery {\n    margin-top: 15vh;\n}\n\n.loading-background {\n    position: fixed;\n    top: 0;\n    width: 100%;\n    height: 100vh;\n    background-color: rgba(255, 255, 255, 0.9);\n}\n\n.loading-text {\n    margin: auto;\n    text-align: center;\n    margin-top: 50vh;\n    font-size: 30px;\n    font-family: \"Brush Script MT\", cursive;\n}\n\napp-photo-detail {\n    position: fixed;\n    top: 0;\n    left: 0;\n}\n\n.error-text {\n    text-align: center;\n    color: #bb3b39;\n    font-style: italic;\n    margin-bottom: 30px;\n    font-size: 16px;\n    border: 1px solid rgba(0, 0, 0, 0.3);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = "<h1>\n  Photos from your neighborhood\n</h1>\n\n<app-photo-gallery></app-photo-gallery>"

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = "<div class=\"detail-view\" (click)=\"onClose()\">\n<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <img class=\"center-block\" src=\"{{photo.URL_large}}\" alt=\"Loading image...\">\n</div>"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "<div class=\"container photo-gallery\">\n  <!--error-text-->\n  <p class=\"error-text\" *ngIf=\"error\"> {{errorText}}\n    <p>\n      <div class=\"row\">\n        <div *ngFor=\" let photo of photos; let i = index \">\n          <div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12 photo-item\" *ngIf=\"i < imagesLoaded\">\n            <img (click)=\"showDetail(photo)\" src=\"{{photo.URL_tumb}}\" class=\"center-block \" alt=\" Loading ... \">\n          </div>\n        </div>\n      </div>\n</div>\n\n<app-photo-detail [photo]=\"currentDetail\" (close)=\"closeDetail()\" *ngIf=\"currentDetail\"></app-photo-detail>\n\n<!--loading.. -->\n<div *ngIf='loading' class=\"loading-background\">\n  <p class=\"loading-text\"> Getting photos in your area... </p>\n</div>"

/***/ }),

/***/ 968:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(414);


/***/ })

},[968]);
//# sourceMappingURL=main.bundle.js.map