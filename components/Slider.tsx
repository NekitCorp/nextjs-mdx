import Link from "next/link";
import React from "react";
import styled from "styled-components";
import SwiperCore, { Autoplay, EffectCube, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination, Autoplay]);

const StyledSlideContent = styled.a`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 0.8) 100%
        );
        transition: background-color 0.5s ease;
    }

    &:hover {
        &::after {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
`;

const StyledImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const StyledTitleContainer = styled.div`
    z-index: 1;
    color: #fff;
    text-align: center;
    max-width: 700px;
    padding: 0 16px;

    & h2 {
        font-size: 3rem;
        margin: 36px 0;
    }

    & p {
        font-size: 1rem;
    }

    @media screen and (min-width: 900px) {
        & h2 {
            font-size: 4rem;
        }
    }
`;

type ISlide = {
    href: string;
    src: string;
    alt: string;
    title: string;
    description: string;
};

type ISliderProps = {
    className: string;
    slides: ISlide[];
};

const Slider: React.FC<ISliderProps> = ({ className, slides }) => {
    return (
        <Swiper
            className={className}
            effect={"cube"}
            grabCursor={true}
            cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            }}
            pagination={true}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <Link href={slide.href} passHref>
                        <StyledSlideContent>
                            <StyledImage src={slide.src} alt={slide.alt} />
                            <StyledTitleContainer>
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                            </StyledTitleContainer>
                        </StyledSlideContent>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const StyledSlider = styled(Slider)`
    width: 100%;
    height: 100vh;

    .swiper-slide {
        background-color: #eee;
    }
`;

export default StyledSlider;
