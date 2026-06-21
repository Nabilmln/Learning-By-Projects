import {useState} from 'react'
import './App.css';
import LanguageSelector from './components/LanguageSelector';
// import { languages } from './data/language';


function App() {
  const [language, setLanguage] = useState('');
  const [repo, setRepo] = useState(null);

  const fetchRepo = async () => {
    // console.log(language);

    if(!language) return;
    
    try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=Q`,
    );
    const data = await response.json();
    // console.log(data);
    setRepo(data.items[0]);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }


  return (
    <div>
      <h1>Github Random Repository</h1>
      <LanguageSelector langunage={language} setLanguage={setLanguage} />
      <p>selected language: {language}</p>

      <button onClick={fetchRepo}>fetch repo</button>
      {repo && (
        <div>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>⭐ {repo.stargazers_count}</p>
          <p>🍴 {repo.forks_count}</p>
          <p>🐛 {repo.open_issues_count}</p>
        </div>
      )}
    </div>
  );
}

export default App;