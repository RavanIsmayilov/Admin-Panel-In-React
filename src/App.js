import React, { useState } from 'react';
import './App.css';
import uniqid from 'uniqid';
import { validate } from './helpers';

function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState({
    image: '',
    title: '',
    info: '',
    price: '',
    completed: false,
  });

  const [errors, setErrors] = useState({
    image: '',
    title: '',
    info: '',
    price: '',
  });

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      setTodo({
        ...todo,
        image: files[0], // Store the File object directly
      });
    } else {
      // Handle other input fields
      setTodo({
        ...todo,
        [name]: value,
      });
    }
    const error = validate(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      
  if (!todo.title || !todo.image || !todo.info || !todo.price) {
    alert('Please fill in all required fields');
    return; 
  }

    if (Object.values(errors).some((error) => error)) {
      alert('Something went wrong');
    } else {
      if (todo.image) {
        const imageUrl = URL.createObjectURL(todo.image);

        setList([
          ...list,
          {
            ...todo,
            id: uniqid(),
            image: imageUrl,
          },
        ]);
      } else {
        alert('Please select an image');
      }

      setTodo({
        image: null,
        title: '',
        info: '',
        price: '',
        completed: false,
      });
    }
  };

  const handleRemove = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
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
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </form>
  );
}

export default App;
