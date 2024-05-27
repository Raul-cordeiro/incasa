import React, { useState } from 'react';
import './css/CreateUser.css';

function CreateUser() {
  const initialUserData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    cpfCnpj: '',
    age: '',
    civilStatus: '',
    image: ''
  };

  const [userData, setUserData] = useState(initialUserData);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.error('Nenhuma imagem selecionada.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await fetch('http://localhost:5000/uploads', {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        console.log('Imagem enviada com sucesso:', url);

        // Atualizar apenas a URL da imagem no estado
        setUserData(prevUserData => ({ ...prevUserData, image: url }));

        // Enviar todos os dados do usuário, incluindo a URL da imagem
        const userResponse = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (userResponse.ok) {
          console.log('Usuário criado com sucesso!');
          setUserData(initialUserData);
          setSelectedFile(null);
        } else {
          console.error('Erro ao criar usuário.');
        }
      } else {
        console.error('Erro ao enviar dados do usuário.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };


  return (
    <div className="menu-cont">
      <h2 className='t2'>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Nome de Usuário:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirmar Senha:
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <label>
          Endereço:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <label>
          Cidade:
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <label>
          CPF/CNPJ:
          <input
            type="text"
            name="cpfCnpj"
            value={userData.cpfCnpj}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <label>
          Idade:
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Estado Civil:
          <select
            name="civilStatus"
            value={userData.civilStatus}
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            <option value="Solteiro(a)">Solteiro(a)</option>
            <option value="Casado(a)">Casado(a)</option>
            <option value="Divorciado(a)">Divorciado(a)</option>
            <option value="Viúvo(a)">Viúvo(a)</option>
          </select>
        </label>
        <label>
          Escolha a Imagem:
          <input
            type="file"
            name="imagem"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CreateUser;
