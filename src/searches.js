import React from 'react'
import Book from './books'

class Search extends React.Component {

	state = {
		query:''
	}

	updateQuery(query) {
		this.setState(()=>({
			query: query
		}));        
		this.props.searchBooks(query);
	}
    
	render() {
		const { query } = this.state;
		const { searchedBookList} = this.props;
		return (
            <div className="search-books">
            
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.onBackPress() }>Close</button>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" 
							value={query} 
							onChange={(event)=> {
								this.updateQuery(event.target.value)
							}}
					/>
                    </div>
                </div>
                
                <div className="search-books-results">
                    <ol className="books-grid">
						{ searchedBookList.map((book,index) => {
							return(
								<Book
									key={index}
									book={book}
									updateBookCategory={this.props.updateBookCategory}
								/>
							)
						})}
                    </ol>
                </div>
			</div>
		)
	}
}

export default Search