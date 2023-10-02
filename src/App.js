import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './common/useLocalStorage';
import jwt from 'jsonwebtoken';
import 'bootstrap/dist/css/bootstrap.min.css';

import JoblyApi from './common/api';
import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';
import UserContext from './UserContext.js';
import LoadingSpinner from './common/LoadingSpinner';

//Key name for local storage
export const TOKEN_STORAGE_ID = 'jobly-token';

const App = () => {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [applicationIds, setApplicationIds] = useState(new Set([]));
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    console.debug(
        'App',
        'infoLoaded=',
        infoLoaded,
        'applicationIds=',
        applicationIds,
        'currentUser=',
        currentUser,
        'token=',
        token
      );
    
    useEffect(() => {
        async function getCurrentUser() {
            if(token) {
                try {
                    let {username} = jwt.decode(token); 
                    JoblyApi.token = token; 

                    let currentUser = await JoblyApi.getCurrentUser(username); 
                    setApplicationIds(new Set(currentUser.applications));
                    setCurrentUser(currentUser); 
                }catch(err) {
                    console.error('App getCurrentUser problem loading', err);
                    setCurrentUser(null);
                }
            }
            setInfoLoaded(true); 
        }
        setInfoLoaded(false);
        getCurrentUser();
    }, [token]); 

    async function signup(signupData){
        try{
            let token = await JoblyApi.signup(signupData); 
            setToken(token); 
            JoblyApi.token = token; 
            setCurrentUser(token); 
            return {success: true}; 
        }catch(err) {
            console.error('signup failed', err);
            return {success:false, err};
        }
    }

    //handle login
    async function login(loginData){
        try{
            let token = await JoblyApi.login(loginData); 
            setToken(token); 
            setCurrentUser(token); 
            return {success: true}; 
        }catch(err){
            console.error('login failed', err); 
            return {success:false, err}; 
        }
    }

    //handles delete users
    async function deleteUser() {
        try {
          await JoblyApi.deleteProfile(currentUser.username);
          logout();
          return { success: true };
        } catch (errors) {
          console.error('delete failed', errors);
          return { success: false, errors };
        }
      }

    //handles logout
    const logout = () => {
        setApplicationIds(null);
        setCurrentUser(null);
        setToken('token');
      };

    //checks if job has been applied
    function hasAppliedToJob(id) {
        return applicationIds.has(id);
      }

    //handles apply to job
    function applyToJob(id) {
        if (hasAppliedToJob(id)) return;
        JoblyApi.applyToJob(currentUser.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
      }

    if (!infoLoaded) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <BrowserRouter>
                <UserContext.Provider value = {{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
                    <NavBar logout = {logout} />
                    <Routes login={login} signup={signup} deleteUser={deleteUser} />
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;