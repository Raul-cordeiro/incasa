import React, { useState } from 'react';
import api from './api'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Solicitação para o backend para fazer a verificação e autenticação do usuário
            const response = await api.post('http://localhost:5000/login', {
                email,
                password
            });

            const jsonData = response.data;

            if (jsonData.success) {
                setMessage('Login bem-sucedido!');
                // Redirecionar após 3 segundos
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/imoveis';
                }, 3000);
            } else {
                setMessage('Erro ao fazer login.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setMessage('Erro ao conectar ao servidor.');
        }
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
        </div>
    );
}

export default LoginForm;
