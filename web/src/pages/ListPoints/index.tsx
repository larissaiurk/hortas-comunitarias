import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

import './styles.css';

import Logo from '../../assets/logo.png';

interface Category {
  id: number;
  title: string;
}

interface Item {
  id: number;
  title: string;
  image_url: string;
  category: number;
}

interface Point{
  id: number;
  image: string;
  name: string;
  responsibleName: string;
  email: string;
  whatsapp: number;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  image_url: string;
}

const ListPoints = () => {
  const [point, setPoint] = useState<Point>();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

  const [formData, setFormData] = useState({
    name: '',
    responsibleName: '',
    email: '',
    whatsapp: '',
  });
  
  const history = useHistory();

  let { id } = useParams();

  useEffect(() => {
    api.get(`points/${id}`).then(response => {
      setPoint(response.data.serializedPoint)
      console.log(response.data.serializedPoint);
    })
  }, []);  

  useEffect(() => {
    if(point) {
      const { latitude, longitude } = point;
      setInitialPosition([latitude, longitude]);
    }
  }, [point])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent ){
    event.preventDefault();

    let { name, responsibleName, email, whatsapp } = formData;

    if(!name) {
      name = point ? point.name : '';
    }
    if(!responsibleName) {
      responsibleName = point ? point.responsibleName : '';
    }
    if(!email) {
      email = point ? point.email : '';
    }
    if(!whatsapp) {
      whatsapp = point ? String(point.whatsapp) : '';
    }            

    await api.put(`points/${id}`, { name, responsibleName, email, whatsapp });

    alert('Dados da horta atualizados com sucesso!');

    history.push(`/point/${id}`)
  }

  return (
    <div id="page-list-point">
      <header>
        <img src={Logo} alt="Hortas Comunitárias"/>
        <Link to={`/point/${id}`}> 
          <FiArrowLeft></FiArrowLeft>
          Voltar para horta
        </Link>
      </header>

      {
        point ? (
          <form onSubmit={handleSubmit}>
            <h1>{point.name}</h1>

            <img className="img-principal" src={point.image_url} alt={point.name}/>

            <fieldset>
              <legend>
                <h2>Dados</h2>
                <span>Você pode alterar o nome da horta, responsável, e-mail e whatsapp </span>
              </legend>

              <div className="field">
                <label htmlFor="name">Nome da horta</label>
                <div className="edit">
                  <input 
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    placeholder={point.name}
                    data-cy="name"
                    />
                  <FiEdit className="icon-edit" size={20}></FiEdit>
                </div>
              </div>      
              <div className="field">
                <label htmlFor="responsibleName">Nome responsável pela horta</label>
                <div className="edit">
                  <input 
                    type="text"
                    name="responsibleName"
                    id="responsibleName"
                    onChange={handleInputChange}
                    placeholder={point.responsibleName}
                  />
                  <FiEdit className="icon-edit" size={20}></FiEdit>
                </div>                
              </div>                
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <div className="edit-middle">
                    <input 
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleInputChange}
                      placeholder={point.email}
                    />
                    <FiEdit className="icon-edit" size={20}></FiEdit>
                  </div>                   
                </div>         

                <div className="field">
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <div className="edit-middle">
                    <input 
                      placeholder={String(point.whatsapp)}
                      type="text"
                      name="whatsapp"
                      id="whatsapp"
                      onChange={handleInputChange}
                    />
                    <FiEdit className="icon-edit" size={20}></FiEdit>
                  </div>                   
                </div> 
              </div>

            </fieldset>

            <fieldset>
              <legend>
                <h2>Endereço da horta</h2>
              </legend>

              <Map center={initialPosition} zoom={16}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={initialPosition}/>
              </Map>

              <h3>{point.city} - {point.uf}</h3>
            </fieldset>
{/* 
            <fieldset>
              <legend>
                <h2>Produtos disponíveis <br /> na horta</h2>
                <span>Selecione um ou mais ítens abaixo</span>
              </legend>

              <ul className="items-category">
                {category.map(item => (
                  <li 
                    key={item.id} 
                    onClick={() => {handleSelectedCategories(item.id)}}
                  >
                    <button className={getClassCategory(item.id)}>{item.title}</button>
                  </li>
                ))}
              </ul>          

              <ul className="items-grid">
              { selectedCategories.length > 0
                ? filteredItems.map(item => (
                  <li 
                    key={item.id} 
                    onClick={() => handleSelectedItem(item.id)}
                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                  >
                    <img src={item.image_url} alt={item.title}/>
                    <span>{item.title}</span>
                  </li>
                ))
                : items.map(item => (
                  <li 
                    key={item.id} 
                    onClick={() => handleSelectedItem(item.id)}
                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                  >
                    <img src={item.image_url} alt={item.title}/>
                    <span>{item.title}</span>
                  </li>
                ))
              }            
              </ul>
            </fieldset>   */}


            <button data-cy="btn-edit-save" className="button-submit" type="submit">Salvar dados da horta</button>              
          </form>
        ) :
        (
          <h1>Oi</h1> //todo arrumar isso
        )
      }

    </div>
  );
}

export default ListPoints;