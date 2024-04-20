import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginPopup.jsx'; // Importe o componente LoginForm
import './Menu.css';

function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login do usuário
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar a exibição do menu

  const handleLogin = () => {
    setIsLoggedIn(true); // Define como logado
    setShowLoginPopup(false); // Fecha o popup de login após o login bem-sucedido
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Define como deslogado
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Inverte o estado de exibição do menu
  };

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup); // Inverte o estado de exibição do popup de login
  };

  return (
    <div className="menu-container">
      <button className="menu-toggle" onClick={toggleMenu}>&#9776; Menu</button> {/* Adicione "Menu" dentro do botão */}
      <ul className={showMenu ? "menu-list show" : "menu-list"}>
        <li className="menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/create">Cadastro</Link>
        </li>
        <li className="menu-item">
          <Link to="/imoveis">Imóveis</Link>
        </li>
        <li className="menu-item">
          <Link to="/pageanuncio">Promoções</Link>
        </li>
        <li className="menu-item">
          <Link to="/perfil">Perfil</Link>
        </li>
        {!isLoggedIn ? (
          <li className="menu-item">
            <span onClick={toggleLoginPopup} className="login-button">Login</span>
            {showLoginPopup && (
              <div className="login-popup">
                {/* Renderiza o componente de formulário de login se showLoginPopup for verdadeiro */}
                <LoginForm onLogin={handleLogin} />
              </div>
            )}
          </li>
        ) : (
          <li className="menu-item">
            <button onClick={handleLogout} className="login-button">Sair</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Menu;
