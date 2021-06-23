import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import { setSearchField } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  };
};

class App extends Component {
  state = {
    robots: [],
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
  // handleSearch = (event) => {
  //   this.setState({
  //     searchValue: event.target.value,
  //   });

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;

    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList searchField={searchField} robots={robots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
