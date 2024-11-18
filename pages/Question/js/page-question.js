import { questionsData } from '../../../JS/questions-data.js';

const LSThemeOfQuestions = localStorage.getItem('themeOfQuestions');
const LSNumberOfQuestion = localStorage.getItem('questionNumber');

const question = questionsData[LSThemeOfQuestions][LSNumberOfQuestion];

localStorage.setItem('question', JSON.stringify(question));

const content = document.querySelector('.content');

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
            <a href="/pages/Learn/Learn-page-questions.html" class="link answer-link" data-answer-index="${index + 1}">
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

content.insertAdjacentHTML('beforeend', questionPage);

const answersList = document.querySelector('.answers');

answersList.addEventListener('click', (event) => {
  const userAnswer = event.target
    .closest('.list-item')
    .querySelector('.list-item__title').textContent;

  localStorage.setItem('userAnswer', userAnswer);
});
