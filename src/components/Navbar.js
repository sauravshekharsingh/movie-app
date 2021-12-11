import React from "react";
import { handleMovieSearch, addMovieToList } from "../actions";
import { connect } from "react-redux";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchResults: true,
      searchText: "",
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  handleSearch = (e) => {
    const { searchText } = this.state;

    // We can call API here but we should not as a component is responsible about UI and not backend
    console.log(searchText);
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { result, showSearchResults } = this.props.search;

    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>
          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={result.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{result.Title}</span>
                  {console.log("RENDER SEARCH BOX")}
                  <button onClick={() => this.handleAddToMovies(result)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <storeContext.Consumer>
//         {(store) => (
//           <Navbar dispatch={store.dispatch} search={this.props.search}></Navbar>
//         )}
//       </storeContext.Consumer>
//     );
//   }
// }

function mapStateToProps({ search }) {
  return {
    search,
  };
}

// Component gets rerendered only if above paramters of store change
const connectedNavbarComponent = connect(mapStateToProps)(Navbar);

export default connectedNavbarComponent;
