// script.js 
document.addEventListener('DOMContentLoaded', () => { 
const form = document.getElementById('registrationForm'); 
const steps = document.querySelectorAll('.form-step'); 
const nextButtons = document.querySelectorAll('.next-btn'); 
const prevButtons = document.querySelectorAll('.prev-btn'); 
const progress = document.getElementById('progress'); 
const stepIndicators = document.querySelectorAll('.step');
let currentStep = 0;

// Hantera nästa-knappar
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            steps[currentStep].style.display = 'none';
            currentStep++;
            steps[currentStep].style.display = 'block';
            updateProgress();
        }
    });
});

// Validera ett steg
function validateStep(step) {
    let isValid = true;
    const inputs = steps[step].querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            setError(input, 'Detta fält är obligatoriskt');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            setError(input, 'Ange en giltig e-postadress');
            isValid = false;
        } else {
            clearError(input);
        }
    });
    
    return isValid;
}

// Validera e-postadress
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Visa felmeddelande
function setError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.style.borderColor = '#d32f2f';
}

// Ta bort felmeddelande
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.style.borderColor = '#ddd';
}

// Uppdatera progressindikatorn function updateProgress() { const percent = (currentStep / (steps.length - 1)) * 100; progress.style.width = `${percent}%`;
    // Uppdatera stegindikatorerna
    stepIndicators.forEach((step, idx) => {
        if (idx <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Hantera föregående-knappar
prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        steps[currentStep].style.display = 'none';
        currentStep--;
        steps[currentStep].style.display = 'block';
        updateProgress();
    });
});

// Realtidsvalidering när användaren lämnar ett fält
const inputs = document.querySelectorAll('input, select');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            setError(input, 'Detta fält är obligatoriskt');
        } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
            setError(input, 'Ange en giltig e-postadress');
        } else if (input.type === 'tel' && input.value.trim() && !validatePhone(input.value)) {
            setError(input, 'Ange ett giltigt telefonnummer');
        } else {
            clearError(input);
        }
    });
});

// Validera telefonnummer
function validatePhone(phone) {
    // Enkel validering för svenska telefonnummer
    const re = /^(?:\+?46|0)[\s\-]?[0-9]{1,3}[\s\-]?[0-9]{5,8}$/;
    return re.test(phone);
}

// Spara formulärdata i localStorage
function saveFormData() {
    const formData = {};
    const formElements = form.querySelectorAll('input, select');
    
    formElements.forEach(element => {
        if (element.name) {
            formData[element.name] = element.value;
        }
    });
    
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Ladda sparad formulärdata från localStorage
function loadFormData() {
    const savedData = localStorage.getItem('formData');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        const formElements = form.querySelectorAll('input, select');
        
        formElements.forEach(element => {
            if (element.name && formData[element.name]) {
                element.value = formData[element.name];
            }
        });
    }
}

// Spara data när användaren ändrar något
form.addEventListener('input', saveFormData);

// Ladda sparad data när sidan laddas
loadFormData();

});