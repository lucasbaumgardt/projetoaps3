import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './styles.css';
import fundo from '../../img/FundoSite.png';
import fundo2 from '../../img/FundoSite2.png';

const Slider = () => {

    const slides = [{id: '1', image: fundo},
                    {id: '2', image: fundo2}
    ];

    return (
        <div className='container_slides'>
            <Swiper
            slidesPerView={1}
            pagination={{clickable: true}}
            navigation
            className='swiper-container'
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <img src={slide.image} alt='Slider' className='slide-item'></img>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    
    )
}

export default Slider;