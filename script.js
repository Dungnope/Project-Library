const myLibrary = [];
const btn = document.querySelector("button");
function Book(author, title, pages, read) {
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.id = crypto.randomUUID();
    this.readyet = function() {
        if(read !== "") return `You read it`;
        else return 'You not read it';
    }
};

function addBookToLibrary()
{
    const newElement = document.createElement("div");
    const author = window.prompt("Author?");
    const title = window.prompt("Title of the book?");
    const pages = window.prompt("How many pages the book has?");
    const read = window.prompt("Have you ever read this book?, skip if you didn't read");
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
    const areread = book.readyet();
    for(props in book)
    {
        if(book.hasOwnProperty(props))
        {
            newElement.innerHTML += props + ": " + book[props] + "<br>";
        }
    }
    newElement.style.marginTop = "20px";
    document.body.append(newElement);
}
btn.addEventListener("click", addBookToLibrary);