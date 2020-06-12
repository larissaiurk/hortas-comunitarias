import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.png';

const Register = () => {
  return (
    <div className="register-container">
      <div className="content">
      <section>
        <img src={logoImg} alt="Hortas Comunitárias"/>
        <h1>Cadastro</h1>
        <p>Faça seu cadastro, entre na plataforma e encontre hortas comunitárias pela cidade ou cadastre a sua.</p>

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#E02041"/>
          Voltar para home
        </Link>
      </section>

      <form>
        <input placeholder="Nome"/>
        <input type="email" placeholder="E-mail"/>
        <input placeholder="Whatsapp"/>

        <div className="input-group">
          <input placeholder="Cidade"/>
          <input placeholder="UF" style={{ width: 80 }}/>
        </div>

        <Link className="button" to="/login">
          Cadastrar
        </Link>        
      </form>
    </div>
  </div>
  )
}

export default Register;