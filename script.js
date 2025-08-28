const myLibrary = [
    new Book("HarryPotter","J.K.ROWLING",250,true),
    new Book("To Kill A Mocking Bird","HarperLee",281,false),
];

function Book(title,author,pages,isRead){

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

function addBookToLibrary(title,author,pages,isRead){

    const newBook = new Book(title,author,pages,isRead);

    myLibrary.push(newBook);

}

const BooksContainer = document.querySelector(".books-container");

function displayBooks(){

    myLibrary.forEach(book => {
        
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        const title = document.createElement("h2");
        const author = document.createElement("h3");
        const pages = document.createElement("h3");
        const isRead = document.createElement("h3");
        const removeButton = document.createElement("button");
        const updateStatus = document.createElement("button");

        title.textContent = `Title : ${book.title}`;
        author.textContent = `Author : ${book.author}`;
        pages.textContent = `Pages : ${book.pages}`;
        removeButton.textContent = "Remove Book";
        updateStatus.textContent = "Update Status"

        const status = book.isRead === true ? "Read" : "Not Read";
        isRead.textContent = `Status : ${status}`;

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(isRead);
        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(updateStatus);

        removeButton.addEventListener("click", () => {

            const target = myLibrary.findIndex(bk => bk.id === book.id);

            myLibrary.splice(target, 1);
            BooksContainer.innerHTML = "";
            displayBooks();

        })

        updateStatus.addEventListener("click", () => {

            book.isRead = book.isRead === true ? false : true;
            let status = book.isRead ? "Read" : "Not Read";
            isRead.textContent = `Status : ${status}`
            
        })

        BooksContainer.appendChild(bookDiv);
    })
}

const dialog = document.querySelector(".dialog");
const addButton = document.querySelector(".add-button");
const submitButton = document.querySelector(".submit");

addButton.addEventListener('click', () => {
    dialog.showModal();
});

let title = "";
let author = "";
let pages;
let isRead;

submitButton.addEventListener('click', (event) => {
    
    event.preventDefault();

    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;
    isRead = document.getElementById("status").checked;

    addBookToLibrary(title,author,pages,isRead);

    dialog.close();

    BooksContainer.innerHTML = "";

    displayBooks();

});


displayBooks();