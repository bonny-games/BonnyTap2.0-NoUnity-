import { questionsData } from '../../../JS/questions-data.js';
import { popupData } from './popup-data.js';

const LSThemeOfQuestions = localStorage.getItem('themeOfQuestions');
const LSNumberOfQuestion = localStorage.getItem('questionNumber');

const question = questionsData[LSThemeOfQuestions][LSNumberOfQuestion];

localStorage.setItem('question', JSON.stringify(question));

const container = document.querySelector('.container');

const questionPage = `
  <header class="header">
    <div class="header__main">
      <h1 class="header__title">QUESTION ${question.id}</h1>
      <a href="/pages/Learn/Learn-page-questions.html" class="close-icon">
        <img src="/images/close-icon.png" alt="close icon" />
      </a>
    </div>
  </header>
  <main class="main">
    <div class="question">
      <p class="question-text">
        ${question.questionTitle}
      </p>
      <img src="/images/question-image.png" alt="Question image">
    </div>
    <ul class="answers">
      ${question.answers
        .map((answer, index) => {
          return `
            <a href="#" class="link answer-link" data-answer-index="${index + 1}">
              <li class="list-item" data-question-id="question${index + 1}">
                <div class="list-info">
                  <span class="list-item__order">${index + 1}</span>
                  <span class="list-item__title">${answer}</span>
                </div>
              </li>
            </a>
          `;
        })
        .join('')}
    </ul>
  </main>
`;

container.insertAdjacentHTML('beforeend', questionPage);

const answersList = document.querySelector('.answers');

answersList.addEventListener('click', (event) => {
  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

  const userAnswer = listItem.querySelector('.list-item__title').textContent;

  const key = userAnswer === question.correctAnswer ? 'correct' : 'incorrect';
  const popupDataEntry = popupData[key];

  const popupHTML = `
    <div class="popup">
      ${
        key === 'correct'
          ? `
        <div class="reward">
          <span class="plus-sign">+</span>
          <img src="${popupDataEntry.coinImg}" alt="coin icon">
          <span>5.300</span>
        </div>`
          : ''
      }
      <p class="reward-text">${popupDataEntry.text}</p>
      <a href="/pages/Learn/Learn-page-questions.html" class="btn btn-claim-rewards">${popupDataEntry.btnText}</a>
    </div>
  `;

  container.insertAdjacentHTML('afterend', popupHTML);

  localStorage.setItem('userAnswer', userAnswer);
});