import React, { useState } from 'react';
import '../main.css'

const MessageForm = () => {
 const [word, setWord] = useState('');
 const [colors, setColors] = useState([]);

 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/ask_gpt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
      });
      if (!response.ok) {
       //var err = throw new Error('Ошибка при отправке сообщения');
       alert('К сожалению мы не можем определить цвет для данного слова')
      }
      const data = await response.json();
      console.log(data);
      setColors(data.result);
      setWord('');
    } catch (error) {
      console.error('Ошибка:', error);
    }
 };

 const applyColors = () => {
   return colors.map((color, index) => (
     <div key={index} style={{ color:"", backgroundColor: color, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', width: "100%" }}>
        <p id="colors">Цвет {color}</p>
     </div>
   ));
 };

 return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 ,zIndex:"999", position:"absolute", top: "-200px", left: "0", bottom: "0", right: "0"}}>
        <label htmlFor="word" style={{ marginBottom: '10px' }}></label>
        <input
          type="text"
          id="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px', width: '200px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Отправить</button>
      </form>
      <div style={{display:"flex", zIndex:"0"}}>
        {applyColors()}
      </div>
    </div>
 );
};

export default MessageForm;
