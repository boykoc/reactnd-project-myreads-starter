import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import debounce from 'lodash/debounce'

class SearchBooks extends Component {
  state = {
    query: '',
    results: [],
    myBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query === '') {
      this.clearResults()
    }
    this.search(query)
  }

  search = debounce((query) => {
    if (query) {
      BooksAPI.search(query).then((results) => {
        // Without this guard it wont let the user clear search results.
        if (results.length) {
          console.log(results)
          this.setState({ results: results })
        } else {
          this.clearResults()
        }
      })
    }
  }, 250)

  clearResults = () => {
    this.setState({ results: [] })
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
    BooksAPI.update(this.state.results.find((c) => c.id === id), shelf)
  }

  // Get all of the books for the shelves.
  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({myBooks})
    })
  }

  render() {
    // Map over the results and the myBooks and create resultsWithShelf like
    // in the contacts app.
    // The else block setting to none overrode this I think. Also, this is updating the result and creating a
    // 2d array for resultswithshelf
    let resultsWithShelf = []
    // Map over results and for each result map over myBooks to find matches.
    resultsWithShelf = this.state.results.map(result => this.state.myBooks.map(myBook => {
      if(result.id === myBook.id){
        result.shelf = myBook.shelf
        return result
      } 
    }))
    
    console.log(resultsWithShelf)
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search" 
            onClick={this.props.onNavigate}>Close</a>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            
          </div>
        </div>
        <div className="search-books-results">
          {!this.state.results.length && this.state.query && (
            <p>Sorry, no results matching that title.</p>
          )}
          <ol className="books-grid">
            {this.state.results.map((book) => (
              <Book 
                key={book.id}
                book={book} 
                onUpdateShelf={this.updateBookShelf}
              />
            ))}
          </ol>
        </div>
      </div>    
    )
  }
}

export default SearchBooks