"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Carousel = function (props) {
    var img = props.img;
    var _a = (0, react_1.useState)(0), activeSlider = _a[0], setActiveSlider = _a[1];
    var imageRefs = (0, react_1.useRef)(Array.from({ length: img === null || img === void 0 ? void 0 : img.length }, function () { return null; }));
    var containerRef = (0, react_1.useRef)(null);
    var handleDotClick = function (sliderNumber) {
        if (containerRef.current) {
            var elem = document.getElementById("slider-" + sliderNumber);
            if (elem !== null) {
                var scrollPosition = elem.getBoundingClientRect().left - containerRef.current.getBoundingClientRect().left;
                containerRef.current.scrollLeft += scrollPosition;
            }
        }
    };
    var handleScroll = function () {
        var last;
        clearTimeout(last);
        last = setTimeout(function () {
            if (containerRef.current) {
                var scrollPosition = containerRef.current.scrollLeft;
                var sliderWidth = containerRef.current.clientWidth;
                var newActiveSlider = Math.round(scrollPosition / sliderWidth);
                setActiveSlider(newActiveSlider);
            }
        }, 200);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "max-w-[57rem]  m-auto relative" },
            react_1.default.createElement("div", { style: { boxShadow: '0px 0px 23px 0px rgba(0,0,0,0.51)' }, className: "aspect-video no-scrollbar flex rounded-2xl overflow-x-auto scroll-smooth snap-mandatory snap-x", onScroll: handleScroll, ref: containerRef }, img === null || img === void 0 ? void 0 : img.map(function (imgUrl, idx) {
                return (react_1.default.createElement("img", { key: idx, ref: function (el) { return (imageRefs.current[idx] = el); }, id: "slider-" + idx, className: "flex-[1_0_100%] object-cover rounded-2xl brightness-50 snap-center", src: imgUrl }));
            })),
            react_1.default.createElement("div", { className: "grid bottom-0 absolute right-0 left-0 grid-template-columns: 1fr 1fr 1fr items-center" },
                react_1.default.createElement("div", { className: "flex col-start-2 bg-custom-color" }, Array.from({ length: img.length }).map(function (_, index) {
                    return (react_1.default.createElement("button", { key: index, onClick: function () { return handleDotClick(index); }, className: "m-1 w-2 h-2 rounded-full ".concat(activeSlider === index ? 'bg-blue-600' : 'bg-white') }));
                }))))));
};
exports.default = Carousel;
