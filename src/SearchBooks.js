import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import debounce from 'lodash/debounce'

class SearchBooks extends Component {
  state = {
    query: '',
    results: []
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

  render() {
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
              />
            ))}
          </ol>
        </div>
      </div>    
    )
  }
}

export default SearchBooks