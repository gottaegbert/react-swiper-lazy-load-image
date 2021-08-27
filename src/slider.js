import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import SlideItem from "./slideItem";
import { Pagination, Navigation, Lazy } from "swiper/dist/js/swiper.esm";

const images = [
  [
    {
      src: "https://picsum.photos/320/240?v1"
    },
    {
      src: "https://picsum.photos/320/240?v2"
    },
    {
      src: "https://picsum.photos/320/240?v3"
    },
    {
      src: "https://picsum.photos/320/240?v4"
    }
  ],
  [
    {
      src: "https://picsum.photos/320/240?v5"
    },
    {
      src: "https://picsum.photos/320/240?v6"
    }
  ],
  [
    {
      src: "https://picsum.photos/320/240?v7"
    }
  ]
];

const ManipulatingSwiper = () => {
  // Swiper instance
  const [swiper, updateSwiper] = useState(null);
  // Slides current index
  const [currentIndex, updateCurrentIndex] = useState(0);
  // Define default image set
  const [imageSet, updateImageSet] = useState(0);
  // Params definition
  let params = {
    modules: [Pagination, Navigation, Lazy],
    preloadImages: false,
    lazy: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: false,
    spaceBetween: 30,
    getSwiper: updateSwiper // Get swiper instance callback
  };

  // Add Pagination and Navigation in case there's only 1 image.
  // @note This approach isn't working, neither `shouldSwiperUpdate` nor `rebuildOnUpdate` are invoked.
  if (false && images[imageSet].length > 1) {
    params = {
      ...params,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    };
  }

  // Add eventlisteners for swiper after initializing
  useEffect(
    () => {
      if (swiper !== null) {
        swiper.on("slideChange", () => updateCurrentIndex(swiper.realIndex));
        swiper.on("slideChangeTransitionStart", () =>
          updateCurrentIndex(swiper.realIndex)
        );
      }
    },
    [swiper]
  );

  // Update swiper after image set changes
  useEffect(
    () => {
      if (swiper !== null) {
        swiper.update();
        swiper.slideTo(0);

        // We should hide pagination in case there's less than 2 images.
        const shouldPaginationHide = images[imageSet].length < 2;
        const isPaginationHidden = swiper.pagination.$el.hasClass(
          swiper.params.pagination.hiddenClass
        );

        console.log(swiper);

        // Trigger emit event in case there are some extra callbacks.
        if (shouldPaginationHide && !isPaginationHidden) {
          swiper.emit("paginationHide", swiper);
        }

        if (!shouldPaginationHide && isPaginationHidden) {
          swiper.emit("paginationShow", swiper);
        }

        // Toggle pagination if it's needed
        if (shouldPaginationHide !== isPaginationHidden) {
          swiper.pagination.$el.toggleClass(
            swiper.params.pagination.hiddenClass
          );
        }

        swiper.lazy.load();
      }
    },
    [imageSet]
  );

  return (
    <div>
      <Swiper {...params}>
        {images[imageSet].map(
          (image, idx) =>
            console.log(`Showing image set ${imageSet}`) || (
              <SlideItem key={`slide_${idx}`}>
                <img
                  // @note w/o unique key the image won't be updated when the image set updates.
                  key={image.src}
                  className="swiper-lazy"
                  data-src={image.src}
                />
              </SlideItem>
            )
        )}
      </Swiper>
      <h3 className="subtitle">
        Current slide index is <strong>{currentIndex}</strong>
      </h3>
      <div className="buttons buttons-list">
        <button className="button is-primary" onClick={() => updateImageSet(0)}>
          Show set 1 (4 total)
        </button>
        <button className="button is-primary" onClick={() => updateImageSet(1)}>
          Show set 2 (2 total)
        </button>
        <button className="button is-primary" onClick={() => updateImageSet(2)}>
          Show a single image
        </button>
      </div>
    </div>
  );
};

export default ManipulatingSwiper;
