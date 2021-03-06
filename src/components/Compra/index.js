import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import TableInfo from '../TableInfo';
import Truck from '../../assets/images/truck.svg';
import api from '../../services/api'
import './styles.css';
import { Link, useHistory, useParams } from "react-router-dom";

import * as CartActions from '../../store/modules/cart/action';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Compra(props) {

    const {id} = useParams();
    const[produto, setproduto] = useState({});
    
    useEffect(() => {
        api.get(`/products/${id}`).then(response => {
            setproduto(...response.data.data)
        })},[])

    const history = useHistory()

    const [ qnt, setQnt ] = useState(1);

    function handleChange(e){
        e.preventDefault();

        setQnt(e.target.value);
    }

    const dispatch = useDispatch();

    const car = useSelector(state =>

        state.cart.map(plate => ({
        ...plate,
        }))
    );

    const cartSize = useSelector(state => state.cart.length);

    function handleAddProduct(product, red) {
        

        if (red){

            if (produto.quantity === 0) {

                dispatch(CartActions.addToCart({...product, qnt: 0, price: product.price, food: product.id}))
                history.push('/carrinho');
            }else {
                dispatch(CartActions.addToCart({...product, qnt: 1, price: product.price, food: product.id}))
                history.push('/carrinho');
            }

        }else {
            if (produto.quantity === 0){
                dispatch(CartActions.addToCart({...product, qnt: 0, price: product.price, food: product.id}))
            }else {
                dispatch(CartActions.addToCart({...product, qnt: 1, price: product.price, food: product.id}))
            }
        }

    }
    


    const [ product, setProduct ] = useState({
        "id": produto,
        "qnt": produto.quantity
    })

    

    return(
        <div className="container-compra">
            <header>
                <Header />
            </header>

            <div className="frete">
                <img src={Truck} alt="Caminhão" id="img-truck"/>
                <h1 id="text-frete"><strong>FRETE GRÁTIS</strong></h1>
                <h2 id="descricao-frete">A partir de R$ 69,99 |</h2>
                <h2 id="descricao-prazo">Prazo de troca estendido para 90 dias.</h2>
            </div>
            <h2 id="title-compras">{produto.name} </h2>

            <div className="container-principal">
                <section className="container-img">
                    <img src={produto.image_adress} id="produto-img" alt="Sapato Vermelho"/>
                </section>

                <section className="container-cores">
                    <span id="price-item">R$ {produto.price}</span>
                    <form>
                        <fieldset className="cores">
                            <legend id="title-color">COR:</legend>
                            <button	type="button" id="branco">B</button>
                            <button	type="button" id="vermelho">V</button>
                            <button	type="button" id="preto">P</button>
                        </fieldset>
                    </form>
                        <div className="tamanhos">
                            <h3>TAMANHO</h3>
                            <form>
                                <select id="button-select">
                                    <option>34</option>
                                    <option>36</option>
                                    <option>38</option>
                                    <option>40</option>
                                </select>
                                <h3>QUANTIDADE</h3>
                                <input type="number" onChange={handleChange} id="quantidade-compra"value={qnt} min="1" max="200" />
                            </form>
                        </div>
                    <div className="comprar">
                        <button onClick={() => handleAddProduct(produto, true)} type="submit" id="button-compra">Comprar</button>
                        <button type="submit" id="button-voltar">Voltar</button>
                    </div>
                    <Link onClick={() => handleAddProduct(produto, false)}id="link-carrinho">adicionar à sacola.</Link>
                </section>
            </div>
            <div className="informacoes">
                <TableInfo />
            </div>
            <footer>
                <Footer id="footer-compra"/>
            </footer>
        </div>
    );
}
