import { loadData } from '../../../JS/loadData.js';

document.addEventListener('DOMContentLoaded', async () => {
  const selectedLang = localStorage.getItem('selectedLang') || 'en';
  const themeOfQuestions = localStorage.getItem('themeOfQuestions');
  const headerTitle = document.querySelector('.header__title');
  const linkText = document.querySelector('.btn');

  const questionsData = await loadData(selectedLang);

  headerTitle.textContent = questionsData.learn.title;
  linkText.textContent = questionsData.learn.btnText;

  if (!questionsData) {
    console.error(
      'Questions data is missing for the selected language or theme!',
    );
    return;
  }

  const themeQuestions = Object.values(questionsData[themeOfQuestions]).filter(
    (item) => typeof item != 'string',
  );

  renderQuestionList(themeQuestions);
  highlightAnsweredQuestions();
});

function renderQuestionList(questions) {
  const questionListHTML = `
    <ul class="question-list">
      ${Object.entries(questions)
        .map(([key, question], index) =>
          createQuestionItemHTML(question, index),
        )
        .join('')}
    </ul>
  `;

  const main = document.querySelector('.main');
  if (!main) {
    console.error('Main container not found!');
    return;
  }
  main.innerHTML = questionListHTML;

  const questionList = document.querySelector('.question-list');

  questionList
    ? questionList.addEventListener('click', handleQuestionClick)
    : console.error('Question list not found!');
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

  question.correctAnswer === userAnswer
    ? listItem.classList.add('correct')
    : listItem.classList.add('incorrect');

  listItem.closest('.link')?.classList.add('disabled');
}
