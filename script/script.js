const validName = document.querySelector('.validationName')
const validLastName = document.querySelector('.validationLastName')
const validPass = document.querySelector('.validationPass')
const validEmail = document.querySelector('.validationEmail')
const validUserName = document.querySelector('.validationUserName')

const fname = document.getElementById('inputFirstName')
const lastName = document.getElementById('inputLastName')
const userName = document.getElementById('inputUserName')
const pass = document.getElementById('inputPass')
const email = document.getElementById('inputEmail')

function validateInput(e, valid){
    const input = e.target;
    const value = input.value.trim();
    
    if (input === fname || input === lastName) {
        const isNumber = !isNaN(value) && value !== '';
        valid.style.display = isNumber ? 'block' : 'none';
        return !isNumber;
    }
    
    if (input === userName) {
        const isValidUsername = value.length >= 3;
        valid.style.display = isValidUsername ? 'none' : 'block';
        return isValidUsername;
    }

    if (input === pass) {
        const isValidPass = value.length >= 5;
        valid.style.display = isValidPass ? 'none' : 'block';
        return isValidPass;
    }
    
    if (input === email) {
        const isValidEmail = value.endsWith('@email.com');
        valid.style.display = !isValidEmail ? 'block' : 'none';
        return isValidEmail;
    }

    return true;
}

function validateForm() {
    // Check if all fields have values
    if (!fname.value.trim() || !lastName.value.trim() || 
        !userName.value.trim() || !pass.value.trim() || 
        !email.value.trim()) {
        alert('All fields must be filled');
        return false;
    }

    // Username length check
    if (userName.value.trim().length < 3) {
        alert('Username must be at least 3 characters');
        return false;
    }

    // Password check
    if (pass.value.trim().length < 5) {
        alert('Password must be at least 5 characters');
        return false;
    }

    // Email check
    if (!email.value.trim().endsWith('@email.com')) {
        alert('Email must end with @email.com');
        return false;
    }

    // Name checks
    if (!isNaN(fname.value.trim()) || !isNaN(lastName.value.trim())) {
        alert('First name and last name cannot contain only numbers');
        return false;
    }

    return true;
}

function submit(e){
    e.preventDefault(); 

    const isValid = validateForm();
    if(isValid){
        const userData = {
            firstName: fname.value.trim(),
            lastName: lastName.value.trim(),
            userName: userName.value.trim(),
            email: email.value.trim(),
            password: pass.value.trim()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = '../location/index.html';
    } else {
        alert('Please fill in all fields correctly');
    }
}

fname.addEventListener('input', (e) => validateInput(e, validName))
lastName.addEventListener('input', (e) => validateInput(e, validLastName))
pass.addEventListener('input', (e) => validateInput(e, validPass))
email.addEventListener('input', (e) => validateInput(e, validEmail))
userName.addEventListener('input', (e) => validateInput(e, validUserName))
document.getElementById('btn').addEventListener('click', submit)

// Redirect if user is already logged in
if (window.location.pathname.includes('index.html')) {
    const existingUser = localStorage.getItem('userData');
    if (existingUser) {
        window.location.href = './location/index.html';
    }
}
