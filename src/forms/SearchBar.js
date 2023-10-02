import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';


const SearchBar = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = evt => {
    setSearchTerm(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div className="SearchForm mb-4">
    <form onSubmit={handleSubmit}>
        <Input
            className="form-control"
            name="searchTerm"
            type="search"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={handleChange}
        />
        <Button type="submit" color="primary" className="mt-3">
            Search
        </Button>
    </form>
</div>
  );
};

export default SearchBar;