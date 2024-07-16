const circle = document.querySelector('#circle');
const score = document.querySelector('.score');

function start() {
    setScore(getScore());
    setImage();
}

function setScore(scor) {
    localStorage.setItem('score', scor);
    score.textContent = scor;
}

function setImage() {
    if (getScore()>= 50){
        circle.setAttribute('src',"./assets/bear.png")
    }
}
function getScore() {
    return Number(localStorage.getItem('score')) ?? 0
}
function addOne() {
    setScore(getScore() + 1);
    setImage();
}
circle.addEventListener('click', (event) => {
    const rect = circle.getBoundingClientRect();

    const offfsetX = event.clientX - rect.left - rect.width / 2;
    const offfsetY = event.clientY - rect.top - rect.height / 2;

    const DEG = 40;

    const tiltX = (offfsetY / rect.height) * DEG;
    const tiltY = (offfsetX / rect.width) * -DEG;

    circle.style.setProperty('--tiltX', `${tiltX}deg`);
    circle.style.setProperty('--tiltY', tiltY + 'deg');

    setTimeout(() => {
        circle.style.setProperty('--tiltX', '0deg');
        circle.style.setProperty('--tiltY', '0deg');
    }, 300);

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.innerHTML = '+1';
    plusOne.style.left = `${event.clientX}px`;
    plusOne.style.top = `${event.clientY}px`;

    score.parentElement.appendChild(plusOne);
    addOne();

    setTimeout(() => { plusOne.remove() }, 1000);
});

start();