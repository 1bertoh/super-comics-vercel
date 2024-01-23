'use client'
// Carousel.js
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react';
// import { useState } from 'react'

/**
 * 
 * @param {{itens_list: Array, size: 'sm'|'md'|'lg', lazyLoad: 'ondemand'|'progressive', loadOnView: Boolean}} props 
 * @returns 
 */
export const SCarousel = (props) => {
    const { itens_list, size, id } = props;
    const lazyLoad = props.lazyLoad || "progressive";
    const loadOnView = props.loadOnView || false;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(loadOnView) {
            let meuElemento = document.getElementById("carousel-" + id);
    
            function handleScroll() {
                if (!isVisible && isInViewport(meuElemento)) {
                    setIsVisible(true);
                }
            }
    
            // Adiciona o ouvinte de evento de rolagem ao montar o componente
            window.addEventListener("scroll", handleScroll);
    
            // Remove o ouvinte de evento de rolagem ao desmontar o componente
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [id, isVisible]);

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const verifyIsVisible = () =>{
        if(loadOnView){
            return isVisible
        }
        return true
    }

    return (
        <div>
            {/* Adicione as classes de CSS que preferir para visível e oculto */}
            <div id={"carousel-" + id}>
                {/* Refrente a cada breakpoint */}
                {
                    verifyIsVisible() &&
                    <div className="sm-carousel">
                        <SmCarousel
                            lazyLoad={lazyLoad}
                            size={size}
                            itens_list={itens_list}
                        />
                    </div>

                }
                {
                    verifyIsVisible() &&
                    <div className="md-carousel">
                        <MdCarousel
                            size={size}
                            lazyLoad={lazyLoad}
                            itens_list={itens_list}
                        />
                    </div>
                }
                {
                    verifyIsVisible() &&
                    <div className="lg-carousel">
                        <LgCarousel
                            size={size}
                            lazyLoad={lazyLoad}
                            itens_list={itens_list}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

const SmCarousel = (props) => {
    const {itens_list, size, lazyLoad} = props
    let slidesToShow = () => {
        if (size === 'lg'){
            return  2.1
        } else if(size === 'md'){
            return  2.5
        } else {
            return 2.1
        }

    }

    const sliderSettings = {
        slidesToShow: slidesToShow(),
        swipeToSlide: true,
        infinite: false,
        arrows: false,
        zIndex: 500,
        // onInit: () => setisLoaded(true),
    };

    return (
        <>
        <Slider {...sliderSettings}>{itens_list}</Slider>
        </>
    )
}

const MdCarousel = (props) => {
    const { itens_list, size, lazyLoad } = props;
    let slidesToShow = () => {
        if (size === "lg") {
            return 2.5;
        } else if (size === "md") {
            return 3.2;
        } else {
            return 2.5;
        }
    }

    const sliderSettings = {
        slidesToShow: slidesToShow(),
        swipeToSlide: true,
        infinite: false,
        arrows: false,
        zIndex: 500,
        // onInit: () => console.log("loaded"),
    };

    return (
        <>

        <Slider {...sliderSettings}>{itens_list}</Slider>
        </>
    )
}

const LgCarousel = (props) => {
    const { itens_list, size, lazyLoad } = props;
    let slidesToShow = () => {
        if (size === "lg") {
            return 4.5;
        } else if (size === "md") {
            return 5.5;
        } else {
            return 3.5;
        }
    }

    const sliderSettings = {
        slidesToShow: slidesToShow(),
        swipeToSlide: true,
        infinite: false,
        arrows: false,
        zIndex: 500,
        // onInit: () => setisLoaded(true),
    };

    return (
        <Slider {...sliderSettings}>{itens_list}</Slider>
    )
}