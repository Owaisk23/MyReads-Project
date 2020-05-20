import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

	state = {
		shelf: null
	}

    static propTypes = {
		book: PropTypes.object.isRequired,
		updateBookCategory: PropTypes.func.isRequired
	}

	handleChange = (event) => {
		this.setState({ shelf: event.target.value });
		this.props.updateBookCategory(this.props.book,event.target.value);
	};
    
	render() {
		var book = this.props.book;
		return (
			<li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url("${book.imageLinks && book.imageLinks.thumbnail?book.imageLinks.thumbnail:''}")` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange.bind(this)} value={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{ book.authors && book.authors.map(author=>author+", ")}</div>
                </div>
            </li>
		)
	}
}

export default Book