import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../services/api";

const SeletorDeImagem = ({ onSelect }) => {
  const [id, setId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFoto, setSelectedFoto] = useState(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  async function getImage() {
  try {
    const response = await api.get(`/files`);
    setFotos(response.data || []);
  } catch (error) {
    console.log("Erro ao obter as imagens: ", error);
  }
  }

  const handleSelect = () => {
    onSelect(selectedFoto);
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  }
  
  const closeModal = () => {
    setModalIsOpen(false);
  }

return (
  <div>
    <button onClick={openModal}>Selecionar Imagem</button>
    <Modal
      isOpen={modalIsOpen}
      contentLabel="Escolha uma Imagem"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Escolha uma Imagem</h2>
      <div className="modal-content">
        {fotos.map((foto) => (
        <img
        key={foto.id}
        src={`http://localhost:3001/files/${foto.id}`}
        alt={foto.fileName}
        className={selectedFoto === foto.id ? "selected" : ""}
        onClick={() => setSelectedFoto(foto.id)}
        />
        ))}
      </div>
      <button onClick={handleSelect}>Selecionar</button>
      <button onClick={closeModal}>Fechar</button>
    </Modal>
  </div>
);
};

export default SeletorDeImagem;


