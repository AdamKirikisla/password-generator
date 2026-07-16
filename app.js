const form = document.querySelector('form');

// Copy Button
let currentPassword = '';


//Range Logic
const rangeString = document.querySelector('#passLen');

let range = Number(rangeString.value);


rangeString.addEventListener('input', e => {
    range = Number(rangeString.value);


    // Length Display
    let pLength = document.querySelector('#pLen');
    pLength.textContent = range;

})


// Forms Logic
form.addEventListener('submit', e => {
    e.preventDefault();


    // Characters Array

    // Length 26
    const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // Length 26
    const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // Length 10
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Length 14
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+'];

    // Checkbox Logic
    const box1 = document.querySelector('#uppercase');
    const box2 = document.querySelector('#lowercase');
    const box3 = document.querySelector('#numbers');
    const box4 = document.querySelector('#symbols');

    // Add Options to an Array
    const checkboxArr = [];

    let points = range; // For Score

    //Checkbox Checked 
    if (box1.checked) {
        checkboxArr.push(...uppercase);
        points++;
    }
    if (box2.checked) {
        checkboxArr.push(...lowercase);
        points++;
    }
    if (box3.checked) {
        checkboxArr.push(...numbers);
        points++;
    }
    if (box4.checked) {
        checkboxArr.push(...symbols);
        points++;
    }


    // Method for Random Index
    const randomIndex = i => Math.floor(Math.random() * i);

    const passwordArrayString = [];

    function test(range) {
        for (let i = 1; i <= range; i++) {
            passwordArrayString.push(checkboxArr[randomIndex(checkboxArr.length)]);
        }


    }



    test(range); // Call function
    const passwordString = passwordArrayString.join(''); //turn array of characters into one string

    currentPassword = passwordString; // save the raw string for the copy button

    // Password Display
    const password = document.querySelector('#password');
    password.textContent = 'Password: ' + passwordString;

    // Common scoring factors
    let strength = document.querySelector('#strengthText');

    if (passwordString === '') {
        strength.textContent = 'Password nonexistant';
    }
    else if (points < 8) {
        strength.textContent = 'weak';
    }

    else if (points > 8 && points < 12) {
        strength.textContent = 'good';
    }

    else if (points >= 12) {
        strength.textContent = 'strong';
    }




}) // forms ends

// Copy Button Logic 
const copyBtn = document.querySelector('#copyBtn');
copyBtn.addEventListener('click', () => {
    if (currentPassword === '') return; // nothing to copy yet

    navigator.clipboard.writeText(currentPassword).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 1500);
    });
});