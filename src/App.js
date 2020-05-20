import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Router, Switch } from 'react-router-dom'
import history from "./history"
import Search from './searches'
import Shelves from './shelves'
import './App.css'


class BooksApp extends React.Component {
  
	state = {
		showSearchPage: false,
		booksList : [],
		searchedBookList: []      
	}

	//Load books associated with categories on DOM
	
	componentDidMount(){
		BooksAPI.getAll().then(data=> {
			this.setState({booksList:data});
		})
	}

	clearSearchResult(){
		this.setState(()=>({
			searchedBookList: []
		}));
	}
	
	// This functions will be used to update the book category
     
	updateShelf(book, shelf) {
		BooksAPI.update(book,shelf)
		.then(data=>{
			if(this.state.booksList.some(b=> b.id===book.id)){
				this.setState((prevState)=> ({
					booksList : prevState.booksList.map(b=> {
						if(b.id === book.id){
							b.shelf = shelf;
					}
						return b;
					})
				}));
			}
			else {
				book.shelf = shelf;
				this.setState((prevState)=> ({
				booksList : [...prevState.booksList,book]
				}));
			}            
		});
	}

    // This function will be to find books, also we need to match book category in both searched and current books 
	
	searchBooks(query) {
		if(query){            
			BooksAPI.search(query)
			.then(data=> {
				this.setState(()=>({
					searchedBookList : data.error? []: data.map(b=> {                        
						var matchedBook = this.state.booksList.filter(bl=> bl.id===b.id);
						if(matchedBook && matchedBook.length>0){
							b.shelf = matchedBook[0].shelf;
						}
						else {
							b.shelf = "none";
						}
					return b;
					})
				}))
			})
		}
		else {
			this.clearSearchResult();
		}
	}

 
	render() {        
		return (
			<div>
				<Router history={history}>
					<Switch>
						<Route 
							exact
							path="/"
							render={()=> (
								<Shelves 
									bookList={this.state.booksList}
									updateBookCategory={this.updateShelf.bind(this)}
								/>
							)}
						/>

						<Route
							exact
							path="/search"
							render={({history})=> (
								<Search
									searchedBookList={this.state.searchedBookList}
									searchBooks={this.searchBooks.bind(this)}
									updateBookCategory={this.updateShelf.bind(this)}
									onBackPress={()=> {
									this.clearSearchResult();
								history.push("/");
									}} 
								/>
							)} 
						/>
					</Switch>
				</Router>                
			</div>
		);
	}

}

export default BooksApp;