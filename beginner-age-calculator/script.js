import flatpickr from 'flatpickr'; 
import { DateTime } from 'luxon';

const form = document.getElementById('age-form');
const birthdateInput = document.getElementById('birthdate');
const errorMessage = document.getElementById('error-message');
const result = document.getElementById('result');

flatpickr(birthdateInput, {
    dateFormat: 'Y-m-d',
    maxDate: 'today',
    allowInput: true,
});

function validateBirthdate(dateString) {
    if (!dateString || dateString.trim() === '') {
        return 'Please select your birthdate.';
    }

    const birth = DateTime.fromISO(dateString);

    if (!birth.isValid) {
        return 'Invalid birthdate.';
    }

    if (birth > DateTime.now()) {
        return 'Birthdate cannot be in the future.';
    }

    return null; // valid
}

function calculateAge(birthdateISO) {
    const birth = DateTime.fromISO(birthdateISO);
    const now = DateTime.now();

    const diff = now.diff(birth, ['years', 'months', 'days']).toObject();

    return {
        years: Math.floor(diff.years),
        months: Math.floor(diff.months),
        days: Math.floor(diff.days)
    };
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = birthdateInput.value;
    const error = validateBirthdate(value);

    errorMessage.classList.add('hidden');
    result.classList.add('hidden');

    if (error) {
        errorMessage.textContent = error;
        errorMessage.classList.remove('hidden');
        return;
    }

    const age = calculateAge(value);
    result.innerHTML = `
        You are <strong>${age.years}</strong> years,
        <strong>${age.months}</strong> months, and
        <strong>${age.days}</strong> days old.
    `;
    result.classList.remove('hidden');
});