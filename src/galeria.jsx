import React, { useState, useEffect } from 'react';
import './galeria.css'; // Estilo para o slideshow

function Slideshow2() {
  const [images, setImages] = useState([]); // Estado para armazenar as imagens
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para rastrear o slide atual

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://localhost:5000/buscaimoveis');
        if (response.ok) {
          const data = await response.json();
          // Filtrar apenas as URLs das imagens
          const imageUrls = data.map(imovel => imovel.imageUrl);
          setImages(imageUrls); // Atualizar o estado com as URLs das imagens
        } else {
          console.error('Erro ao buscar imagens:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    }

    fetchImages();
  }, []);

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  // Função para retroceder para o slide anterior
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow-container2">
      {images.length > 0 && (
        <>
          {/* Botões de navegação */}
          <a className="prev2" onClick={prevSlide}>&#10094;</a>
          <a className="next2" onClick={nextSlide}>&#10095;</a>
          {/* Imagens do slide */}
          <div className="slides2">
            {images.slice(currentSlide, currentSlide + 6).map((image, index) => (
              <div key={index} className={`slide2 ${index === 1 ? 'current' : ''}`}>
                <img src={image} alt={`Slide2 ${currentSlide + index + 1}`} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Slideshow2;
