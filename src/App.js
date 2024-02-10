import React from 'react';
import './App.css';
import { useState } from 'react';
import uniqid from 'uniqid';
import { validate } from './helpers';

function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState({
    image: "",
    title: '',
    info: "",
    price: '',
    completed: false
  });

  const [errors, setErrors] = useState({
    image:"",
    title:'',
    info:"",
    price:''
  });

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setTodo({
      ...todo,
      [name]: value,
    });

    const error = validate(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.title.length > 0 && errors.info.length > 0 && errors.price.length > 0 && errors.image.length > 0) {
      alert('Something went wrong');
    } else {
      setList([
        ...list,
        {
          ...todo,
          id: uniqid(),
        },
      ]);

      setTodo({
        image: "",
        title: '',
        info: "",
        price: '',
        completed: false,
      });
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form_into'>
        <div className='input'>
          <label style={{ fontWeight: '500' }} htmlFor='title'>
            Title
          </label>
          <input
            className='title'
            name='title'
            value={todo.title}
            onChange={handleChange}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
        </div>

        <div className='input'>
          <label style={{ fontWeight: '500' }} htmlFor='image'>
            Image
          </label>
          <input
            type='file'
            className='image'
            name='image'
            value={todo.image}
            onChange={handleChange}
          />
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
        </div>

        <div className='input'>
          <label style={{ fontWeight: '500' }} htmlFor='info'>
            Info
          </label>
          <input
            className='info'
            name='info'
            value={todo.info}
            onChange={handleChange}
          />
          {errors.info && <p style={{ color: 'red' }}>{errors.info}</p>}
        </div>

        <div className='input'>
          <label style={{ fontWeight: '500' }} htmlFor='price'>
            Price
          </label>
          <input
            type='number'
            className='price'
            name='price'
            value={todo.price}
            onChange={handleChange}
          />
          {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
        </div>

        <button className='btn' type='submit'>
          Add
        </button>
      </div>

      <div className='elements'>
        {list.map((item) => (
          <div className='element' key={item.id}>
            <h2>Product name: {item.title}</h2>
            <img src={item.image} alt='Product' />
            <p>Product Info: {item.info}</p>
            <p>Product Price: {item.price}</p>
          </div>
        ))}
      </div>
    </form>
  );
}

export default App;
