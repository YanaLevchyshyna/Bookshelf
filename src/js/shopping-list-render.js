import { removeFromLocalStorage } from './pop-up-book';
import amazon from '../images/stores/amazon.png';
import amazon2x from '../images/stores/amazon@2x.png';
import bookStore from '../images/stores/book.png';
import bookStore2x from '../images/stores/book@2x.png';
import bookShop from '../images/stores/book-shop.png';
import bookShop2x from '../images/stores/book-shop@2x.png';
import sprite from '../images/sprite.svg';
import { Notify } from 'notiflix';

const optionsNotiflix = {
  width: '300px',
  position: 'center-top',
  borderRadius: '25px',
};

const refs = {
  shoppingListEl: document.querySelector('.shopping-list'),
  removeBookBtn: document.querySelector('.sh-list-delete-btn'),
  emptyShoppinglistEl: document.querySelector('.empty-sh-list'),
};

const STORAGE_KEY = 'shopping-list';
const shoppingListArray = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

let defaultDescription;
let defaultBookImage;

function changeToDefaultDescription(description) {
  if (description === '') {
    defaultDescription = `<p class="sh-book-description">Unfortunately, 
      there is no description for this book</p>`;
  } else {
    defaultDescription = `<p class="sh-book-description">${description}</p>`;
  }
  return defaultDescription;
}

function changeToDefaultBookImg(book_image) {
  if (book_image) {
    defaultBookImage = `<img class="sh-book-img" src="${book_image}" alt="Boook image"></img>`;
  } else {
    defaultBookImage = `<div class="sh-default-img width="265" height="198"" style="background-color: #f0f0f0;">
      <svg class="sh-default-svg-icon" >
      <use href="${sprite}#default-book"></use>
    </svg>
    </div>`;
  }
  return defaultBookImage;
}

function renderShoppingList(localBooksArray) {
  if (!localBooksArray.length) {
    refs.emptyShoppinglistEl.style.display = 'block';
    Notify.info(
      'This page is empty, add some books and proceed to order.',
      optionsNotiflix
    );
    return;
  }
  markupShoppingList(localBooksArray);
}

function markupShoppingList(books) {
  const markup = books
    .map(
      ({
        _id,
        book_image,
        title,
        list_name,
        description,
        author,
        buy_links,
      }) => {
        changeToDefaultBookImg(book_image);
        changeToDefaultDescription(description);

        return `
      <li data-value="${_id}" class="shopping-list-item">
          <img class="sh-book-img" src="${book_image}" alt="Boook image"></img>
          <div class="sh-wrap">
              <div class="sh-book-info-wrap">
               <button class="sh-list-delete-btn" type="button" data-value="${_id}">
                    <svg class="sh-list-delete-icon" width="18" height="18"<symbol id="icon-trash" viewBox="0 0 32 32">
                    <path fill="none" stroke="#fff" style="stroke: var(--color1, #fff)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M12 4h8M4 8h24M25.334 8l-0.936 14.026c-0.14 2.104-0.21 3.156-0.664 3.954-0.406 0.703-0.997 1.259-1.709 1.61l-0.023 0.010c-0.826 0.4-1.88 0.4-3.99 0.4h-4.024c-2.11 0-3.164 0-3.99-0.4-0.735-0.361-1.326-0.917-1.722-1.601l-0.010-0.019c-0.454-0.798-0.524-1.85-0.664-3.954l-0.936-14.026M13.334 14v6.666M18.666 14v6.666"></path>
                    </symbol>
                    </svg>
                  </button>
                <h2 class="sh-book-title">${title}</h2>
                <p class="sh-book-category">${list_name}</p>
                <p class="sh-book-description">${defaultDescription}</p>
             </div>
             <div class="sh-book-info-link-wrap">
         <p class="sh-book-author">${author}</p>
         <ul class="shopping-links">
                            <li class="sh-soc-item">
                              <a class="sh-soc-link" href="${buy_links[0].url}" rel="noopener noreferrer nofollow"
            target="_blank"> 
            <img srcset="${amazon} 1x, ${amazon2x} 2x" 
            src="${amazon}" class="amazon-store"
            alt="Amazon Store ${buy_links[0].name}"/>
                              </a>
                            </li>
                            <li class="sh-soc-item">
                              <a class="sh-soc-link" href="${buy_links[1].url}" rel="noopener noreferrer nofollow"
            target="_blank">
                            <img srcset="${bookStore} 1x, ${bookStore2x} 2x" 
                            src="${bookStore}" class="apple-store"
                            alt="Apple Store ${buy_links[1].name}"/>
                             </a>
                            </li>
                           <li class="sh-soc-item">
                          <a class="sh-soc-link" href="${buy_links[4].url}" rel="noopener noreferrer nofollow"
            target="_blank">
            <img srcset="${bookShop} 1x, ${bookShop2x} 2x" 
            src="${bookShop}" class="book-shop"
            alt="Book Shop ${buy_links[4].name}"/>
                         </a>
                       </li>
                      </ul>
      </div>
          </div>
              </li>
           `;
      }
    )
    .join('\n');
  refs.shoppingListEl.insertAdjacentHTML('beforeend', markup);
}

// refs.removeBookBtn.addEventListener('click', onDeleteBookObjectClick);

// function onDeleteBookObjectClick() {
//   shoppingListArray.forEach((bookObj, index) => {
//     if (bookObj._id === index) {
//       shoppingListArray.splice(index, 1);
//     }
//   });
// }

renderShoppingList(shoppingListArray);
