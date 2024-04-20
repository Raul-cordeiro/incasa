import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pageAnuncio.css'; // Importe o arquivo CSS para estilização
import FormularioAnuncio from './FormularioAnuncio'; // Importe o componente de formulário de anúncio

function AnuncioPage() {
  const [anuncioData, setAnuncioData] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Adicione estado para controlar a exibição do formulário

  useEffect(() => {
    async function fetchAnuncioData() {
      try {
        const response = await axios.get('http://localhost:5000/buscaranuncio');
        if (response.status === 200) {
          setAnuncioData(response.data);
        } else {
          console.error('Erro ao buscar dados do anúncio:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do anúncio:', error);
      }
    }

    fetchAnuncioData();
  }, []);

  const handleOpenForm = () => {
    setMostrarFormulario(true);
  };

  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  return (
    <div className="anuncio-page">
      <h1>Nossos Anunciantes</h1>
      {/* Adicione um botão para abrir o formulário */}
      <button onClick={handleOpenForm} className="button">Adicionar Anúncio</button>
      {mostrarFormulario && <FormularioAnuncio onClose={handleCloseForm} />} {/* Renderize o formulário se o estado mostrarFormulario for verdadeiro */}
      {anuncioData && (
        <div className="anuncio-data">
          <h2>As Melhores Marcas</h2>
          {anuncioData.map((anuncio, index) => (
            <div className="anuncio-card" key={index}>
              <p><strong>Nome da Empresa:</strong> {anuncio.nomeEmpresa}</p>
              <p><strong>Telefone:</strong> {anuncio.telefone}</p>
              <p><strong>Endereço:</strong> {anuncio.endereco}</p>
              <p><strong>Email:</strong> {anuncio.email}</p>
              <p><strong>Imagens:</strong></p>
              {anuncio.imageAnuncio && <img src={anuncio.imageAnuncio} alt={`Imagem ${index + 1}`} className="anuncio-image" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnuncioPage;
