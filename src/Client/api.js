// will establish connection between frontend and backend
import axios from 'axios';

// Created an instance with the base URL of the backend server
const axiosInstance = axios.create({
  baseURL: "https://backendfinal-7d89.onrender.com"
});

// Function to upvote a product by its object ID
const Upvote = async (ObjId) => {
  try {
    // Sends PATCH request -> backend API to upvote the product
    const response = await axiosInstance.patch(`/product/like/${ObjId}`);
    return {
      success: response.data.success,
    // response is object predefined by axios library, making HTTP requests & used to get information.
      message: response.data.message
    };
  } catch (err) {
    return {
      success: false,
      message: 'Could not upvote at the moment. Please try again.'
    };
  }
};

// Function to post a comment on a product
const Postcomment = async (productObj) => {
  try {
    // Send a PATCH request to -> backend API to post the comment
    const response = await axiosInstance.patch(`/product/comment/${productObj.id}`, {
    // the request payload will be sent to the specified URL for updating comments with the corresponding id
      comment: productObj.comment
    });
    return {
      success: response.data.success,
      // response is object predefined by axios library, making HTTP requests & used to get information.
      message: response.data.message
    };
  } catch (err) {
    return {
        // If error occurs, it creates and returns an object 
      success: false,
    //  object  with properties success and message.
      message: 'Could not comment now. Please try again.'
    };
  }
};

// Function to edit a product's details
const editPost = async (productDetails, id) => {
  try {
    // Get the user token from local storage
    const token = JSON.parse(localStorage.getItem('feedbackUser'));
    // Split the product category string into an array
    const product_category = productDetails.category.split(/\s*,\s*/);

    // Send a PATCH request -> backend API to edit the product
    const response = await axiosInstance.patch(`/product/edit/${id}`, {
        // the request payload will be sent to the specified URL for updating the product with the corresponding id
      product_name: productDetails.name,
      logo_url: productDetails.logoUrl,
      product_link: productDetails.productLink,
      product_description: productDetails.productDescription,
      product_category
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      success: response.data.success,
    // response is object predefined by axios library, making HTTP requests & used to get information.
      message: response.data.message
    };
  } catch (err) {
    return {
      success: false,
      message: 'Please login again!'
    };
  }
};

// Function to add a new product
const addProduct = async (productDetails) => {
  try {
    // Get the user token from local storage
    const token = JSON.parse(localStorage.getItem('feedbackUser'));
    // Split the product category string into an array
    const product_category = productDetails.category.split(/\s*,\s*/);

    // Send a POST request to the backend API to add the product
    const response = await axiosInstance.post('/product/add', {
    // the request payload will be sent to the specified URL for updating the product- add with the corresponding id

      product_name: productDetails.name,
      logo_url: productDetails.logoUrl,
      product_link: productDetails.productLink,
      product_description: productDetails.productDescription,
      product_category
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      success: response.data.success,
     // response is object predefined by axios library, making HTTP requests & used to get information.
      message: response.data.message
    };
  } catch (err) {
    return {
      success: false,
      message: 'Server fault! Please try again later.'
    };
  }
};

// Function to apply filters and retrieve distinct product tags
const ApplyFilter = async () => {
  try {
    // Send a GET request to the backend API to retrieve product data
    const response = await axiosInstance.get(`/product/view`);
    if (response.data.success) {
      const distinctTags = new Set();
      distinctTags.add('All');
      // Iterate over the product data and extract distinct tags
      for (const key in response.data.data) {
        // used to generate an array (distinctTagsArray) 
        const object = response.data.data[key];
        // that will be part of the returned result.
        const tags = object.product_category;
        // found in the product_category
        for (const tag of tags) {
            //  set should contain all unique tags 
          distinctTags.add(tag);
        }
      }
      const distinctTagsArray = Array.from(distinctTags);

      return {
        success: true,
        data: distinctTagsArray
      };
    } else {
      return {
        success: true,
        data: ['All']
      };
    }
  } catch (err) {
    return {
      success: false
    };
  }
};

// Function to retrieve all products with optional query parameters
const getAllProducts = async (query) => {
  try {
    let queryData = '';
    // construct query strings for HTTP requests.. 
    if (query) {
      queryData = '?';
    //     it will be appended to the URL as a query parameter preceded by a question mark
      queryData += query;
    }
    // Send a GET request to the backend API to retrieve all products
    const response = await axiosInstance.get(`/product/view${queryData}`);
    return {

      success: response.data.success,
    // response is object predefined by axios library, making HTTP requests & used to get information.
      data: response.data.data
    };
  } catch (err) {
    return {
      success: false,
      message: 'Server fault! Please try again later.'
    };
  }
};

// Function to register a new user
const getsucessfullRegisteredUser = async (ClientInfo) => {
  try {
    const { name, email, mobile, password } = ClientInfo;
    // Send a POST request to the backend API to register the user
    const response = await axiosInstance.post('/user/register', {
      name,
      mobile,
      email,
      password
    });
    return {
        // response is object predefined by axios library, making HTTP requests & used to get information.
      success: response.data.success,
      message: response.data.message
    };
  } catch (err) {
    return {
      success: false,
      message: 'Could not make registration request. Please try again later.'
    };
  }
};

// Function to login a user
const LoginUser = async (ClientInfo) => {
  const { email, password } = ClientInfo;
  // Send a POST request to the backend API to login the user
  const response = await axiosInstance.post('/user/login', {
    email,
    password
  });
  if (response.data.token) {
    // user's token stored local storage, and allow to access and retrieve when needed,
    localStorage.setItem('feedbackUser', JSON.stringify(response.data.token));
  }
  return {
    success: response.data.success,
     // response is object predefined by axios library, making HTTP requests & used to get information.
    message: response.data.message,
    token: response.data.token
  };
};

// Export all the functions as named exports
export {
  getsucessfullRegisteredUser,
  LoginUser,
  addProduct,
  getAllProducts,
  ApplyFilter,
  Upvote,
  Postcomment,
  editPost
};




