const closeButton = document.getElementById('close-button');
const submitButton = document.getElementById('submit-button');
const addWatchListButton = document.getElementsByClassName('add-button');
const mainContainer = document.getElementById('main-container');
const addBox = document.getElementsByClassName('pop-up-window-container');

addWatchListButton.addEventListener('click', () => { 
    mainContainer.style.opacity = 0.2;
    addBox.style.display = 'block';
});
