import React, { useState, useEffect } from 'react';
import './slideshow.css'; // Estilo para o slideshow
import api from './api.js'; // Importe a instância do axios criada em api.js

function Slideshow() {
  const [images, setImages] = useState([]); // Estado para armazenar as imagens
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para rastrear o slide atual

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await api.get('/buscaimoveis'); // Utilize a instância do axios importada
        if (response.status === 200) { // Verifique o status da resposta
          const data = response.data; // A resposta já está no formato JSON
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
          <button className="prev" onClick={prevSlide}>&#10094;</button>
          <button className="next" onClick={nextSlide}>&#10095;</button>
          {/* Imagem do slide atual */}
          <div className="slide">
  <img src={'http://localhost:5000' + images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
</div>

        </>
      )}
    </div>
  );
}

export default Slideshow;
