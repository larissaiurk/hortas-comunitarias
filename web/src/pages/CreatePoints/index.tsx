import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

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

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}


const CreatePoints = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] =useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

  const [formData, setFormData] = useState({
    name: '',
    responsibleName: '',
    email: '',
    whatsapp: '',
  });
  
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  
  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, [])

  useEffect(() => {
    api.get('categories').then(response => {
      setCategory(response.data);
    })
  }, []);  

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    })
  }, []);

  useEffect(() => {
    if(selectedUf === '0') {
      return
    }
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      })    

  }, [selectedUf]);

  useEffect(() => {
    const filter = items.filter(item => {
      return selectedCategories.includes(item.category)
    })
    setFilteredItems(filter);
  }, [items, selectedCategories])

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }  

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng,
    ])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);
    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleSelectedCategories(id: number) {
    const alreadySelected = selectedCategories.findIndex(item => item === id);
    if(alreadySelected >= 0) {
      const filteredItems = selectedCategories.filter(item => item !== id);
      setSelectedCategories(filteredItems);
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  }  

  async function handleSubmit(event: FormEvent ){
    event.preventDefault();

    const { name, responsibleName, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();

    data.append('name', name);
    data.append('responsibleName', responsibleName);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude',  String(longitude));
    data.append('items', items.join(','));
    
    if(selectedFile) {
      data.append('image', selectedFile);
    }

    await api.post('points', data).then(response => {
      const { id } = response.data;
      console.log(response, id);
      // alert('Horta Cadastrada com Sucesso!!');
      history.push(`/point/${id}`)
    });

  }

  function getClassCategory(id: number) {
    const isSelected = selectedCategories.includes(id) ? 'selected' : ''
    let classColor = '';
    switch (id) {
      case 1:
        classColor = 'fruta';
        break;
      case 2:
        classColor = 'verdura';
        break;
      case 3:
        classColor = 'legume';
        break;
      case 4:
        classColor = 'outros';
        break;                              
      default:
        break;
    }

    return `${isSelected} ${classColor}`
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={Logo} alt="Hortas Comunitárias"/>
        <Link to="/"> 
          <FiArrowLeft></FiArrowLeft>
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro da <br /> horta comunitária</h1>

        <Dropzone data-cy="dropzone" onFileUploaded={setSelectedFile}></Dropzone>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da horta</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
              data-cy="name"
            />
          </div>      
          <div className="field">
            <label htmlFor="responsibleName">Nome responsável pela horta</label>
            <input 
              type="text"
              name="responsibleName"
              id="responsibleName"
              onChange={handleInputChange}
              data-cy="responsible"
            />
          </div>                
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                data-cy="email"

              />
            </div>         

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
                data-cy="whatsapp"
              />
            </div> 
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço da horta</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}/>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado(UF)</label>
              
              <select 
                name="uf" 
                id="uf" 
                value={selectedUf} 
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select 
                name="city" 
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione uma Cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>            
          </div>
        </fieldset>

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
                <button type="button" className={getClassCategory(item.id)}>{item.title}</button>
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
                data-cy={`product-cat-${item.id}`}
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
                data-cy={`product-${item.id}`}
              >
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
              </li>
            ))
          }            
          </ul>
        </fieldset>  

        <button className="button-submit" type="submit">Cadastrar horta</button>              
      </form>
    </div>
  );
}

export default CreatePoints;