import { loadData } from '../../../JS/loadData.js';

document.addEventListener('DOMContentLoaded', async () => {
  const selectedLang = localStorage.getItem('selectedLang') || 'en';
  const themeOfQuestions = localStorage.getItem('themeOfQuestions') || '';
  const questionsData = await loadData(selectedLang);

  if (!questionsData) {
    console.error(
      'Questions data is missing for the selected language or theme!',
    );
    return;
  }

  const {
    learn: { title, btnText },
  } = questionsData;
  updateTextContent('.header__title', title);
  updateTextContent('.btn', btnText);

  const themeQuestions = getThemeQuestions(questionsData, themeOfQuestions);
  renderQuestionList(themeQuestions);
  highlightAnsweredQuestions();
});

function updateTextContent(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = text;
  } else {
    console.error(`Element not found for selector: ${selector}`);
  }
}

function getThemeQuestions(data, theme) {
  const themeQuestions = data[theme];

  if (!themeQuestions) return [];
  return Object.values(themeQuestions).filter(
    (item) => typeof item !== 'string',
  );
}

function renderQuestionList(questions) {
  if (!questions.length) return;

  const questionListHTML = `
    <ul class="question-list">
      ${questions.map((question, index) => createQuestionItemHTML(question, index)).join('')}
    </ul>
  `;

  const main = document.querySelector('.main');
  if (!main) {
    console.error('Main container not found!');
    return;
  }
  main.innerHTML = questionListHTML;

  document
    .querySelector('.question-list')
    ?.addEventListener('click', handleQuestionClick);
}

function createQuestionItemHTML(question, index) {
  return `
    <a href="/pages/Question/Question-page.html" class="link">
      <li class="list-item" data-id="q${index + 1}">
        <div class="list-info">
          <span class="list-item__order">${index + 1}</span>
          <span class="list-item__title">${question.title}</span>
        </div>
        <div class="coins">
          <img src="/images/coin.png" alt="Coin Icon" />
          <span>5.300</span>
        </div>
      </li>
    </a>
  `;
}

function handleQuestionClick(event) {
  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

  const questionNumber = listItem.dataset.id;
  const questionTitle = listItem.querySelector('.list-item__title').textContent;

  localStorage.setItem('questionNumber', questionNumber);
  localStorage.setItem('questionTitle', questionTitle);
}

function highlightAnsweredQuestions() {
  const question = JSON.parse(localStorage.getItem('question'));
  const questionNumber = localStorage.getItem('questionNumber');
  const userAnswer = localStorage.getItem('userAnswer');

  if (!question || !questionNumber || !userAnswer) {
    console.warn('No answered question data found.');
    return;
  }

  const listItem = document.querySelector(`[data-id="${questionNumber}"]`);
  if (!listItem) {
    console.error(`List item with ID "${questionNumber}" not found!`);
    return;
  }

  const classToAdd =
    question.correctAnswer === userAnswer ? 'correct' : 'incorrect';
  listItem.classList.add(classToAdd);
  listItem.closest('.link')?.classList.add('disabled');
}
