import React, { useState, useRef } from 'react';
var Carousel = function (props) {
    var img = props.img;
    var _a = useState(0), activeSlider = _a[0], setActiveSlider = _a[1];
    var imageRefs = useRef(Array.from({ length: img === null || img === void 0 ? void 0 : img.length }, function () { return null; }));
    var containerRef = useRef(null);
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "max-w-[57rem]  m-auto relative" },
            React.createElement("div", { style: { boxShadow: '0px 0px 23px 0px rgba(0,0,0,0.51)' }, className: "aspect-video no-scrollbar flex rounded-2xl overflow-x-auto scroll-smooth snap-mandatory snap-x", onScroll: handleScroll, ref: containerRef }, img === null || img === void 0 ? void 0 : img.map(function (imgUrl, idx) {
                return (React.createElement("img", { key: idx, ref: function (el) { return (imageRefs.current[idx] = el); }, id: "slider-" + idx, className: "flex-[1_0_100%] object-cover rounded-2xl brightness-50 snap-center", src: imgUrl }));
            })),
            React.createElement("div", { className: "grid bottom-0 absolute right-0 left-0 grid-template-columns: 1fr 1fr 1fr items-center" },
                React.createElement("div", { className: "flex col-start-2 bg-custom-color" }, Array.from({ length: img.length }).map(function (_, index) {
                    return (React.createElement("button", { key: index, onClick: function () { return handleDotClick(index); }, className: "m-1 w-2 h-2 rounded-full ".concat(activeSlider === index ? 'bg-blue-600' : 'bg-white') }));
                }))))));
};
export default Carousel;
