import React, { useState, useEffect } from 'react';
import './perfil.css';

function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregandoUsuarios, setCarregandoUsuarios] = useState(true);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await fetch('http://localhost:5000/buscausuarios');
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error('Erro ao buscar usuários:', response.statusText);
        }
        setCarregandoUsuarios(false);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setCarregandoUsuarios(false);
      }
    }

    fetchUsuarios();
  }, []);

  return (
    <div className="perfil-container">
      {carregandoUsuarios ? (
        <p>Carregando perfis dos usuários...</p>
      ) : (
        usuarios.map(usuario => (
          <div className="perfil-card" key={usuario.id}>
            <h2>{usuario.username}</h2>
            <div className="perfil-data">
              <p><strong>Foto do Perfil:</strong></p>
              {usuario.imagem && <img src={usuario.imagem} alt={`Imagem de perfil de ${usuario.username}`} className="perfil-image" />}
              <p><strong>E-mail:</strong> {usuario.email}</p>
              <p><strong>Telefone:</strong> {usuario.phone}</p>
              <p><strong>Endereço:</strong> {usuario.address}</p> {/* Corrigido para 'address' */}
              <p><strong>Cidade:</strong> {usuario.city}</p>
             
              <p><strong>Idade:</strong> {usuario.age}</p>
              <p><strong>Estado Civil:</strong> {usuario.civilStatus}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Usuario;
