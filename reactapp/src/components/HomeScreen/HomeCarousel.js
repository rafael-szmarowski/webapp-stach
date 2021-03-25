import React, { useState } from "react";
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

const items = [
    {
      src: "/picture1.jpg",
      altText: "MOMENT A DEUX",
      title: "MOMENT A DEUX",
      caption:
        "Un moment unique en couple, redécouvrez vous tout en découvrant une nouvelle coupe",
    },
    {
      src: "/picture2.jpg",
      altText: "APERO COIF",
      title: "APERO COIF",
      caption:
        "Pas le temps d'aller chez le coiffeur avant votrer soirée, pas besoin de choisir, commencez une before avec vos amis tout en vous faisant coiffer",
    },
    {
      src: "/picture3.jpg",
      altText: "PLAY HARD CUT HARD",
      title: "PLAY HARD CUT HARD",
      caption:
        "Jouez à vos jeux préférés et devenez le champion du salon de coiffure",
    },
    {
      src: "/picture4.jpg",
      altText: "BIEN ETRE",
      title: "BIEN ETRE",
      caption:
        "Si vous êtes un peu stressé à l'idée d'avoir une nouvelle coupe, alors détendez vous et profitez d'un massage",
    },
  ];
  

export default function HomeCarousel({ validationButton }) {
  
    //Carousel

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          className="d-block"
          captionText={
            <div className="homeScreenCaptionText">
              <h2>{item.title}</h2>
              <p>{item.caption}</p>
              <Button
                style={{ backgroundColor: "#4280AB" }}
                onClick={() => validationButton(item.title)}
              >
                Vivre cette expérience
              </Button>
            </div>
          }
        />
      </CarouselItem>
    );
  });

  return (
    <div style={{ backgroundColor: "#FFE082", marginBottom: 20 }}>
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {slides}
                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                  />
                  <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                  />
                </Carousel>
              </div>
  );
}
