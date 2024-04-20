import React, { useState, useEffect } from 'react';
import './slideshow.css'; // Estilo para o slideshow

function Slideshow() {
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

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2500); // Mudança automática a cada 5 segundos

      return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }
  }, [currentSlide, images]); // Executa o efeito sempre que o slide atual ou as imagens mudarem

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  // Função para retroceder para o slide anterior
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow-container">
      {images.length > 0 && (
        <>
          {/* Botões de navegação */}
          <a className="prev" onClick={prevSlide}>&#10094;</a>
          <a className="next" onClick={nextSlide}>&#10095;</a>
          {/* Imagem do slide atual */}
          <div className="slide">
            <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
          </div>
        </>
      )}
    </div>
  );
}

export default Slideshow;
