import React, { useState, useEffect } from 'react';
import './pageimovel.css';
import FormularioImovel from './imovelform.js';




// Componente para representar um card de imóvel
function CardImovel({ imovel }) {
  // Adicione um console.log para verificar a URL da imagem
 

  return (
    
    <div className='container'>
     
       
      <div className="card">
     
        <h2>{imovel.Tipo_imovel}</h2>
        
       
        {/* Utilize a tag img para renderizar a imagem */}
        <img src={imovel.imageUrl} alt="Imagem do Imóvel" />
        <p> {imovel.venda_aluguel}</p>
        <p>Garagem - {imovel.garagem}</p>
        <p> Tipo de Imovél - {imovel.novo_usada} </p>
        <p> Endereço - {imovel.address}</p>
        <p>Contato  - {imovel.phone}</p>
        <p>Piscina - {imovel.piscina} </p>
        {/* Adicione outras informações do imóvel aqui */}
      </div>
    </div>
  );
}


function PageImoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [carregandoImoveis, setCarregandoImoveis] = useState(true);

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const response = await fetch('http://localhost:5000/buscaimoveis');
        if (response.ok) {
          const data = await response.json();
          setImoveis(data);
          setCarregandoImoveis(false); // Define como falso após a busca dos imóveis
        } else {
          console.error('Erro ao buscar imóveis:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      }
    }

    fetchImoveis();
  }, []);

  const handleOpenForm = () => {
    setMostrarFormulario(true);
  };

  const handleCloseForm = () => {
    setMostrarFormulario(false);
  };

  return (
    <div>
     
      <h1>Imóveis Disponíveis</h1>
      <button className='bt1' onClick={handleOpenForm}>Adicionar Imóvel</button>
      {mostrarFormulario && <FormularioImovel onClose={handleCloseForm} />}
      {carregandoImoveis ? (
        <p>Carregando imóveis...</p>
      ) : (
        imoveis.map(imovel => (
          <CardImovel key={imovel.id} imovel={imovel} />
        ))
      )}
    </div>
  );
}

export default PageImoveis;
