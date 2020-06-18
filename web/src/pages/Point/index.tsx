import React , { useEffect, useState } from 'react';
import { Link , useHistory, useParams } from 'react-router-dom';
import { MdLocalFlorist, MdLocationOn, MdStar, MdMoreHoriz } from 'react-icons/md';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import horta from '../../assets/horta1.jpg';

interface Point{
  serializedPoint: {
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
  },
  serializedItems: {
    id: number;
    image_url: string;
    title: string;
    category: number;    
  }[]
}

const Point = () => {

  const history = useHistory();
  let { id } = useParams();

  const [point, setPoint] = useState<Point>();
  console.log(point);
  useEffect(() => {
    api.get(`points/${id}`).then(response => {
      setPoint(response.data)
      console.log(response.data, point);
    })
  }, []); 

  async function handleDeletePoint() {
    const confirmDelete = window.confirm("Todas as informações serão perdidas. Você tem certeza que quer apagar sua horta?"); 
      
    if(confirmDelete) {
      try{
        await api.delete(`points/3`);

        alert('Horta deletada')
        history.push('/');

      } catch (err) {
        alert('ERRO. Não foi possível apagar sua horta, tente novamente.')
      }
    }
  }


  return (
    <div id="point">
      <header>
        <img src={logoImg} alt="Hortas Comunitárias"/>
        <Link to="/"> 
          <FiArrowLeft></FiArrowLeft>
          Voltar para home
        </Link>
      </header>

      { point ?
      (
        <div className="grid">
          <div className="grid-item">        
            <h1>{point.serializedPoint.name}</h1>  
            <img src={horta} alt="Horta"></img>

            <ul>
              <li>
                <h3>Responsável</h3>
                <span>{point.serializedPoint.responsibleName}</span>
              </li>            
              <li>
                <h3>Email</h3>
                <span>{point.serializedPoint.email}</span>
              </li>
              <li>
                <h3>Whatsapp</h3>
                <span>{point.serializedPoint.whatsapp}</span>
              </li>
              <li>
                <h3>Endereço</h3>
                <span>{point.serializedPoint.city} - {point.serializedPoint.uf}</span>
              </li>
            </ul>
            <div>
              <button 
                className="button button-delete" 
                type="submit" 
                onClick={handleDeletePoint}>
                  Excluir horta
              </button>    

              <Link className="button button-update" to={`/list-point/${id}`}> 
                Editar dados da horta
              </Link>          
            </div>
            

          </div>

          <div className="grid-item">
            <h2>Produtos disponíveis</h2>
            <button 
                className="button button-delete" 
                type="submit">
                  Editar produtos
            </button>            
            {
              point && point.serializedItems && (
                <ul className="items-point">
                  { point.serializedItems.map(item => (
                      <li 
                        key={item.id} 
                        onClick={() => {}}
                        className=''
                      >
                        <img src={item.image_url} alt={item.title}/>
                        <span>{item.title}</span>
                      </li>
                    ))
                  }            
                </ul>            
              )
            }
          </div>
        </div>
      ) : (
        <h1>Oi</h1>
      )
      }
    </div>
  )
}

export default Point;