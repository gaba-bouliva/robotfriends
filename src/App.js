import React, { Component } from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import './App.css';
import jsonPlaceholder from './apis/jsonPlaceholder';
import Scroll from './components/Scroll';
import ErrorBoundry from './components/ErrorBoundry';

class App extends Component {
  state = {
    robots: [],
    searchValue: '',
  };
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const response = await jsonPlaceholder.get('/users');

    this.setState({
      robots: response.data,
    });
  };
  handleSearch = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  render() {
    return !this.state.robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.handleSearch} />
        <Scroll>
          <ErrorBoundry>
            <CardList
              searchedRobot={this.state.searchValue}
              robots={this.state.robots}
            />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
