import React, { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCart } from '../../context/Carrinho';
import { BsFillCameraFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import api from  '../../services/api';
import "./styles.css";

const CarrinhoCompras = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("CHAVE_PUBLICA");

  const createPreference = async () => {
    try {

      const { description, price, quantity } = cartItems[0];

      const response = await api.post("/mercadopago/create_preference", {
        description: description,
        price: price,
        quantity: quantity,
      });

      console.log("Items sent to createPreference:", response.data);

      const { body: { id } } = response.data;
      console.log(id)
      // if (id) {
      //   window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${id}`
      //   setPreferenceId(id);
      // }
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      //window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${id}`
      clearCart();
    }
  };

  const calcularSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <div className='principal_carrinho_compras'>
      <div className='carrinho_compras'>
        
        <div className='principal_itens'>
          <div className='head_principal'>
            <h2 className='h2_head'>Carrinho</h2>
          </div>

          <hr className='hr_head' />

            <div className='itens_carrinho'>

                <CarrinhoItem removeFromCart={removeFromCart} />

            </div>
        </div>

        <div className='rodape'>
          <button className="button_clear_cart" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>

      <div className='informacoes-principal'>
        <div className='informacoes'>
          <div className='informacoes-conteudo'>
              <div className='head_principal2'>
                <h2 className='h2_head_info'>Detalhes da Compra</h2>
                
              </div>

              <hr className='hr_head2' />

              <div className='purchase_details'>
                <div className='subtotal_value'>
                  <p>Subtotal: {calcularSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <div className='total_value'>
                  <p>Endereço: União da Vitória - PR, barirro São Basílio Magno 84600498, Rua Elkys 185</p>
                  <p>Frete: Grátis</p>
                </div>
              </div>

              <div className='head_principal3'>
                <div className='total1'>
                  <h2 className='h2_head_info2'>Total</h2>
                </div>
            
                <div className='total2'>
                  <p className='info_total_value'>{calcularSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
              </div>
          </div>
        </div>

        
        <button className='button_checkout' onClick={handleBuy}>
          Finalizar Pedido
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </button>
        
      </div>

    </div>
  );
};

const CarrinhoItem = ({ item, removeFromCart }) => {

  const { cartItems, incrementQuantity, removeQuantity } = useCart();


  return (
    
    <table className='table_align'>

      <thead className='thead'>
        <tr className='thead_tr'>
          <th className='thead_th1'></th>
          <th className='thead_th1'>Descrição</th>
          <th className='thead_th2'>Quantidade</th>
          <th className='thead_th3'>Valor Unitário</th>
          <th className='thead_th3'>Valor Final</th>
          <th className='thead_th4'></th>
        </tr>
      </thead>

      <tbody>
        {cartItems.map((item) =>(
          <div className='separa_itens'>
            <tr className='tbody_tr'>

              <td className='tbody_td1'>
                <label className="" tabIndex={0}>
                  <span className="picture__image">
                    {item.imagem_url ? (
                      <img src={item.imagem_url} alt="Product" className="selected-image" />
                    ) : (
                      <BsFillCameraFill className="camera_cart" />
                    )}
                  </span>
                </label>
              </td>

              <td className='tbody_td1'>
                <p className="card-text">{item.name}</p>
                <p className="card-text">{item.category}</p>
                {/* <button className="button_remove" onClick={() => removeFromCart(item.id)}>Remove</button> */}
              </td>

              <td className='tbody_td2'>
                <button className="buttons_plus_minus" onClick={() => removeQuantity(item.id)}>-</button>
                <div className="quantity">{item.quantity}</div>
                <button className="buttons_plus_minus" onClick={() => incrementQuantity(item.id)}>+</button>
              </td>

              <td className='tbody_td3'>
                <p className="card-text">{parseFloat(item.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}</p>
              </td>

              <td className='tbody_td3'>
                <p className="card-text">{parseFloat(item.price * item.quantity).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}</p>
              </td>

              <td className='tbody_td4'>
                <div className='button_remove1'>
                  <AiFillDelete className="button_remove2" onClick={() => removeFromCart(item.id)}/>
                </div>
              </td>
            
            </tr>
          </div>
        ))}       
      </tbody>
    </table>
    
  );
};

export default CarrinhoCompras;

