let bookList = []; //Contains all the books

let currentBook = null;

const form = document.querySelector("#add > div.offcanvas-body > form"); //Form element
const titleField = document.querySelector("#title"); //Title field in the form element
const authorField = document.querySelector("#author"); //Author field in the form element
const pagesField = document.querySelector("#pages"); //Pages field in the form element
const readField = document.querySelector("#add > div.offcanvas-body > form > div.form-check.mb-3 > label > input"); //Checkbox field in the form element
const tBody = document.querySelector("body > main > div > table > tbody"); //Table body where the list of books is rendered

class Book { //Book class

    constructor(title, author, pages, read) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._read = read;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get pages() {
        return this._pages;
    }

    get read() {
        return this._read;
    }
}

function getInfoFromForm() { //Get info from the fields and generate a new book(the currentBook)
    let title = titleField.value;
    let author = authorField.value;
    let pages = pagesField.value;
    let read = readField.checked;
    currentBook = new Book(title, author, pages, read);
}

function addBookToLibrary() { //Add a book to the bookList
    getInfoFromForm();
    bookList.push(currentBook);
}

function clearForm() { //Clear the form
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
    readField.checked = false;
}

function renderTable() { //Render the table
    tBody.innerHTML = "";
    for (let i = 0; i < bookList.length; i++) {
        let book = bookList[i];
        let text = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td><input class="form-check-input" type="checkbox"`

        if (book.read) {
            text += ' checked'
        }

        text += `></td>
                <td><button onclick="deleteBook('${book.title}')" type="button" class="btn btn-danger btn-sm">
                            <img src="icons/delete.svg" alt="Delete Icon"> 
                        </button></td>
                    </tr>`;

        tBody.innerHTML += text;

    }

}

function deleteBook(title) { //delete book: the book with the title will be removed from the list and the table will be rendered again
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].title === title) {
            bookList.splice(i, 1);
            break;
        }
    }
    renderTable();
}

form.addEventListener("submit", (e) => { //Change what happens when the form is submitted: Add book to the list, clear the form and render the table
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    renderTable();
});