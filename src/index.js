// Entry point: renders the App component into the root div in public/index.html
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, add a web-vitals
// reporter here. The project previously included a reportWebVitals helper.
