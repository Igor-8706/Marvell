import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './components/app/App';
// import MarvelService from './services/MarvelService';
import './style/style.scss';

// // Для работы с классом нужно создать его экземпляр
// const marvelService = new MarvelService();

// // из метода возращается промис, поэтому then
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
      <App />
  );


// для 17 версии реакт -->
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

