import { questionsData } from '../../../JS/questions-data.js';

const typesQuestions = document.querySelector('.blocks-questions');

typesQuestions?.addEventListener('click', (event) => {
  const themeOfQuestions = event.target.textContent.trim();
  const questions = questionsData[themeOfQuestions];

  localStorage.setItem('themeOfQuestions', themeOfQuestions);

  if (!questions) {
    return;
  }
});
