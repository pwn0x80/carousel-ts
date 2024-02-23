
import React, { useState, useRef } from 'react';
interface CarouselsProps {
  img: string[];
}

const Carousel: React.FC<CarouselsProps> = (props) => {
  const { img } = props;
  const [activeSlider, setActiveSlider] = useState<number>(0);
  const imageRefs = useRef<Array<HTMLImageElement | null>>(Array.from({ length: img?.length }, () => null));
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDotClick = (sliderNumber: number) => {
    if (containerRef.current) {
      var elem = document.getElementById("slider-" + sliderNumber);
      if (elem !== null) {
        const scrollPosition = elem.getBoundingClientRect().left - containerRef.current.getBoundingClientRect().left;
        containerRef.current.scrollLeft += scrollPosition;
      }
    }
  };

  const handleScroll = () => {
    let last: any;
    clearTimeout(last)
    last = setTimeout(() => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const sliderWidth = containerRef.current.clientWidth;
        const newActiveSlider = Math.round(scrollPosition / sliderWidth);
        setActiveSlider(newActiveSlider);
      }
    }, 200)
  };

  return (
    <>
      <div className="max-w-[57rem]  m-auto relative">
        <div
          style={{ boxShadow: '0px 0px 23px 0px rgba(0,0,0,0.51)' }}
          className="aspect-video no-scrollbar flex rounded-2xl overflow-x-auto scroll-smooth snap-mandatory snap-x"
          onScroll={handleScroll}
          ref={containerRef}
        >
          {img?.map((imgUrl: string, idx: number) => {
            return (
              <img
                key={idx}
                ref={(el) => (imageRefs.current[idx] = el)}
                id={"slider-" + idx}
                className={`flex-[1_0_100%] object-cover rounded-2xl brightness-50 snap-center`}
                src={imgUrl}
              />
            )
          })}
        </div>
        <div className="grid bottom-0 absolute right-0 left-0 grid-template-columns: 1fr 1fr 1fr items-center">
          <div className="flex col-start-2 bg-custom-color">
            {Array.from({ length: img.length }).map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`m-1 w-2 h-2 rounded-full ${activeSlider === index ? 'bg-blue-600' : 'bg-white'
                    }`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel;

