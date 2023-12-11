import React from "react";
import Modal from 'react-modal';
import * as C from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import { BsFillCameraFill, BsPlusLg } from 'react-icons/bs';
import './style1.css';
import api from "../../services/api";
import SeletorDeImagem from "./ImageUploader";

const Cadastra = () => {

    const [todos, setTodos] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [name_category, setNameCategory] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState("");
    const [foto, setFoto] = useState(null);
    const [fotos, setFotos] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [inputVisbility, setInputVisility] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    
    useEffect(() => {
    getTodos();
    getCategory();
    getImage();
    }, []);


    const style1 = {
        color: 'black'
    }

    const history = useNavigate();

    async function getTodos() {
        const response = await api.get("/produtos");
        setTodos(response.data);
        console.log(response.data);
    }

    async function getCategory() {
        try {
            const response = await api.get("/categorias");
            setCategories(response.data || []);
        } catch (error) {
            console.log("Erro ao obter as categorias: ", error);
        }
    }
    
    async function getImage() {
      try {
          const response = await api.get(`/files/${id}`);
          setFotos(response.data || []);
      } catch (error) {
          console.log("Erro ao obter as imagens: ", error);
      }
    }
    
    async function createCategoria() {
      const response = await api.post("/categorias", {
      name_category: name_category
      });

      getCategory();
      setInputVisility(!inputVisbility);
      setNameCategory("");
      }

      // async function createImage(file) {
      //   try {
      //     const arquivo = {
      //       fileName: file.name, // Ajuste para pegar o nome do arquivo do objeto 'file'
      //       contentLength: file.size,
      //       contentType: file.type, // Ajuste para pegar o tipo do arquivo do objeto 'file'
      //       url: "", // Você pode ajustar isso, dependendo da estrutura de URL do seu servidor
      //     };
      
      //     // Fazer upload do arquivo para o servidor
      //     const formData = new FormData();
      //     formData.append("arquivo", file);
      
      //     // Enviar o arquivo para o servidor
      //     const response = await api.post("/files", formData, {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     });
      
      //     // Atualizar a URL com a URL retornada pelo servidor (se aplicável)
      //     arquivo.url = response.data.url;
      
      //     console.log("Upload de imagem bem-sucedido:", response.data);
      
      //   } catch (error) {
      //     console.error('Erro ao fazer upload de imagem:', error);
      //   }
      // }


      async function createImage() {
        try {
          const formData = new FormData();
          formData.append("arquivo", foto);
      
          const response = await api.post("/files", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          console.log("Upload de imagem bem-sucedido:", response.data);
      
          return response.data; // Retorne os dados da imagem (se necessário)
        } catch (error) {
          console.error('Erro ao fazer upload de imagem:', error);
          throw error; // Propague o erro para que ele possa ser tratado no chamador, se necessário
        }
      }      

      async function createTodo() {
        try {
          const formData = {
            name: name,
            description: description,
            category: parseInt(category), // Certifique-se de que a categoria seja um número
            price: parseFloat(price), // Certifique-se de que o preço seja um número
            foto: parseInt(foto), // Certifique-se de que a foto seja um número
          };
      
          const response = await api.post("/produtos", formData);
      
          getTodos();
          setInputVisility(!inputVisbility);
          setName("");
          setCategory("");
          setPrice("");
          setImagePreview(null);
      
          console.log("Produto criado com sucesso!", response.data);
          Swal.fire("Sucesso", "Produto Criado!.", "success");  
          history('/mostra-produtos'); // Corrigido o método push
        } catch (error) {
          console.error("Erro ao criar produto:", error);
          Swal.fire("Erro", "Erro ao criar produto. Tente novamente mais tarde.", "error");
        }
      }
      
      
      

    async function updateItem () {
        api.put("/produtos/" + selectedTodo.id, {
        name: name,
        description: description,
        category: category,
        price: price,
        })
        .then(() => {
            setSelectedTodo();
            setInputVisility(false);
            getTodos();
            setName("");
            setCategory("");
            setPrice("");
            history('/mostra-produtos');
        })
        .catch((response) => {
            if(response.response.status==404){
                Swal.fire("Erro ao atualizar", "Tarefa não encontrada!", "error");
                getTodos();
            }else{
                Swal.fire("Erro interno", "Tente Novamente", "error");
            }
        });
        }

    async function deleteTodo(todo) {
        const response = await axios.delete(
        `http://localhost:3002/produtos/${todo.id}`
    );
    getTodos();
    }
   
    const [newCategoryVisibility, setNewCategoryVisibility] = useState(false);

    const handleNewCategory = () => {
      setNewCategoryVisibility(!newCategoryVisibility);
    }

    const closeEdit = () => {
      setNewCategoryVisibility(false);
    }
    
    const saveReturn = () => {
      createCategoria();
      setNewCategoryVisibility(false);
    }

    const handleGalleryImageClick = (foto) => {
      setSelectedImageId(foto.id);
      setModalIsOpen(false);
      setFoto(foto.id); // Atualiza o estado da foto com o ID da imagem selecionada
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
  
      // Lógica para processar a imagem, se necessário
  
      // Atualiza o estado com o ID da imagem selecionada
      setSelectedImageId(file ? file.name : null);
      setFoto(null); // Limpa o estado da foto, pois uma nova imagem foi selecionada
    };

    const customStyles = {
      content: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '90%',
        height: '85vh',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      },
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 999,
      },
    };
    
    return (
       <main>
        <form className="align-form" encType="multipart/form-data">
            <h2 className="cad__h2__title">Cadastro de Produtos</h2>

            {/* <div className="select__options">
              <div className="select__options__category">    
                <select
                  name="foto"
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                  className="inputCamp"
                  >
                    <option></option>
                  {fotos.map((foto, index) => (
                    <option className="color-option" key={`${foto.id}-${index}`} value={foto.id}>
                      {foto.fileName}
                    </option>
                  ))}
                </select>

              </div>
              
            </div> */}

          {/* <button type="button" onClick={() => setModalIsOpen(true)}>
            Abrir Modal
          </button> */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Galeria de Imagens"
        style={customStyles}
      >
        <h2 className="cad__h2__title">Escolha a imagem para o produto</h2>
        <div className="image-gallery-modal">
          {fotos.map((foto, index) => (
            <div>
            <img
              key={index}
              src={`http://localhost:3002/files/${foto.id}`}
              alt={foto.fileName}
              onClick={() => handleGalleryImageClick(foto)}
            />
            <p>{foto.fileName}</p>
            </div>
          ))}
        </div>
      </Modal>

      <div>
        <p className="par">Clique para selecionar uma imagem</p>
        <div className="input" onClick={() => setModalIsOpen(true)}>
          <label className="image" htmlFor="input__image" tabIndex={0}>
            <span className="max__image">
              {selectedImageId ? (
                <img
                  src={`http://localhost:3002/files/${selectedImageId}`}
                  alt={`Selected Image`}
                  className="selected-image"
                />
              ) : (
                <BsFillCameraFill className="camera-cad" />
              )}
            </span>
          </label>

          <input
            type="text"
            className="image__input"
            name="image__input"
            id="input__image"
            value={foto || ''} readOnly
            accept="image/.png"
            onChange={handleImageChange}
          />
        </div>

            {/* <div className="image-gallery">
              {fotos.map((foto) => (
                <img
                  key={foto.id}
                  src={`http://localhost:3002/files/${foto.id}`}
                  alt={foto.fileName}
                  onClick={() => handleGalleryImageClick(foto)}
                />
              ))}
            </div> */}
          </div>

          <p className="par">Nome do Produto</p>
          <div className="input">  
            <input type="text" name="name" autoComplete="off" value={name} onChange={e => setName(e.target.value)} className="inputCamp"/>
          </div>

          <p className="par">Descrição</p>
          <div className="input">  
            <input type="text" name="description" autoComplete="off" value={description} onChange={e => setDescription(e.target.value)} className="inputCamp"/>
          </div>

          <p className="par">Categoria do Produto</p>  

          <div className="select__options">
            <div className="select__options__category">    
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="inputCamp"
                >
                  <option></option>
                {categories.map((category, index) => (
                  <option className="color-option" key={`${category.id_category}-${index}`} value={category.id_category}>
                    {category.name_category}
                  </option>
                ))}
              </select>

            </div>
            <div className="new-category" onClick={() => handleNewCategory()}>  
              <BsPlusLg className="new-category-icon"/>
            </div>
          </div>

          <p className="par">Preço</p>      
          <input type="text" name="name" autoComplete="off" value={price} onChange={e => setPrice(e.target.value)} className="inputCamp"/>                    
          
          

          <button type="button" onClick={createTodo}
              className="button-submit"
              >Salvar
          </button>  
        </form>

        <div className="display" style={{ display: newCategoryVisibility ? "block" : "none"}}>
        <button className="close-button" onClick={closeEdit}>X</button>
        <form className="input">
          <h2 className="title__h2">Nova Categoria</h2>
              <div className="input-group-atualizar">    
                  <div>Nome da Categoria</div>
                  <input type="text" name="category" value={name_category} onChange={e => setNameCategory(e.target.value)} className="form-control"/>
              </div>

              <button type="button" onClick={saveReturn}
                  className="button-submit"
                  >Salvar 
              </button>  
      
          </form>
      </div>
      </main>  
    );
}

export default Cadastra;


