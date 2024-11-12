import React, { useState, useEffect } from 'react';  

const AuthForm = ({ onCreate, onSelect }) => {  
  const [username, setUsername] = useState('');  
  const [allUsernames, setAllUsernames] = useState([]);  
  const [suggestions, setSuggestions] = useState([]);  

  useEffect(() => {  
    const savedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];  
    setAllUsernames(savedUsernames);  
  }, []);  

  const handleInputChange = (e) => {  
    const value = e.target.value;  
    setUsername(value);  

    if (value) {  
      const filteredSuggestions = allUsernames.filter(name =>  
        name.toLowerCase().includes(value.toLowerCase())  
      );  
      setSuggestions(filteredSuggestions);  
    } else {  
      setSuggestions([]);  
    }  
  };  

  const handleCreate = () => {  
    if (username.trim()) {  
      if (!allUsernames.includes(username)) {  
        const updatedUsernames = [...allUsernames, username];  
        setAllUsernames(updatedUsernames);  
        localStorage.setItem('usernames', JSON.stringify(updatedUsernames));  
      }  
      onCreate(username);  
      setUsername('');  
      setSuggestions([]);  
    }  
  };  

  const handleSelect = (name) => {  
    onSelect(name);  
    setUsername('');  
    setSuggestions([]);  
  };  

  return (  
    <div className="auth-form" style={{ position: 'relative' }}>  
      <h2 style={{  
        textAlign: 'center',  
        fontWeight: 'bold',  
        fontSize: '24px',  
        marginTop: '20px',  
        fontFamily: 'Arial, sans-serif'  
      }}>  
        Для продолжения <br /> введите имя или ник  
      </h2>  
      <input  
        type="text"  
        placeholder="Имя или ник (можете выдумать)"  
        value={username}  
        onChange={handleInputChange}  
        className="input border p-2 rounded"  
        style={{ width: '100%' }}  
      />  
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>  
    <button onClick={handleCreate} className="text-white p-2 rounded"  
      style={{ backgroundColor: '#61dafb', marginRight: '10px' }}>  
      Создать  
    </button>  
    <button onClick={() => handleSelect(username)} className="text-white p-2 rounded"  
      style={{ backgroundColor: '#61dafb' }}>  
      Выбрать  
    </button>  
  </div>   
      {suggestions.length > 0 && (  
        <ul className="suggestions-list" style={{  
          position: 'absolute',  
          top: '100%',  
          left: '0',  
          right: '0',  
          backgroundColor: 'white',  
          border: '1px solid #ccc',  
          borderRadius: '4px',  
          zIndex: '1000',  
          listStyleType: 'none',  
          padding: '0',  
          margin: '5px 0 0 0',  
          maxHeight: '150px',  
          overflowY: 'auto'  
        }}>  
          {suggestions.map((suggestion, index) => (  
            <li key={index} onClick={() => handleSelect(suggestion)} className="suggestion-item" style={{  
              padding: '10px',  
              cursor: 'pointer',  
              borderBottom: '1px solid #eee'  
            }}>  
              {suggestion}  
            </li>  
          ))}  
        </ul>  
      )}  
    </div>  
  );  
};  

export default AuthForm;