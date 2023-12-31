const idElement = document.querySelector('.card__id > [data-value]');
const adviceElement = document.querySelector('.card__advice');
const buttonElement = document.querySelector('.card__dice');
const diceElement = document.querySelector('.card__dice svg');

const API_URL = 'https://api.adviceslip.com/advice';

buttonElement.addEventListener('click', handleClick);

async function handleClick() {
  diceElement.classList.add('loading');

  try {
    const { id, advice } = await getAdvice();

    idElement.textContent = id;
    adviceElement.textContent = advice;
  } catch (error) {
    console.log(error);
  } finally {
    addAnimationEndListener();
  }
}

function addAnimationEndListener() {
  diceElement.addEventListener('animationiteration', handleAnimationIteration, {
    once: true,
  });
}
function handleAnimationIteration() {
  diceElement.classList.remove('loading');
}

async function getAdvice() {
  const data = await fetch(API_URL);
  const result = await data.json();
  return result.slip;
}
