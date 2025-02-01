const valid = document.querySelector('.validation')

function submit(e){
    e.preventDefault(); 

    const fname = document.getElementById('inputFirstName').value.trim();
    const lastName = document.getElementById('inputLastName').value.trim();
    const userName = document.getElementById('inputUserName').value.trim();
    const pass = document.getElementById('inputPass').value;
    const email = document.getElementById('inputEmail').value.trim()
    
    // Get values inside the function to ensure fresh values on submit

    
    if (!fname || !lastName || !userName || !pass) {
        alert('Please fill in all fields');
        return;
    }

    if(pass.length < 5){
        valid.style.display = 'block';
    } else {
        valid.style.display = 'none';
        
        // Create user object
        const userData = {
            firstName: fname,
            lastName: lastName,
            userName: userName,
            email: email,
            password: pass
        };
        
        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        console.log('Form submitted and saved:', userData);
    }
}

document.getElementById('btn').addEventListener('click', submit)
