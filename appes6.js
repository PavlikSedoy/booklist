class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list')
    
        // Create tr (row)
        const row = document.createElement('tr')
        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `
    
        list.appendChild(row)
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div')
        // Add classes
        div.className = `alert ${className}`
        // Add text
        div.appendChild(document.createTextNode(message))

        // Insert in to the DOM
        const container = document.querySelector('.container'),
            form = document.querySelector('#book-form')

        container.insertBefore(div, form)

        // Timeout after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove()
        }, 3000)
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }

    clearFields() {
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
}

// Local storage class
class Store {
    static getBooks() {
        const books = localStorage.getItem('books') !== null ? JSON.parse(localStorage.getItem('books')) : []

        return books
    }

    static displayBooks() {
        const books = Store.getBooks()

        books.map(book => {
            const ui = new UI()
            ui.addBookToList(book)
        })
    }

    static addBook(book) {
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBooks()

        books.map((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', () => {
    Store.displayBooks()
})

// Event Listeners for Add Book
document.getElementById('book-form').addEventListener('submit', e => {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // Instantiate book
    const book = new Book(title, author, isbn)

    // Instantiate UI
    const ui = new UI()

    // Validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please, fill all fields!', 'error')
    } else {
        ui.addBookToList(book)
        // Add to local storage
        Store.addBook(book)
        // Show alert
        ui.showAlert('Book added!', 'success')
        ui.clearFields()
    }


    e.preventDefault()
})

// Event listener for delete
document.getElementById('book-list').addEventListener('click', e => {
    // Initializate UI
    const ui = new UI()

    // Delete from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // Delete book from list
    ui.deleteBook(e.target)

    // Show alert
    ui.showAlert('Book deleted!', 'success')

    e.preventDefault()
})