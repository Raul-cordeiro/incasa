import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateFormUser from './CreateFormUser';
import Imoveis from './Pageimoveis.jsx';
import Menu from './Menu.jsx';
import FormularioImovel from './imovelform';
import Perfil from './Perfil.js';
import Slideshow from './slideshow.jsx'; // Importe o componente Slideshow
import './Home.css'; // Importe o arquivo CSS corretamente
import LoginPopup from './LoginPopup.jsx'; // Importe o componente LoginPopup
import  AnuncioPage from './pageAnuncios.jsx';
import FormularioAnuncio from'./FormularioAnuncio.jsx'
import NewComponent from './NewComponent.jsx';
import Slideshow2 from './galeria.jsx'





const handleLoginPopup = () => {
  // Abra uma nova janela (popup) para a página de login
  window.open('/popuplogin', 'Login', 'width=400,height=400');
};

function App() {
  
  
  
  return (
    
    <Router>
      
      <div>
       <Menu/>
       
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popuplogin" element={<LoginPopup />} /> {/* Use LoginPopup em vez de Login */}
          <Route path="/create" element={<CreateFormUser />} />
          <Route path="/imoveis" element={<Imoveis />} />
          <Route path="/formimovel" element={<FormularioImovel />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/slideshow" element={<Slideshow />} />
          <Route path="/pageanuncio" element={<AnuncioPage />} />
          <Route path="/formularioanuncio" element={<FormularioAnuncio />} />
          <Route path="/newcomponent" element={<NewComponent />} />
          




          
        </Routes>
      
       
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className='home'>
      <div>
     
      </div>
      <h1 className='title'>Bem-vindo à página inicial!</h1>
      <p>Raul Cordeiro Tecnologias</p>
      <div><Slideshow/></div>
      <div>
        <h2 className='h2runs'>INCasa Imóveis</h2>
      </div>
      <div>
        
        <div>
        <Slideshow2/>
       
        </div>
        
      </div>
    </div>
  );
}

export default App;
