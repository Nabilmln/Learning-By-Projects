import { languages } from '../data/language'


function LanguageSelector(){
    return(
        <select>
            <option value="">
                select a language
            </option>

            {languages.map((lang) => (
                <option key={lang} value={lang}>
                    {lang}
                </option>
            ))}
        </select>
    );
}

export default LanguageSelector;