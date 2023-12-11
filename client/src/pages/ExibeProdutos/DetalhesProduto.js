import React, { useEffect, useState } from 'react';
import {BsFillCameraFill} from "react-icons/bs";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style-detalhes.css';
import { useCart } from '../../context/Carrinho';

const DetalhesProduto = () => {
  const { id } = useParams();
  const [produtos, setProduto] = useState([]);
    const history = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    getProdutos();
  }, []);

  async function getProdutos() {
  try {
    const response = await api.get(`/produtos/${id}`);
    const produto = {
      ...response.data,
      imagem_url: `http://localhost:3008/produtos/imagem/${id}`,
    };
    setProduto([produto]);
  } catch (error) {
    console.error('Erro ao obter detalhes do produto:', error);
  }
}

const adicionarProdutoAoCarrinho = (produto) => {
    
    addToCart({ id: produto.id, 
                name: produto.name, 
                description: produto.description,
                category: produto.category, 
                price: produto.price, 
                imagem_url: produto.imagem_url
              });

    history('/cart');
  };



const Produtos = ({ produtos }) => {
    return (
        produtos.map((produto) => (
            <div key={produto.id} className='view-product-principal'>
                <h2 className="title_h2_view">Detalhes do Produto</h2>

                <div className='view-product'>
                    <div className='picture-principal'>
                        {produto.imagem_url ? (
                            <img src={produto.imagem_url} alt="Product" className="selected-image-details" />
                        ) : (
                            <BsFillCameraFill className="camera" />
                        )}
                        
                    </div>
                    <div>
                        <p>Cod: {produto.id}</p>
                        <p>Nome: {produto.name}</p>
                        <p>Descrição: {produto.description}</p>
                        <p>Categoria: {produto.category}</p>
                        <p>Preço: {parseFloat(produto.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <button
                            type="button"
                            className="btn-add-cart"
                            onClick={() => adicionarProdutoAoCarrinho(produto)}
                        >Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        ))
    )
}

  return (
    <div>
      <Produtos produtos={produtos}></Produtos>
    </div>
  );
};

export default DetalhesProduto;
