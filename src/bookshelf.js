import React from 'react'
import PropTypes from 'prop-types'
import Book from './books'

class BookShelf extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		updateBookCategory: PropTypes.func.isRequired
	}

  	render() {
		return (
        	<div className="bookshelf">
        	<h2 className="bookshelf-title">{this.props.title}</h2>
        	<div className="bookshelf-books">
          		<ol className="books-grid">
				{ this.props.books.map((book,index) => {
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

export default BookShelf