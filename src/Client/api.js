import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://backendfinal-7d89.onrender.com"
});

const Upvote = async (ObjId) => {
    try {
        const response = await axiosInstance.patch(`/product/like/${ObjId}`);
        return {
            success: response.data.success,
            message: response.data.message
        };
    } catch (err) {
        return {
            success: false,
            message: 'Could not upvote at the moment. Please try again.'
        };
    }
};

const Postcomment = async (productObj) => {
    try {
        const response = await axiosInstance.patch(`/product/comment/${productObj.id}`, {
            comment: productObj.comment
        });
        return {
            success: response.data.success,
            message: response.data.message
        };
    } catch (err) {
        return {
            success: false,
            message: 'Could not comment now. Please try again.'
        };
    }
};

const editPost = async (productDetails, id) => {
    try {
        const token = JSON.parse(localStorage.getItem('feedbackUser'));
        const product_category = productDetails.category.split(/\s*,\s*/);
  
        const response = await axiosInstance.patch(`/product/edit/${id}`, {
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
            message: response.data.message
        };
    } catch (err) {
        return {
            success: false,
            message: 'Please login to edit.'
        };
    }
};

const addProduct = async (productDetails) => {
    try {
        const token = JSON.parse(localStorage.getItem('feedbackUser'));
        const product_category = productDetails.category.split(/\s*,\s*/);
        const response = await axiosInstance.post('/product/add', {
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
            message: response.data.message
        };
    } catch (err) {
        return {
            success: false,
            message: 'Server fault! Please try again later.'
        };
    }
};

const ApplyFilter = async () => {
    try {
        const response = await axiosInstance.get(`/product/view`);
        if (response.data.success) {
            const distinctTags = new Set();
            distinctTags.add('All');
            for (const key in response.data.data) {
                const object = response.data.data[key];
                const tags = object.product_category;
                for (const tag of tags) {
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

const getAllProducts = async (query) => {
    try {
        let queryData = '';
        if (query) {
            queryData = '?';
            queryData += query;
        }
        const response = await axiosInstance.get(`/product/view${queryData}`);
        return {
            success: response.data.success,
            data: response.data.data
        };
    } catch (err) {
        return {
            success: false,
            message: 'Server fault! Please try again later.'
        };
    }
};

const getsucessfullRegisteredUser = async (ClientInfo) => {
    try {
        const { name, email, mobile, password } = ClientInfo;
        const response = await axiosInstance.post('/user/register', {
            name,
            mobile,
            email,
            password
        });
        return {
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

const LoginUser = async (ClientInfo) => {
    const { email, password } = ClientInfo;
    const response = await axiosInstance.post('/user/login', {
        email,
        password
    });
    if (response.data.token) {
        localStorage.setItem('feedbackUser', JSON.stringify(response.data.token));
    }
    return {
        success: response.data.success,
        message: response.data.message,
        token: response.data.token
    };
};

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
