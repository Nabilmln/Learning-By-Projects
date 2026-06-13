const inputTemperature = document.getElementById('temperature');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertBtn = document.getElementById('convert');
const result = document.getElementById('result');

convertBtn.disabled = true;

function checkForm () {
    if (inputTemperature.value !== '' && fromUnit.value !== '' && toUnit.value !== ''){
        convertBtn.disabled = false;
    }
    else {
        convertBtn.disabled = true;
    }
}

inputTemperature.addEventListener('input', checkForm);
fromUnit.addEventListener('change', checkForm);
toUnit.addEventListener('change', checkForm);

convertBtn.addEventListener('click', convertTemperature);

function convertTemperature() {
    const temperature = parseFloat(inputTemperature.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    let celcius;
    let converted;
    // let result;

    if (from === 'celcius') {
        celcius = temperature;
    }
    else if (from === 'fahrenheit') {
        celcius = (temperature - 32) * 5 / 9;
    }
    else if (from === 'kelvin') {
        celcius = temperature - 273.15;
    }

    if (to === 'celcius') {
        converted = celcius;
    }
    else if (to === 'fahrenheit') {
        converted = (celcius * 9 / 5) + 32;
    }
    else if (to === 'kelvin') {
        converted = celcius + 273.15;
    }

    console.log(converted);
    result.innerHTML = `
        <p> ${temperature} ${from} = <strong>${converted.toFixed(2)} ${to}</strong>
        </p>
    `;
}