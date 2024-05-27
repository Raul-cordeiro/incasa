import React, { useState } from 'react';





function Anuncio() {
  const initialAnuncioData = {
    nomeEmpresa: '',
    telefone: '',
    endereco: '',
    email: '',
    imageAnuncio: ''
  };

  const [anuncioData, setAnuncioData] = useState(initialAnuncioData);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnuncioData({ ...anuncioData, [name]: value });
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
        body: formData
      });
      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json(); // Extrai a URL da resposta do servidor
        console.log('Imagem enviada com sucesso:', url);

        // Adiciona a URL da imagem aos dados do anúncio
        setAnuncioData({ ...anuncioData, imageAnuncio: url });

        // Envia os dados do anúncio para a rota '/anuncio'
        const anuncioResponse = await fetch('http://localhost:5000/anuncio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           
          },
          body: JSON.stringify(anuncioData)
        });

        if (anuncioResponse.ok) {
          console.log('Anúncio criado com sucesso!');
          setAnuncioData(initialAnuncioData);
          setSelectedFile(null);
        } else {
          console.error('Erro ao criar anúncio.');
        }
      } else {
        console.error('Erro ao enviar imagem');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="anuncio-container">
   
      <h2>Criar Novo Anúncio</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Nome da Empresa:
          <input 
            type="text" 
            name="nomeEmpresa" 
            value={anuncioData.nomeEmpresa} 
            onChange={handleChange} 
            required 
            autoComplete="off" 
          />
        </label>
        <label>
          Telefone:
          <input 
            type="text" 
            name="telefone" 
            value={anuncioData.telefone} 
            onChange={handleChange} 
            required 
            autoComplete="off" 
          />
        </label>
        <label>
          Endereço:
          <input 
            type="text" 
            name="endereco" 
            value={anuncioData.endereco} 
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
            value={anuncioData.email} 
            onChange={handleChange} 
            required 
            autoComplete="off" 
          />
        </label>
        <label>
          Escolha a Imagem:
          <input 
            type="file" 
            name="file" 
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

export default Anuncio;
