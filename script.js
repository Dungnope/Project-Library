const container = document.querySelector(".container");
//book detail
let title = document.querySelector("#Book__title");
let author = document.querySelector("#Book__author");
let pages = document.querySelector("#Book__pages");
let readCheck = document.querySelector("#Book__ask");
const Box = document.querySelector(".container__list");
//form
const openBtn = document.querySelector("[data-open-modal]");
const closeBtn = document.querySelector("[data-close-modal]");
const submitBtn = document.querySelector("form button");
const dialog = document.querySelector("dialog");
class Book {
    constructor(author, title, pages, read)
    {
        this.author = author,
        this.title = title,
        this.pages = Number(pages),
        this.id = crypto.randomUUID();
        this.readingStatus = read;
    }

};
if(!localStorage.getItem("books")){
    localStorage.setItem("books", JSON.stringify([new Book("Stan Lee", "Spider Man", 232, false)]));
}

const myLibrary = JSON.parse(localStorage.getItem("books"));

showBook();

window.addEventListener("keydown", (event) => {
    if(event.key === "Enter")
    {
        event.stopPropagation();
    }
})

//form function 
openBtn.addEventListener("click", (event) => {
    author.value = title.value = pages.value = "";
    readCheck.checked = false;
    dialog.showModal();
})

closeBtn.addEventListener("click", (event) => {
    dialog.close();
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    newBook();
    dialog.close();
    showBook();
})

//Create new book
function newBook(){
    const aBook = new Book(author.value, title.value, pages.value, readCheck.checked);
    const bookList = localStorage.getItem("books");
    const bookListArr = JSON.parse(bookList);
    if(bookList){
        bookListArr.push(aBook);
        localStorage.setItem("books", JSON.stringify(bookListArr));
    }
    else{
        localStorage.setItem("books", JSON.stringify([aBook]));
    }
    myLibrary.push(aBook);
}

function removeBook(index){
    myLibrary.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(myLibrary));
    showBook();
}

function statusColor(item, buttonSelect)
{
    buttonSelect.className = '';
    if(item.readingStatus) buttonSelect.classList.add("hadread"), buttonSelect.textContent = `Read`;
    else buttonSelect.classList.add("notread"), buttonSelect.textContent = `Not Read`;
    localStorage.setItem("books", JSON.stringify(myLibrary));
}

function changeProperty(target){
    if(target.readingStatus) target.readingStatus = false;
    else target.readingStatus = true;
}

function takeIndex(item)
{
    return myLibrary.findIndex((e) => {
        if(item.id.includes("delete__"))
        {
            item.id = item.id.replace("delete__", "");
            return item.id === e.id;
        }
        else return item.id === e.id;
    })
}

function checkChildElement(){
    if(myLibrary.length < 1)
    {
        container.style.backgroundColor = `transparent`;
    }
    else {
        container.style.backgroundColor = `#e3e3e333`;
    }
}

function showBook()
{
    checkChildElement();
    const listBook = document.querySelector(".container__list");
    listBook.textContent = "";
    myLibrary.forEach((item) => {
        const aBook = document.createElement("li");
        const readOrNot = item.readingStatus ? "Read" : "Not Read";
        const content = `<img src="./src/img/icon.png" alt="icon__book" width="142px" height="142px">
                <ul class="information">
                    <li>Title: ${item.title}</li>
                    <li>Author: ${item.author}</li>
                    <li>Pages: ${item.pages}</li>
                    <li>Id: ${item.id}</li>
                    <li class="changeBtn">
                        <button id="${item.id}">${readOrNot}</button>
                        <button id="delete__${item.id}">Remove</button>
                    </li>
                </ul>`
        aBook.setHTMLUnsafe(content);
        aBook.classList.add("book__infor");
        listBook.append(aBook);
        const statusBtn = document.getElementById(`${item.id}`);
        statusColor(item, statusBtn);
    })
}

Box.addEventListener("click", (e) => {
    const changeBtn = document.getElementById(`${e.target.id}`);
    if(changeBtn !== null)
    {
        if(!changeBtn.id.includes("delete__"))
        {
            changeProperty(myLibrary[takeIndex(e.target)]);
            statusColor( myLibrary[takeIndex(e.target)], changeBtn);
        }
        else{
            removeBook(takeIndex(e.target));
        }
    }
})