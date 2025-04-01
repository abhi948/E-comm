import axios from 'axios'

export const axiosi = axios.create(
    {
         withCredentials:true,
         baseURL:process.env.REACT_APP_BASE_URL
        // baseURL: 'http://localhost:8000', // Your API server URL
        // timeout: 10000,
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    }
)


// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:8000', // Your API server URL
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export default instance;