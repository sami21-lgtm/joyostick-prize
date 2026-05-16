// DOM Elements Selection
const dots = document.querySelectorAll('.color-dot');
const mainCard = document.getElementById('mainCard');
const mainImage = document.getElementById('mainImage');
const mainTitle = document.getElementById('mainTitle');
const displayPrice = document.getElementById('displayPrice');
const oldPrice = document.getElementById('oldPrice');
const joystickCheckbox = document.getElementById('joystickCheckbox');

// Background Theme Colors configuration
const themeBgColors = {
    blue: '#142233',
    red: '#331414',
    gold: '#332a14',
    green: '#14331f',
    white: '#25282c'
};

let currentBasePrice = 6500;

// Update final calculated price safely
function updatePrice() {
    let finalPrice = currentBasePrice;
    if (joystickCheckbox.checked) {
        finalPrice += parseInt(joystickCheckbox.getAttribute('data-addon-value'));
    }
    // Localized formatting for Bangladesh Currency output
    displayPrice.textContent = finalPrice.toLocaleString('bn-BD');
}

// Handle Color Switch
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        // Active Class Control
        dots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');

        // Extract Data Properties from Selected Variant
        const color = this.getAttribute('data-color');
        const imgUrl = this.getAttribute('data-img');
        const titleText = this.getAttribute('data-title');
        currentBasePrice = parseInt(this.getAttribute('data-price'));
        const originalPrice = parseInt(this.getAttribute('data-old'));

        // Apply visual zoom feedback smoothly
        mainImage.classList.add('scale-up');
        setTimeout(() => mainImage.classList.remove('scale-up'), 300);

        // Render variations dynamically
        mainImage.src = imgUrl;
        mainTitle.textContent = titleText;
        oldPrice.textContent = '৳' + originalPrice.toLocaleString('bn-BD');
        mainCard.style.backgroundColor = themeBgColors[color];

        updatePrice();
    });
});

// Watch Checkbox changes
joystickCheckbox.addEventListener('change', updatePrice);
