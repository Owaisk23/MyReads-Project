import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './bookshelf'

class Shelves extends React.Component {

	state = {
		shelfs: [
			{title:"Currently Reading", value:"currentlyReading"},
			{title:"Want to Read", value:"wantToRead"},
			{title:"Read", value:"read"}
		]
	}

	static propTypes = {
		bookList: PropTypes.array.isRequired,
		updateBookCategory: PropTypes.func.isRequired
	}

	render() {
		var shelfs = this.state.shelfs;
		return (
            <div className="list-books">
                <div className="list-books-title">
					<div>
					<Link to="/search" className="open-search">
						<button>Search</button>
					</Link>
					</div>
                    <div className="list-books-title-heading">
                        <h1>MyReads</h1>
                    </div>
                </div>
                <div className="list-books-content">
                    <div>
						{
							shelfs.map(shelf=> {
								return( 
									<BookShelf
										key={shelf.value}
										title={shelf.title}
										books={this.props.bookList.filter(book=>book.shelf === shelf.value)}
										updateBookCategory={this.props.updateBookCategory}
									/>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Shelves