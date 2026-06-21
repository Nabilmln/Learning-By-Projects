import {useState} from 'react'
import './App.css';
import LanguageSelector from './components/LanguageSelector';


function App() {
  const [language, setLanguage] = useState('');

  function LanguageSelector({ language, setLanguage}){
    <select 
      value={language} 
      onChange={(e) => setLanguage(e.target.value)}
    ></select>
  }



  return(
  <div>
    <h1>Github Random Repository</h1>
    <LanguageSelector 
      langunage={language}
      setLanguage={setLanguage}
    />
  </div>

  // <p>
  //   selected language: {language}
  // </p>
  );
}

export default App;