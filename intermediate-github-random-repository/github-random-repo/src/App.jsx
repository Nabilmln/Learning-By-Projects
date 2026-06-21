import {useState} from 'react'
import './App.css';
import LanguageSelector from './components/LanguageSelector';
import RepositoryCard from './components/RepositoryCard';
// import { languages } from './data/language';


function App() {
  const [language, setLanguage] = useState('');
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchRepo = async () => {
    // console.log(language);

    if(!language) return;
    
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.github.com/search/repositories?q=Q`,
      );
      
      const data = await response.json();
      // console.log(data);
      const repos = data.items;
      const randomIndex = Math.floor(Math.random() * repos.length);
      setRepo(repos[randomIndex]);

    } catch(error) {
      setError('Error fetching repositories:');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <h1>Github Random Repository</h1>
      <LanguageSelector langunage={language} setLanguage={setLanguage} />
      {!language && (
      <p>
        Please select a programming language
      </p>
      )}
      <p>selected language: {language}</p>

      <button onClick={fetchRepo}>fetch repo</button>
      {loading && (
        <p>Loading...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {repo && (
        <RepositoryCard repo={repo} />
      )}
    </div>
  );
}

export default App;