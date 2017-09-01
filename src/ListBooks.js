import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  state = {
    books: []
  }

  // Get all of the books for the shelves and set state.
  componentDidMount() {
    this.getBookList()
  }
  
  getBookList = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  
  updateBookShelf = (id, shelf) => {
    // set state
    // this.setState((state) => ({
    //   books: state.books.find((c) => c.id === id).shelf = shelf
    // }))
    // console.log(this.state.books.find((c) => c.id === id))
    // // update book
    // #update() does return my shelf that I'm adding a book to.
    // Should be able to set that as a state. Maybe when I first get books state
    // I can filter it and fill my other states, then use this to update states 
    // as the user updates them.
    BooksAPI.update(this.state.books.find((c) => c.id === id), shelf).then(
      this.getBookList()
    )
  }
  
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
                    <Book 
                      key={book.id}
                      book={book}
                      onUpdateShelf={this.updateBookShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.filter((book) => book.shelf === 'wantToRead').map((book) => (
                    <Book 
                      key={book.id}
                      book={book}
                      onUpdateShelf={this.updateBookShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.filter((book) => book.shelf === 'read').map((book) => (
                    <Book 
                      key={book.id}
                      book={book}
                      onUpdateShelf={this.updateBookShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <a onClick={this.props.onNavigate}>Add a book</a>
        </div>
      </div>    
    )
  }
}

export default ListBooks