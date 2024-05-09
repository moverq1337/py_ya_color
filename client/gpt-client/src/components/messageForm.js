import React, { useState } from 'react';
import '../main.css';

const MessageForm = () => {
  const [word, setWord] = useState('');
  const [colors, setColors] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

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
        alert('К сожалению, мы не можем определить цвет для данного слова');
      }
      const data = await response.json();
      setColors(data.result);
      setWord('');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert(`Цвет ${text} скопирован в буфер обмена!`);
  };

  const applyColors = () => {
    return colors.map((color, index) => (
      <div
        key={index}
        style={{
          backgroundColor: color,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '24px',
          width: '100%',
        }}
      >
        <p
          onClick={() => fallbackCopyToClipboard(`Цвет ${color}`)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '5px',
          }}
        >
          Цвет {color}
        </p>
      </div>
    ));
  };

  const gradientStyle = {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(151,105,199,1) 0%, rgba(115,85,150,1) 100%)',
  };

  return (
    <div style={{...gradientStyle, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Pop-up окно во весь экран с градиентным фоном */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(151,105,199,1) 0%, rgba(115,85,150,1) 100%)', //  градиент
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              width: '500px',
              color:'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',

            }}
          >
            <h1>Добро пожаловать в веб-приложение помощник дизайнеру</h1>
            <br></br>
            <h3>Мы сможем сгенерировать цвета на ваше слово!</h3>
            <br></br>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FF6F61',
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Начать
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1002,
          width: '400px',
        }}
      >
        <input
          type="text"
          id="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          style={{
            padding: '10px',
            width: '70%',
            borderRadius: '25px 0 0 25px',
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            textAlign: 'center',
          }}
          placeholder="Введите слово..."
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            width: '30%',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(238,104,91,1) 0%, rgba(255,111,97,1) 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0 25px 25px 0',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'normal',
            transition: 'all 0.3s ease',
          }}
        >
          Отправить
        </button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'row', zIndex: '1000', flexWrap: 'nowrap' }}>
        {applyColors()}
      </div>
    </div>
  );
};

export default MessageForm;
