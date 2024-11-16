import { questionsData } from '../../../JS/questions-data.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeOfQuestions = localStorage.getItem('themeOfQuestions');
  const LSquestions = questionsData[themeOfQuestions];

  displayQuestionList(LSquestions);
});

function displayQuestionList(questions) {
  const questionListHTML = `
    <ul class="question-list">
      ${Object.entries(questions)
        .map(([key, question], index) => {
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
        })
        .join('')}
    </ul>
  `;

  const main = document.querySelector('.main');
  main.innerHTML = questionListHTML;

  const questionList = document.querySelector('.question-list');

  if (questionList) {
    questionList.addEventListener('click', (event) => {
      const questionNumber = event.target.closest('.list-item')?.dataset.id;
      const questionTitle = event.target.textContent;

      localStorage.setItem('questionNumber', questionNumber);
      localStorage.setItem('questionTitle', questionTitle);
    });
  } else {
    console.error('question-list not found');
  }

  const question = JSON.parse(localStorage.getItem('question'));
  const questionNumber = localStorage.getItem('questionNumber');
  const userAnswer = localStorage.getItem('userAnswer');

  if (question?.correctAnswer === userAnswer) {
    document
      .querySelector(`[data-id="${questionNumber}"]`)
      ?.classList.add('correct');
    document
      .querySelector(`[data-id="${questionNumber}"]`)
      ?.classList.add('disabled');
  } else {
    document
      .querySelector(`[data-id="${questionNumber}"]`)
      ?.classList.add('incorrect');
    document
      .querySelector(`[data-id="${questionNumber}"]`)
      ?.classList.add('disabled');
  }
}
