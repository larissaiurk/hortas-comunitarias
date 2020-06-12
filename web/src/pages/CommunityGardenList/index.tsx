import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocalFlorist, MdLocationOn, MdStar, MdMoreHoriz } from 'react-icons/md';

import './styles.css';

import logoImg from '../../assets/logo.png';
import horta from '../../assets/horta1.jpg';
import perfil from '../../assets/perfil.png';

const CommunityGardenList = () => {
  return (
    <div className="container">
      
      <div className="grid">
        <section className="navigation">
          <img className="img-logo" src={logoImg} alt="Hortas Comunitárias"/>
          <div className="menu">
            <img className="img-perfil" src={perfil} alt="Perfil"/>
            <h1>Larissa Iurk</h1>
            <div className="menu-items">
              <ul>
                <li>
                  <MdLocationOn className="menu-items-icon" size={20} color="#F0BA62"></MdLocationOn>
                  <Link className="menu-link" to="/">
                    Minha horta
                  </Link>
                </li>
                <li>
                  <MdLocalFlorist className="menu-items-icon" size={20} color="#F0BA62"></MdLocalFlorist> 
                  <Link className="menu-link" to="/">
                    Comunidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="garden">
          <h1>Hortas pela cidade</h1>  
          <ul className="garden-items">
            <li>
              <img src={horta} alt="Horta"></img>
              <div className="garden-info">
                <p>Horta Verdinha</p>
                <span>Água Verde</span>
                <div className="icons">
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>

                  <MdMoreHoriz className="icon-mais" size={24} color="#701000"/>
                </div>
              </div>
            </li>
            
            <li>
              <img src={horta} alt="Horta"></img>
              <div className="garden-info">
                <p>Horta Verdinha</p>
                <span>Água Verde</span>
                <div className="icons">
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>

                  <MdMoreHoriz className="icon-mais" size={24} color="#701000"/>
                </div>
              </div>
            </li>

            <li>
              <img src={horta} alt="Horta"></img>
              <div className="garden-info">
                <p>Horta Verdinha</p>
                <span>Água Verde</span>
                <div className="icons">
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>

                  <MdMoreHoriz className="icon-mais" size={24} color="#701000"/>
                </div>
              </div>
            </li>

            <li>
              <img src={horta} alt="Horta"></img>
              <div className="garden-info">
                <p>Horta Verdinha</p>
                <span>Água Verde</span>
                <div className="icons">
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>
                  <MdStar size={24} color="#EDA024"/>

                  <MdMoreHoriz className="icon-mais" size={24} color="#701000"/>
                </div>
              </div>
            </li>                                    
          </ul>
        </section>
      </div>
    </div>
  )
}

export default CommunityGardenList;