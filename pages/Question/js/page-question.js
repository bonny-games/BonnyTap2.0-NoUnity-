import { loadData } from '../../../JS/loadData.js';

const LSThemeOfQuestions = localStorage.getItem('themeOfQuestions');
const LSNumberOfQuestion = localStorage.getItem('questionNumber');
const selectedLang = localStorage.getItem('selectedLang') || 'en';

const data = await loadData(selectedLang);

if (
  !data ||
  !data[LSThemeOfQuestions] ||
  !data[LSThemeOfQuestions][LSNumberOfQuestion]
) {
  throw new Error('Data or question missing');
}

const question = data[LSThemeOfQuestions][LSNumberOfQuestion];
localStorage.setItem('question', JSON.stringify(question));

const container = document.querySelector('.container');
if (!container) {
  throw new Error('.container element not found');
}

const questionPage = `
  <header class="header">
    <div class="header__main">
      <h1 class="header__title">${question.title} ${question.id}</h1>
      <a href="/pages/Learn/Learn-page-questions.html" class="close-icon">
        <img src="/images/close-icon.png" alt="close icon" />
      </a>
    </div>
  </header>
  <main class="main">
    <div class="question">
      <div class="question-content">
        <p class="question-text">${question.questionTitle}</p>
        <img src="/images/question-image.png" alt="Question image">
      </div>
    </div>
    <ul class="answers">
      ${question.answers
        .map(
          (answer, index) => `
        <a href="#" class="link answer-link" data-answer-index="${index + 1}">
          <li class="list-item" data-question-id="question${index + 1}">
            <div class="list-info">
              <span class="list-item__order">${index + 1}</span>
              <span class="list-item__title">${answer}</span>
            </div>
          </li>
        </a>
      `,
        )
        .join('')}
    </ul>
  </main>
`;

container.insertAdjacentHTML('beforeend', questionPage);

// Делегирование события для клика по ответу
container.addEventListener('click', (event) => {
  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

  const userAnswer = listItem.querySelector('.list-item__title').textContent;
  const key = userAnswer === question.correctAnswer ? 'correct' : 'incorrect';
  const popupDataEntry = data.popup[key];

  const popupHTML = `
    <div class="popup">
      ${
        key === 'correct'
          ? `
        <div class="reward">
          <span class="plus-sign">+</span>
          <img src="${popupDataEntry.coinImg}" alt="coin icon">
          <span>5.300</span>
        </div>
      `
          : ''
      }
      <p class="reward-text">${popupDataEntry.text}</p>
      <a href="/pages/Learn/Learn-page-questions.html" class="btn btn-claim-rewards">${popupDataEntry.btnText}</a>
    </div>
  `;

  container.insertAdjacentHTML('afterend', popupHTML);
  container.classList.add('disabled');

  const popup = document.querySelector('.popup');
  if (popup) {
    setTimeout(() => popup.classList.add('show'), 10);
  }

  localStorage.setItem('userAnswer', userAnswer);
});
