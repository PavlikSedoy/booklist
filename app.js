// Book constructor
function Book(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn 
}

// UI conststructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
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

// Remove book from list
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}

// Show allert
UI.prototype.showAlert = function(message, className) {
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

// Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}

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

    // Delete book from list
    ui.deleteBook(e.target)

    // Show alert
    ui.showAlert('Book deleted!', 'success')

    e.preventDefault()
})