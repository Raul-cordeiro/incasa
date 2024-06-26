import React, { useState } from 'react';
import './formimovel.css';
import axios from "axios";

function FormularioImovel() {
  const initialImovelData = {
    Tipo_imovel: '',
    venda_aluguel: '',
    garagem: '',
    phone: '',
    address: '',
    city: '',
    piscina: '',
    novo_usada: '', // Alterado para uma string vazia para a opção padrão no menu suspenso
    imagem: '' // Adicionamos o campo para a URL da imagem
  };

  const [imovelData, setImovelData] = useState(initialImovelData);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImovelData({ ...imovelData, [name]: value });
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
      // Enviar imagem para a API
      const uploadResponse = await axios.post('http://localhost:5000/uploads', formData);
      const { url } = uploadResponse.data; // Extrair a URL da resposta da API

      // Adicionar a URL da imagem aos dados do imóvel
      const imovelComImagem = { ...imovelData, imagem: url };

      // Enviar dados do imóvel para a API
      const imovelResponse = await axios.post('http://localhost:5000/imovel', imovelComImagem);
      
      if (imovelResponse.status === 201) {
        console.log('Imóvel criado com sucesso!');
        setImovelData(initialImovelData);
        setSelectedFile(null);
      } else {
        console.error('Erro ao criar imóvel.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Novo Imóvel</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Tipo de Imóvel:
          <input 
            type="text" 
            name="Tipo_imovel" 
            value={imovelData.Tipo_imovel} 
            onChange={handleChange} 
            required 
            autoComplete="off" 
          />
        </label>
        <label>
          Venda ou Aluguel:
          <select 
            name="venda_aluguel" 
            value={imovelData.venda_aluguel} 
            onChange={handleChange} 
            required 
            autoComplete="off"
          >
            <option value="">Selecione</option>
            <option value="Venda">Venda</option>
            <option value="Aluguel">Aluguel</option>
          </select>
        </label>
        <label>
          Garagem:
          <input 
            type="text" 
            name="garagem" 
            value={imovelData.garagem} 
            onChange={handleChange} 
            required 
            autoComplete="off" 
          />
        </label>
        <label>
          Telefone:
          <input 
            type="text" 
            name="phone" 
            value={imovelData.phone} 
            onChange={handleChange} 
            autoComplete="tel" 
          />
        </label>
        <label>
          Endereço:
          <input 
            type="text" 
            name="address" 
            value={imovelData.address} 
            onChange={handleChange} 
            autoComplete="address-line1" 
          />
        </label>
        <label>
          Cidade:
          <input 
            type="text" 
            name="city" 
            value={imovelData.city} 
            onChange={handleChange} 
            autoComplete="address-level2" 
          />
        </label>
        <label>
          Piscina:
          <select 
            name="piscina" 
            value={imovelData.piscina} 
            onChange={handleChange} 
            autoComplete="off"
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </label>
        <label>
          Novo ou Usado:
          <select 
            name="novo_usada" 
            value={imovelData.novo_usada} 
            onChange={handleChange} 
            autoComplete="off"
            required
          >
            <option value="">Selecione</option>
            <option value="Novo">Novo</option>
            <option value="Usado">Usado</option>
          </select>
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

export default FormularioImovel;
