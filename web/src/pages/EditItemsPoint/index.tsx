import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
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


const EditItemsPoint = () => {
  let { id } = useParams();

  const [category, setCategory] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  
  const history = useHistory();

  useEffect(() => {
    api.get('categories').then(response => {
      setCategory(response.data);
    })
  }, []);  

  useEffect(() => {
    api.get(`items-point/${id}`).then(response => {
      const { serializedItems } = response.data;
      
      const itemsIds = serializedItems.map((item: Item)  => {
        return item.id
      })
      setSelectedItems(itemsIds);
    })
  }, []);  

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);

  useEffect(() => {
    const filter = items.filter(item => {
      return selectedCategories.includes(item.category)
    })
    setFilteredItems(filter);
  }, [items, selectedCategories])

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

    const items = {
      "items": selectedItems.join(',')
    }
    console.log(items);

    await api.put(`items-point/${id}`, items).then(response => {
      alert('Horta Atualizada com Sucesso!');
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
    <div id="page-edit-item-point">
      <header>
        <img src={Logo} alt="Hortas Comunitárias"/>
        <Link to="/"> 
          <FiArrowLeft></FiArrowLeft>
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Itens <br/> Disponíveis na Horta</h1>

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

        <button data-cy="btn-edit-products-save" className="button-submit" type="submit">Atualizar itens</button>              
      </form>
    </div>
  );
}

export default EditItemsPoint;