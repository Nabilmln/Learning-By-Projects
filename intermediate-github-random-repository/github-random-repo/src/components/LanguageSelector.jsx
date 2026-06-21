import { languages } from '../data/language'


function LanguageSelector({ language, setLanguage}) {
    return (
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">select a language</option>

        {languages.map((lang) => (
            <option option key={lang} value={lang}>
                {lang}
            </option>
        ))}
    </select>
    );
}

export default LanguageSelector;