import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

if ('serviceWorker' in navigator) {
  console.log('sw--1', navigator.serviceWorker);
  navigator.serviceWorker
    .register('/sw1.js', { scope: '/' })
    .then(function (registration) {
      console.log(
        '[1-register]Service Worker registered with scope:',
        registration.scope
      );
    })
    .catch(function (error) {
      console.error('[1-failed]Service Worker registration failed:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
