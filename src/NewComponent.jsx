// NewComponent.jsx
import React from 'react';
import './newComponent.css'; // Importe o arquivo CSS
import Anuncio from './pageAnuncios'

function NewComponent() {
  return (
    <div className="new-component">
      <h2>Seja bem vido Ao nosso App  </h2>
            Bem-vindo ao nosso aplicativo de vendas e aluguel de imóveis
            e espaços de eventos!
            Nosso aplicativo foi criado para oferecer a você
            uma plataforma conveniente e eficiente<br/> para apresentar seus imóveis disponíveis
            para venda ou aluguel, bem como para descobrir e alugar espaços de eventos para suas necessidades especiais.
            <div>
              <Anuncio/>
           </div>
    </div>
    
  );
}

export default NewComponent;
