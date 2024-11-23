export async function loadData(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);

    if (!response.ok) throw new Error('Failed to load questions');

    const questionsData = await response.json();
    return questionsData;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}
