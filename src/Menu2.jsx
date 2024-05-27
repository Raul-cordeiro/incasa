import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link do react-router-dom
import './Menu.css'; // Importe o arquivo CSS para estilização

function Menu() {
  const handleLoginPopup = () => {
    // Abra uma nova janela (popup) para a página de login
    window.open('/popuplogin', 'Login', 'width=400,height=400');
  };

  return (
    <div className="menu-container">
      <ul className="menu-list">
        <li className="menu-item">
          
        </li>
        <li className="menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/create">Cadastro</Link>
        </li>
       
        <li className="menu-item">
          <Link to="/perfil">Perfil</Link>
        </li>
        <li className="menu-item">
          <Link to="/pageanuncio">Promoções</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
