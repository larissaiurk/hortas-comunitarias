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
          <img src={logo} alt="Ecoleta"/>
        </header>
        <main>
          <h1>Seu marketplace de hortas urbanas.</h1>
          <p>Ajudamos pessoas a encontrarem hortas urbanas comunitárias de forma eficiente</p>

          <Link to="/login">
            <span>
              <FiLogIn />
            </span>
            <strong>Venha fazer parte disso!</strong>
          </Link>

        </main>
      </div>
    </div>
  );
};

export default Home;