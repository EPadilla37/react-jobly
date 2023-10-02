import React, { useState, useEffect } from 'react';

import JoblyApi from '../common/api';
import SearchBar from '../forms/SearchBar';
import JobCardList from './JobCardList';
import LoadingSpinner from '../common/LoadingSpinner';


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.debug('JobList useEffect getJobsOnMount');
    search();
  }, []);
  
  async function search(title) {
    let result = await JoblyApi.getJobs(title);
    setJobs(result);
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchBar searchFor={search} />
      {jobs.length ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="message">
          There are no openings at this time. Please check back later!
        </p>
      )}
    </div>
  );
};

export default JobList;