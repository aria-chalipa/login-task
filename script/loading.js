function changePage() {
    setTimeout(function() {
        window.location.href = '../content/index.html'; // Change this to your desired page URL
    }, 3000);
}

// Fix: 'load' event should be attached to window object
window.addEventListener('load', changePage);

;