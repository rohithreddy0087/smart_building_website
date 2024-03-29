const Helpers = {
    // Main wrapper for Fetch API
    httpRequest: (url, method, payload, headers) => { 
     const config = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };    // method = post and payload, add it to the fetch request
      if (method.toLowerCase() === 'post' ) {
        config.body = JSON.stringify(payload);
      }    // if custom headers need to be set for the specific request
      // override them here
      if (headers && typeof headers === 'object' && Object.keys(headers).length > 0) {
        config.headers = headers;
      }    return fetch(
        url,
        config
      ).then((response) => {
   
        // Check if the request is 200
        if (response.ok) {
          let data = response;
          
          // if the type is json return, interpret it as json
          if (response.headers.get('Content-Type').indexOf('application/json') > -1) {
   
            data = response.json();
          }
          return data;
        }// if an errors, anything but 200 then reject with the actuall response
        return Promise.reject(response);
      });
    },  
  };
  
  export default Helpers;