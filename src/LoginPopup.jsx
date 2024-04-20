import React, { useState } from 'react';

async function processResponse(response) {
  try {
    const data = await response.text();
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Erro ao converter texto em JSON:', error);
    throw error;
  }
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const jsonData = await processResponse(response);
      console.log(jsonData); // Aqui você pode acessar os dados JSON convertidos

      if (jsonData.success) {
        setMessage('Login bem-sucedido!');
        // Redirecionar após 3 segundos
        setTimeout(() => {
          window.location.href = 'http://localhost:3000/imoveis';
        }, 3000);
      } else {
        setMessage(jsonData.message || 'Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  // Função para lidar com o clique no botão "Registrar"
  const handleRegisterClick = () => {
    window.location.href = 'http://localhost:3000/create';
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
      <p>Registre-se!</p>
    
      <button onClick={handleRegisterClick}>Registrar</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginForm;
