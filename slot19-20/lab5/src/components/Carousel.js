import React, { useState, useEffect, useCallback } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Carousel = ({ images, autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { colors } = useTheme();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  return (
    <div className="position-relative" style={{ minHeight: '400px' }}>
      {/* Main Carousel */}
      <BootstrapCarousel
        activeIndex={currentIndex}
        onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
        indicators={false}
        controls={false}
        interval={null}
        className="h-100"
      >
        {images.map((image, index) => (
          <BootstrapCarousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              style={{ 
                height: '400px', 
                objectFit: 'cover',
                backgroundColor: colors.secondary
              }}
            />
            {image.caption && (
              <BootstrapCarousel.Caption>
                <h3>{image.caption.title}</h3>
                <p>{image.caption.description}</p>
              </BootstrapCarousel.Caption>
            )}
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>

      {/* Custom Navigation Arrows */}
      <button
        className="position-absolute top-50 start-0 translate-middle-y btn btn-outline-light border-0"
        onClick={prevSlide}
        style={{ 
          left: '10px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 10
        }}
      >
        <FaChevronLeft size={20} />
      </button>
      
      <button
        className="position-absolute top-50 end-0 translate-middle-y btn btn-outline-light border-0"
        onClick={nextSlide}
        style={{ 
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 10
        }}
      >
        <FaChevronRight size={20} />
      </button>

      {/* Custom Dots */}
      <div 
        className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
        style={{ zIndex: 10 }}
      >
        <div className="d-flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm border-0 ${
                index === currentIndex 
                  ? 'bg-light' 
                  : 'bg-secondary'
              }`}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                padding: 0
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel; 