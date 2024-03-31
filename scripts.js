//imports data.js
import { authors, books, genres, BOOKS_PER_PAGE } from "./data.js";

/**
 * global variables
 */
let booksPerPage = BOOKS_PER_PAGE;
const genreLocal = genres;
const fragment = document.createDocumentFragment();
let booksToDisplay=[]

let titleFilter = null;
let genreFilter = null;
let authorFilter = null;

/**
 * a list of query selectors from index.html
 */
const HTML = {
  header: {
    search: document.querySelector("[data-header-search]"),
    settings: document.querySelector("[data-header-settings]"),
  },
  list: {
    items: document.querySelector("[data-list-items]"),
    message: document.querySelector("[data-list-message]"),
    button: document.querySelector("[data-list-button]"),
  },

  activeList: {
    preview: document.querySelector("[data-list-blur]"),
    content: document.querySelector(".overlay_content"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
    button: document.querySelector("[data-list-close]"),
  },

  search: {
    overlay: document.querySelector("[data-search-overlay]"),
    title: document.querySelector("[data-search-title]"),
    genre: document.querySelector("[data-search-genres]"),
    author: document.querySelector("[data-search-authors]"),
    searchButton: document.querySelector("[data-search-button]"),
  },
};

/**
 * this updates the list of books that will be displayed based on any filters that have been applied
 * 
 */
const toDisplay = () => {
   
  booksToDisplay=[]

  for (const singleBook of books) {
    const hasMatchingGenre = singleBook.genres.some(
      (genre) => genre === genreFilter
    );

    if (
      (genreFilter === null || hasMatchingGenre) &&
      (titleFilter === null ||
        singleBook.title.toLowerCase().includes(titleFilter.toLowerCase())) &&
      (authorFilter === null || singleBook.author === authorFilter)
    ) {
      booksToDisplay.push(singleBook);
    }
  }

  console.log(booksToDisplay)
};

toDisplay()
const extracted = booksToDisplay.slice(0, booksPerPage);
//need to create an update button function
HTML.list.button.textContent = `Show More (${booksToDisplay.length - booksPerPage})`;

/**
 *
 * this function increases the books per page by 36
 *
 */
const previewMore = (event) => {
  const extract = booksToDisplay.slice(booksPerPage, booksPerPage + 36);
  booksPerPage = booksPerPage + 36;
  addFragment(extract);
  HTML.list.button.textContent = `Show More (${booksToDisplay.length - booksPerPage})`;
};

/**
 * this takes an object called book and creates element with the html for a single
 * book.
 * @param {object} book
 * @returns element
 */
const createPreview = (book) => {
  const { title, image, author, id } = book;
  const element = document.createElement("div");
  const refAuthor = authors[author];
  element.dataset.id = id;
  element.className = "preview";
  element.innerHTML = `
    
    <img src= ${image} class ="preview__image"alt="${title}'s bookcover">
              <div class="list__items">
                 
                 <div class='preview__title'>${title}</div>
                 <div class="preview__author">${refAuthor}</div> 
                 
                 </div>
                 
    `;
  return element;
};
/**
 * this factory function takes a selector from the html as an element
 * and a object to populate that selector
 * @param {Element} element
 * @param {Object} object
 */
const SelectPopulator = (element, object) => {
  for (const item in object) {
    const name = object[item];
    const option = document.createElement("option");
    option.value = item;
    option.textContent = name;
    element.appendChild(option);
  }
};
SelectPopulator(HTML.search.genre, genres);
SelectPopulator(HTML.search.author, authors);

/**
 * this loop goes through all of the books that have been extracted and  uses
 * the factory function create preview to pin them to the book.
 */
const addFragment = (extract) => {
  for (const book of extract) {
    fragment.append(createPreview(book));
  }
  HTML.list.items.appendChild(fragment);
};

addFragment(extracted);


/**
 *
 *  This event toggles the search overlay
 *
 */
const searchOverlay = (event) => {
  if (!HTML.search.overlay.open === true) {
    HTML.search.overlay.open = true;
  } else {
    HTML.search.overlay.open = false;

    HTML.search.genre.addFragment(createGenreOptionsHtml());
  }
};

const filterSearch = (event) => {
  preventDefault();
  const booksAsArray = Object.entries(books);
  console.log(booksAsArray);
};

//     return element
// }
/* matches = books
page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers') */

const cssColors = {
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },

  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
};

// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data-search-genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted.length; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />

//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview

//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         }
//     }

//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title

//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }

/**
 * Event listeners
 */

HTML.list.button.addEventListener("click", previewMore);
HTML.header.search.addEventListener("click", searchOverlay);
HTML.search.searchButton.addEventListener("click", filterSearch);
