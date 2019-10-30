import ConcertData from '../src/data/concerts-data.json';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import concert from '../src/data/searchbarData';
import './App.css';


  
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('\\b' + escapedValue, 'i');
    
    return concert.filter(concerts => regex.test(getSuggestionValue(concerts)));
  }
  
  function getSuggestionValue(suggestion) {
    return `${suggestion.title}`;
  }

  
  function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.title}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
  
    return (
      <span className={'suggestion-content ' + suggestion.twitter}>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
  
              return (
                <Link to={'/item/'+ suggestion.Id} className={className} key={index}>{part.text}</Link>
              );
            })
          }
        </span>
      </span>
    );
  }
  
  class SearchBar extends React.Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: []
      };    
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Пребарај концерти..",
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
          />
      );
    }
  }
  
 export default SearchBar;
  