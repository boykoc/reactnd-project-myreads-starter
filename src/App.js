import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: []
  }
  
  // Get all of the books for the shelves and set state.
  componentDidMount() {
    console.log(BooksAPI.getAll());
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks 
            onNavigate={() => this.setState({ showSearchPage: false })}
          />
        ) : (
          <ListBooks
            books={this.state.books}
            onNavigate={() => this.setState({ showSearchPage: true })}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
