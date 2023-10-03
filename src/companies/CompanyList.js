import React, { useState, useEffect } from 'react';

import SearchBar from '../forms/SearchBar';
import JoblyApi from '../common/api';
import CompanyCard from './CompanyCard';
import LoadingSpinner from '../common/LoadingSpinner';

//Shows list of all companies

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getCompaniesOnMount() {
    console.debug('CompanyList useEffect getCompaniesOnMount');
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchBar searchFor={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map(c => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
            />
          ))}
        </div>
      ) : (
        <p className="message">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default CompanyList;