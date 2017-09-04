import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  state = {
    none: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  // Get all of the books for the shelves and set state.
  componentDidMount() {
    this.getBookList()
  }
  
  getBookList = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ 
        currentlyReading: books.filter((book) => book.shelf === 'currentlyReading')
      })
      this.setState({
        wantToRead: books.filter((book) => book.shelf === 'wantToRead')
      })
      
      this.setState({
        read: books.filter((book) => book.shelf === 'read')
      })
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
    let books = this.state.currentlyReading.concat(this.state.wantToRead).concat(this.state.read)
    BooksAPI.update(books.find((c) => c.id === id), shelf).then((updatedShelf) => {
        this.getBookList()
      }
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
                  {this.state.currentlyReading.map((book) => (
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
                  {this.state.wantToRead.map((book) => (
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
                  {this.state.read.map((book) => (
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
          <Link to="/search">Add a book</Link>
        </div>
      </div>    
    )
  }
}

export default ListBooks