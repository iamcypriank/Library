let library =[];


function Book(id, title, author, description){
    if(!new.target){
        throw error("calling a object constructor!");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.issued = false;

}


function addBookToLibrary(title, author, description){
    const book = new Book(crypto.randomUUID(),title, author, description);
    console.log(book);
    library.push(book);
}
function displayBook(library){
    library.forEach(book => {
        if(document.querySelector(`[data-bookid="${book.id}"]`)==null){
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.setAttribute("data-bookId",book.id);
            const upDiv = document.createElement("div");
            upDiv.classList.add("up");
            const downDiv = document.createElement("div");
            downDiv.classList.add("down");
            upDiv.innerHTML = `
            <h1 class="book-title">Title : ${book.title} </h1>
            <h3 class="book-author">By ${book.author} </h3>
            <p class="book-description">About book : ${book.description} </p>
        `;
        if(book.issued){
             downDiv.innerHTML = `
             <img class="delete-icon" src="src/delete-filled-svgrepo-com.svg" alt="">
            <button class=issued-stats-btn" data-issued="${book.issued}" >Not Available </button>
            `;
        }else{
            downDiv.innerHTML = `
            <img class="delete-icon" src="src/delete-filled-svgrepo-com.svg" alt="">
            <button class="issued-stats-btn" data-issued="${book.issued}" >Available </button>
            `;
        }
        bookDiv.appendChild(upDiv);
        bookDiv.appendChild(downDiv);
        document.querySelector(".book-container").appendChild(bookDiv);
        }
    });
}




//events

const addNewBookBtn = document.querySelector("#add-btn");
addNewBookBtn.addEventListener("click",function(e){
    e.preventDefault();

    
    const errorMessageEl = document.querySelector("#error-message");
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const description = document.querySelector("#description").value;
    

    if((title!= null && title!="") && (author!=null && author!="")){
        document.querySelector("#error-message").textContent = "";
        addBookToLibrary(title,author,description);
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#description").value = "";
        
        errorMessageEl.textContent = "book added! successfully!";
        errorMessageEl.style.color="green";
        displayBook(library);

    }else{
        errorMessageEl.textContent = "some error occured!";
        errorMessageEl.style.color="red";
    }
    
})

//availbiltyChange
const bookContainerEl = document.querySelector(".book-container");
bookContainerEl.addEventListener("click",function(e){
    if(e.target.matches(".issued-stats-btn")){
        const bookEl = e.target.parentElement.parentElement;
        const bookId = bookEl.dataset.bookid;
        let stats = e.target.dataset.issued;
        library = library.map(function(book){
            if(book.id===bookId){
                if(stats==="true") {
                    book.issued=false ;
                    e.target.dataset.issued="false";
                    e.target.innerText = "Available";
                }else{
                    book.issued=true;
                    e.target.dataset.issued="true";
                    e.target.innerText = "Not Available";
                }
                
                return book;
            }else{
                return book;
            }
        } )
        console.log(library)
        
    }
})


bookContainerEl.addEventListener("click",e=>{
    if(e.target.matches(".delete-icon")){
        const bookEl = e.target.parentElement.parentElement;
        const bookId = bookEl.dataset.bookid;
        library = library.filter(function(book){
            if(book.id===bookId){
               
            }else{
                return book;
            }
        } )
    }
    bookContainerEl.innerHTML="";
    displayBook(library);
})

 