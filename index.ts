// Import stylesheets
//import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform');

const BASEURL =
    'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DEFINEDIV = document.getElementById('definitions');



form.onsubmit = () => {
  const formData = new FormData(form!);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log("on submit", text);
  const element = document.getElementById('worddefined');

  if (element){
    element.textContent = text;
  }

  DEFINEDIV!.innerHTML = '';
    fetchWordDefinitions(text)
        .then(defintions => {
            defintions.forEach(d => {
                DEFINEDIV!.innerHTML += `<p>${d}</p>`;
            });
        })
        .catch(_ => {
            DEFINEDIV!.innerHTML += `<p>Error: Unable to find any defintions for ${text}.</p>`;
        });
  return false; // prevent reload
};

const fetchWordDefinitions = async text => {
    const response = await fetch(BASEURL + text);
    const json = await response.json();
    return json[0].meanings
        .flatMap(m => m.definitions)
        .flatMap(d => d.definition);
};
