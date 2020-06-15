import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.png';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Hortas Comunitárias"/>
        </header>
        <main>
          <h1>Seu marketplace de hortas urbanas.</h1>
          <p>Ajudamos pessoas a localizarem hortas urbanas comunitárias pela cidade de forma eficiente.</p>

          <Link to="/create-points">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre sua horta!</strong>
          </Link>

        </main>
      </div>
    </div>
  );
};

export default Home;