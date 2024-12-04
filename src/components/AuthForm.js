import React, { useState } from 'react';  

const AuthForm = ({ onLogin }) => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [isRegistering, setIsRegistering] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');  
  const [showPassword, setShowPassword] = useState(false);  

  const handleLogin = () => {  
    if (username.trim() && password.trim()) {  
      // Проверяем, существует ли логин  
      const savedPassword = localStorage.getItem(`password_${username}`);  
      if (savedPassword) {  
        if (savedPassword === password) {  
          // Переход к приложению после успешного входа  
          onLogin(username, password);  
        } else {  
          setErrorMessage('Неверный пароль.');  
        }  
      } else {  
        setErrorMessage('Пользователь с таким логином не найден. Зарегистрируйтесь.');  
      }  
    } else {  
      setErrorMessage('Введите логин и пароль.');  
    }  
  }; 

  const handleRegister = () => {  
    if (username.trim() && password.trim()) {  
      // Проверяем, существует ли уже логин  
      const savedPassword = localStorage.getItem(`password_${username}`);  
      if (savedPassword) {  
        setErrorMessage('Этот логин уже используется. Выберите другой.');  
      } else {  
        // Сохраняем логин и пароль  
        localStorage.setItem(`password_${username}`, password);  
        // Переход к приложению после успешной регистрации  
        onLogin(username, password);  
      }  
    } else {  
      setErrorMessage('Введите логин и пароль.');  
    }  
  };

  const handleSwitchMode = () => {  
    setIsRegistering((prev) => !prev);  
    setErrorMessage('');  
  };  

  return (  
    <div className="auth-form" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>  
      <h2 style={{ color: 'black',  fontSize: '26px',  marginTop: '30px' }}>{isRegistering ? 'Регистрация' : 'Вход'}</h2>  
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
      <div style={{ marginBottom: '10px' }}>  
        <input  
          type="text"  
          placeholder="Логин"  
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          style={{  
            width: '100%',  
            padding: '10px',  
            marginBottom: '10px',  
            border: '1px solid #ccc',  
            borderRadius: '4px',  
          }}  
        />  
        <div style={{ position: 'relative' }}>  
          <input  
            type={showPassword ? 'text' : 'password'}  
            placeholder="Пароль"  
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
            style={{  
              width: '100%',  
              padding: '10px',  
              border: '1px solid #ccc',  
              borderRadius: '4px',  
            }}  
          />  
          <button  
            onClick={() => setShowPassword((prev) => !prev)}  
            style={{  
              position: 'absolute',  
              right: '10px',  
              top: '50%',  
              transform: 'translateY(-50%)',  
              background: 'none',  
              border: 'none',  
              cursor: 'pointer',  
            }}  
          >  
            <img  
              src={showPassword ? '/assets/eyeopen.png' : '/assets/eyeclose.png'}  
              alt={showPassword ? 'Показать пароль' : 'Скрыть пароль'}  
              style={{ width: '20px', height: '20px' }}  
            />  
          </button>  
        </div>  
      </div>  
      <button  
        onClick={isRegistering ? handleRegister : handleLogin}  
        style={{  
          width: '100%',  
          padding: '10px',  
          backgroundColor: '#61dafb',  
          color: 'white',  
          border: 'none',  
          borderRadius: '4px',  
          cursor: 'pointer',  
          marginBottom: '10px',  
        }}  
      >  
        {isRegistering ? 'Зарегистрироваться' : 'Войти'}  
      </button>  
      <button  
        onClick={handleSwitchMode}  
        style={{  
          width: '100%',  
          padding: '10px',  
          backgroundColor: 'transparent',  
          color: '#61dafb',  
          border: '1px solid #61dafb',  
          borderRadius: '4px',  
          cursor: 'pointer',  
        }}  
      >  
        {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}  
      </button>  
    </div>  
  );  
};  

export default AuthForm;  