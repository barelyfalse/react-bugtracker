import { useState, useEffect } from "react";

function getStoredData(key, defaultValue) {
  // getting stored value
  var saved = localStorage.getItem(key);
  if(saved === null) {
    return defaultValue;
  }
  var initial = JSON.parse(saved);
  return initial;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStoredData(key, defaultValue);
  });

  useEffect(() => {
    // storing data
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useStoragedProject = (id, key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const stored = getStoredData(id, defaultValue);
    if(stored === null) {
      console.log('Error trying to get "' + id)
      return null;
    }
    var initial = stored;
    return initial[key];
  });
  
  useEffect(() => {
    //storing data
    var stored = getStoredData(id, defaultValue);
    stored[key] = value;
    localStorage.setItem(id, JSON.stringify(stored));
  }, [key, value]);

  return [value, setValue];
}

export const storeNewProject = (name, id) => {
  let newProj = {
    name: name,
    open: [],
    inprogress: [],
    tobetested: [],
    onhold: [],
    closed: []
  }
  localStorage.setItem(id, JSON.stringify(newProj));
}

export const getProjectData = (id) => {
  var saved = localStorage.getItem(id);
  var initial = JSON.parse(saved);
  return initial;
}

export const setCurrentProject = (id) => {
  localStorage.setItem('currentproject', id);
}

export const getCurrentProject = () => {
  var saved = localStorage.getItem('currentproject');
  if(saved === null) {
    console.log('Project not found in storage!')
    return null;
  }
  return saved;
}