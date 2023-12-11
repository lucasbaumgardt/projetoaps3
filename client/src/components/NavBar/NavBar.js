import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbMenu2 } from "react-icons/tb";
import api from '../../services/api';
import "./styles.css";


function NavBar(props) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const history = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCart = () => {
    history('/cart');
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setIsListVisible(false);
      setFilteredProducts([]);
      return;
    }

    const searchLowerCase = search.toLowerCase();
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchLowerCase));
    setFilteredProducts(filtered);
    setIsListVisible(true);
  }, [search, products]);

  return (
    <nav className=''>

      <div className='div_logout'>
    
      </div>

      <div className='div_center_nav'>
        <input type="search" onChange={(e) => setSearch(e.target.value)}className='search-bar'></input>

        <ul>

          {filteredProducts.map((product) => (


            <li key={product.name}>
              <p>{product.name}</p>
              <p>{product.category}</p>
            </li>

          ))}

        </ul>
      </div>

      <div className='div_cart_menu'>
        <TbMenu2 className='menu_nav' onClick={handleOpenModal}></TbMenu2>
        <AiOutlineShoppingCart className="cart" onClick={handleCart}></AiOutlineShoppingCart>
      </div>

      {/* {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <div className='modal_titulo'>
            <TbMenu2 className='menu_nav_close' onClick={handleCloseModal}>&times;</TbMenu2>
          </div> 
        </div>
      </div>
    )} */}
    
    </nav>
  );

}

export default NavBar;