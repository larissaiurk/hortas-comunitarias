import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.png';
import backgroundPeople from '../../assets/home-background.png';

const Login = () => {
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Hortas Comunitárias"/>
        <form action="">
          <h1>Faça seu Login</h1>
          <input placeholder="Sua ID"/>
          <Link className="button" to="/garden-list">
            Entrar
          </Link>
          
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={backgroundPeople} alt="Agricultores"/>
    </div>
  )
}

export default Login;