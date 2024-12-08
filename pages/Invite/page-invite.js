import { getUserInfo, getRefferalLink, getRefferals } from '../../../JS/API.js';

const userInfo = await getUserInfo();
const refLink = await getRefferalLink();
const refferals = await getRefferals();
// console.log(refferals);


document
  .querySelector("body > div > header > div.header__top-bar.top-bar > div > span")
  .innerHTML = userInfo.coins;



document.querySelector("body > div > main > h1").innerHTML = refferals.length + ' FRIENDS';




const inviteElement = `

<li class="list-item">
    <div class="user-info">
      <span class="list-item__order">NUMBER</span>
      <span class="list-item__title">NAME</span>
    </div>
    <div class="coins">
      <img src="/images/coin.png" alt="Coin Icon" />
      <span>+ 2 500</span>
    </div>
  </li>

`

for (let num = 1; num <= refferals.length; num++) {
  let insertElement = inviteElement.replace("NUMBER", num);
  insertElement = insertElement.replace("NAME", refferals[num - 1]);

  document.querySelector("body > div > main > div.invited > ul").innerHTML += insertElement;
}





document.querySelector("body > div > main > div.referral > a.copy")
  .addEventListener('click', async function () {
    try {
      // Check clipboard write permission
      const permission = await navigator.permissions.query({ name: 'clipboard-write' });

      if (permission.state === 'granted' || permission.state === 'prompt') {
        const text = refLink;
        await navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
      } else {
        alert('Clipboard permission denied. Please grant permission to copy text.');
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('An error occurred while copying the text.');
    }
  });