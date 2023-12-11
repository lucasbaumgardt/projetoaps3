import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import {BsFillCameraFill} from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./style2.css";
import api from "../../services/api";


const MostraProdutos = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [foto, setFoto] = useState(null);
  const [inputVisbility, setInputVisility] = useState(false);
  const [guiaDisplay, setGuiaDisplay] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
  getTodos();
  getCategory();
  }, []);


  const style1 = {
    color: 'black'
  }

  const history = useNavigate();

  const closeEdit = () => {
    setInputVisility(false)
  }  

  async function handleWithNewButton() {
    setInputVisility(!inputVisbility);
  }

  async function handleWithEditButtonClick(todo) { 
      setInputVisility(true);
      setSelectedTodo(todo);
      
  }

  // async function getTodos() {
  //     const response = await api.get("/produtos");
  //     setTodos(response.data);
  //     console.log(response.data);
  // } 

  async function getTodos() {
    const response = await api.get("/produtos");
    const todosWithImages = response.data.map((todo) => {
      return {
        ...todo,
        imagem_url: `http://localhost:3008/produtos/imagem/${todo.id}`,
      };
    });
    setTodos(todosWithImages);
    
  }

  async function getCategory() {
    try {
        const response = await api.get("/categorias");
        setCategories(response.data || []);
    } catch (error) {
        console.log("Erro ao obter as categorias: ", error);
    }
  }

  async function createTodo() {
      const response = await api.post("/produtos", {
      name: name,
      category: category,
      price: price
  });

  getTodos();
  setInputVisility(!inputVisbility);
  setName("");
  setCategory("");
  setPrice("");
  }

  async function updateItem () {

    Swal.fire({
      title: "Atualizar item",
      text: `Deseja atualizar o item com id ${selectedTodo.id}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        api.put("/produtos/" + selectedTodo.id, {
          name: name,
          category: category,
          price: price,
        }).then(() => {
          Swal.fire({
            title: "Sucesso",
            text: "Item atualizado com sucesso",
            icon: "success",
            confirmButtonText: "OK",
          });
          setSelectedTodo();
          setInputVisility(false);
          getTodos();
          setName("");
          setCategory("");
          setPrice("");
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
      else {
        Swal.fire({
          title: "Alterações canceladas",
          text: "As alterações não foram salvas.",
          icon: "info",
          confirmButtonText: "OK",
        });
        setSelectedTodo();
        setInputVisility(false);
        setName("");
        setCategory("");
        setPrice("");
      }
    });
  }

  async function deleteTodo(todo) {
    Swal.fire({
      title: `Deseja excluir o item com o id ${todo.id}?`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      icon: "question"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/produtos/${todo.id}`);
          getTodos();
          Swal.fire("Sucesso", "Item excluído com sucesso!", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Erro", "Ocorreu um erro ao excluir o item", "error");
        }
      }
    });
  }
  


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (itemId, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [itemId]: imageUrl,
      }));
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImages((prevImages) => ({
        ...prevImages,
        [itemId]: null,
      }));
    }
  };

  
  const Todos = ({ todos }) => {
    return (
      todos.map((todo) => (
        <Link to={`/produto/${todo.id}`} key={todo.id} className="product-link">
          <div key={todo.id} className="card">
            <div>
              <label className="picture" htmlFor={`picture__input-${todo.id}`} tabIndex={0}>
                <span className="picture__image">
                  {todo.imagem_url ? (
                    <img src={todo.imagem_url} alt="Product" className="selected-image" />
                  ) : (
                    <BsFillCameraFill className="camera" />
                  )}
                </span>
              </label>
            </div>
  
            <div className="alinha-info">
              <p className="card-text-name" name="name">{todo.name}</p>
              <p className="card-text-category" name="category">{todo.category}</p>
              <p className="card-text-price" name="price">{parseFloat(todo.price).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}</p>
            </div>
          </div>
        </Link>
      ))
    );
  };

  return (
    <main>
      <div className="card-principal">
        <Todos todos={todos}></Todos>
      </div>

      <div className="display" style={{ display: inputVisbility ? "block" : "none"}}>
        {/* <NavBar></NavBar> */}
        <button className="close-button" onClick={closeEdit}>X</button>
        <form className="input">
              <h2 className="title_h2_view">Atualização de Produtos</h2>
                      <div className="input-group-atualizar">    
                          <div>Nome</div>
                          <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="form-control"  />
                      </div>
                  
                      <div className="input-group-atualizar">

                        <div>Selecione uma categoria</div>

                          <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-control">

                            <option value="l"></option>
                            {categories.map((category, index) => (
                              <option key={`${category.id_category}-${index}`} value={category.id_category}>
                                {category.name_category}
                              </option>
                            ))}
                          </select>      
                      </div>
                  
                      <div className="input-group-atualizar">
                          <div>Preço</div>
                          <input type="text" name="price" value={price} onChange={e => setPrice(e.target.value)} className="form-control"  />
                      </div>

                      <button type="button" onClick={inputVisbility ? selectedTodo ? updateItem : createTodo : handleWithNewButton}
                          className="button-submit"
                          >Salvar
                      </button>  
      
          </form>
      </div>
    </main>
  )
   
};

export default MostraProdutos;


