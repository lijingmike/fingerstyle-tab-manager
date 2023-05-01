import axios from 'axios';
import apiConfig from '../Configuration/apiConfig';

const basicURL = 'http://localhost:8080/'

// create a map to link httpMethod to the corresponding axios methods
const axiosMethods = {
    "GET": axios.get,
    "POST": axios.post,
    "PUT": axios.put,
    "DELETE": axios.delete
};


// create custom function for the various axios api calls
export default function axiosCall(httpMethod, uri, payload, onApiCallSuccess) {
    const axiosMethod = axiosMethods[httpMethod.toUpperCase()];
    // // check if method is POST, if so include payload as a parameter in the axios call
    // const requestOptions = {
    //   ...(axiosMethod === axios.post ? { data: payload } : {}),
    //   ...apiConfig
    // };
    // console.log(requestOptions);
    // axiosMethod(`${basicURL}${uri}`, requestOptions)
    //   .then(response => {
    //     onApiCallSuccess(response.data);
    //     console.log(`${httpMethod} request to ${basicURL}${uri} successful, and response is as follows: ${JSON.stringify(response, null, 2)}`);
    //   })
    //   .catch(error => {
    //     console.log(`${httpMethod} request to ${basicURL}${uri} unsuccessful, and error is as follows: ${error}`);
    //   });
    
    
    if (axiosMethod === axios.post) {
      axiosMethod(`${basicURL}${uri}`, payload, apiConfig)
        .then(response => {
          onApiCallSuccess(response.data);
          console.log(`${httpMethod} request to ${basicURL}${uri} successful, and response is as follows: ${JSON.stringify(response, null, 2)}`);
        })
        .catch(error => {
          if (error.response && error.response.status === 500) {
            // Display error message to user
            alert("The file you are trying to upload is too large. Please try again with a smaller file.");
          } else {
            // Handle other errors
            console.log(`${httpMethod} request to ${basicURL}${uri} unsuccessful, and error is as follows: ${error}`);
          }
        });
    } else {
      axiosMethod(`${basicURL}${uri}`, apiConfig)
        .then(response => {
          onApiCallSuccess(response.data);
          console.log(`${httpMethod} request to ${basicURL}${uri} successful, and response is as follows: ${JSON.stringify(response, null, 2)}`);
        })
        .catch(error => {
            console.log(`${httpMethod} request to ${basicURL}${uri} unsuccessful, and error is as follows: ${error}`);
        });
    }
    
}