const closeButton = document.getElementById('close-button');
const submitButton = document.getElementById('submit-button');
const addWatchListButton = document.getElementById('add-button');
const mainContainer = document.getElementById('main-container');
const addBox = document.getElementById('pop-up-window-container');
const name = document.getElementById('name');
const domain = document.getElementById('domain');
const watchList = document.getElementById('watch-list');
let watchListData = new Map();
var flag ;
let deleteButtonHtml = `<button class="trash-button"><i class="fa fa-trash"></i></button>`;

addWatchListButton.addEventListener('click', () => { 
    mainContainer.style.opacity = 0.2;
    addBox.style.display = 'block';
    name.value = '';
    domain.value = '';
});

closeButton.addEventListener('click', () => {
    mainContainer.style.opacity = 1;
    addBox.style.display = 'none';
});

submitButton.addEventListener('click', addNewWatchlist);
submitButton.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        addNewWatchlist();
    }
});

function addNewWatchlist () {
    let inputName = name.value;
    let inputDomain = domain.value;
    if (!(watchListData.has(inputName))) {
        let value = [inputDomain, '00:00:00'];
        watchListData.set(inputName, value);
        let updatedHtml = getListHtml(watchListData);
        watchList.innerHTML = updatedHtml;
        mainContainer.style.opacity = 1;
        addBox.style.display = 'none';
        updateDeleteButtonModel();
        updateTestButtonModel();
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
    if (watchListData.size >= 5) {
        addWatchListButton.disabled = true;
    }
}   

function getListHtml(watchListData) {
    let html_info = '<tr><th>Name</th><th>Domain</th><th>Duration</th><th>Remove</th><th>Stop Watch</th></tr>';
    for (let [key, pair] of watchListData) {
        let eachDomain = pair[0];
        let timeDuration = pair[1];
        let eachLine = `<tr class=${key}><td>${key}</td><td>${eachDomain}</td>` + 
                       `<td id="${eachDomain}-time">${timeDuration}</td>` + 
                       `<td>${deleteButtonHtml}</td>` +
                       "<td><button class='toggle-button'>Start</button></td>";
        html_info += eachLine;
    }
    return html_info;
}

function updateDeleteButtonModel () {
    var deleteButtons = document.getElementsByClassName('trash-button');
    for (let item of deleteButtons) {
        item.addEventListener('click', deleteButtonFunc);
    }
}

function deleteButtonFunc(e) {
    let selectedElement = e.currentTarget;
    debugger;
    let websiteName = selectedElement.parentElement.parentElement.className
    selectedElement.parentElement.parentElement.remove();
    watchListData.delete(websiteName);
    if (watchListData.size < 5) {
        addWatchListButton.disabled = false;
    }
}

// add the timer in 
function startTimer(domainName) {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    function timer() {
        seconds ++;
        if (seconds === 60) {
            seconds = 0;
            minutes ++;
            if (minutes === 60) {
                minutes = 0;
                hours ++;
            }
        }
        let displaySeconds = getDisplay(seconds);
        let displayMinutes = getDisplay(minutes);
        let displayHours = getDisplay(hours); 
        let timerHtml = displayHours + ':' + displayMinutes + ':' + displaySeconds;
        let item = document.getElementById(`${domainName}-time`)
        item.innerHTML = timerHtml;
    }
    flag = window.setInterval(timer, 1000);
}

function getDisplay(timeVal) {
    let result = timeVal.toString();
    if (timeVal < 10) {
        result = '0' + result; 
    }
    return result
}

function updateTestButtonModel() {
    var toggleButtons = document.getElementsByClassName('toggle-button');
    for (let item of toggleButtons) {
        item.addEventListener('click', (e) => {
            let selectedElement = e.currentTarget;
            let buttonText = selectedElement.innerText;
            if (buttonText === 'Start') {
                let selectedClassName = selectedElement.parentElement.parentElement.className;
                let domainname = watchListData.get(selectedClassName)[0];
                startTimer(domainname);
                selectedElement.innerText = 'Stop';
            } else {
                clearInterval(flag);
            }
             
        });
    }
}
