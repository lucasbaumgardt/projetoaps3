import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {BsFillCameraFill} from "react-icons/bs"
import { color } from "@chakra-ui/react";
import './style5.css';
import MostraProdutos from "../ExibeProdutos/MostraProdutos";
import Slider from "../../components/Slider/Slider";
const Home = () => {

  return (
    <main>
      {/* <div className="title-link">
        <h2 className="cad__h2__title">Todos os Produtos</h2>
        <div className="aumentah1">
        <Link to="/cadastra-produtos" className="link-new">+ Adicionar Produto</Link>
        </div>
      </div> */}
      <Slider></Slider>
      
      <MostraProdutos></MostraProdutos>
    </main>
  );

};

export default Home;

