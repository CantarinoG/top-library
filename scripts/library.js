let bookList = [];

let currentBook = null;

const form = document.querySelector("#add > div.offcanvas-body > form");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const readField = document.querySelector("#add > div.offcanvas-body > form > div.form-check.mb-3 > label > input");
const tBody = document.querySelector("body > main > div > table > tbody");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function getInfoFromForm() {
    let title = titleField.value;
    let author = authorField.value;
    let pages = pagesField.value;
    let read = readField.checked;
    currentBook = new Book(title, author, pages, read);
}

function addBookToLibrary() {
    getInfoFromForm();
    bookList.push(currentBook);
}

function clearForm() {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
    readField.checked = false;
}

function renderTable() {
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

function deleteBook(title) {
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].title === title) {
            bookList.splice(i, 1);
            break;
        }
    }
    renderTable();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    renderTable();
});