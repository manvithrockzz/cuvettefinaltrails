/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import component from './PostAdd.module.css';
import { UserContext } from '../../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProduct, editPost } from '../../Client/api';
import { useNavigate } from 'react-router-dom';

export default function AddProduct(props) {
    const [postDetails, setPostDetails] = useState({
        name: '',
        category: '',
        logoUrl: '',
        productLink: '',
        productDescription: ''
    });

    const { setIsVisible, editCandidate, setModifyStatus, setSortUpdateState } = useContext(UserContext);
    // use navigate is a useState, used to navigate betwwen pages
    const navigate = useNavigate();

    useEffect(() => {
        // if post is edited then, : code loop runs
        if (props.edit) {
            // When editing, pre-fill the input fields with the editCandidate's details
            const categoryItems = editCandidate.tags.join(', ');

            // setPostDetails({
            //     name: editCandidate.name,
            //     category: categoryItems,
            //     logoUrl: editCandidate.logo,
            //     productLink: editCandidate.logo,
            //     productDescription: editCandidate.description
            // });

            setPostDetails({
                // Set the input field values based on the editCandidate's details
                name: editCandidate.name, // Set the name field to editCandidate's name
                category: categoryItems, // Set the category field to a string representation of editCandidate's tags
                logoUrl: editCandidate.logo, // Set the logoUrl field to editCandidate's logo
                productLink: editCandidate.logo, // Set the productLink field to editCandidate's logo
                productDescription: editCandidate.description // Set the productDescription field to editCandidate's description
            });
            
        }
    }, []);

    const processInput = (e) => {
        setPostDetails((prevDetails) => ({
            ...prevDetails, // Spread operator to create a copy of the previous postDetails state
            [e.target.name]: e.target.value // Update the property corresponding to the changed input field
        }));
    };
    

    const attemptLogin = async () => {
        const { name, category, logoUrl, productDescription, productLink } = postDetails;
        if (!name || !category || !logoUrl || !productDescription || !productLink) {
            // Display an error toast if any of the required fields are empty
            toast.error('Please ensure all fields are added', { autoclose: 3000 });
        } else {
            let result = '';
            if (props.edit) {
                // If editing, call the editPost API function
                result = await editPost(postDetails, editCandidate.id);
            } else {
                // If not editing, call the addProduct API function
                result = await addProduct(postDetails);
            }

            if (result.success) {
                // Display a success toast if the operation is successful
                toast.success(result.message, { autoclose: 2000 });
                setIsVisible(false);
                navigate('/');
                setModifyStatus(true);
                setSortUpdateState(true);
            } else {
                // Display an error toast if the operation fails
                toast.error(result.message, { autoclose: 2000 });
            }
        }
    };

    const diselect = () => {
        // Close the modal without saving changes
        setIsVisible(false);
    };

    return (
        <div className={component.POSTADD}>
            <span className={component.HEADING}>
                {props.edit ? 'Edit your product' : 'Add your product'}
            </span>
            <input
                value={postDetails.name}
                type="text"
                placeholder="Enter name of company"
                name="name"
                className={component.entervalue}
                onChange={processInput}
            />
            {/* add input category */}
            <input
                value={postDetails.category}
                type="text"
                placeholder="Add Category"
                name="category"
                className={component.entervalue}
                onChange={processInput}
            />
            {/* add input, put logo URL */}
            <input
                value={postDetails.logoUrl}
                type="text"
                placeholder="Add logo url"
                name="logoUrl"
                className={component.entervalue}
                onChange={processInput}
            />
            {/* add input for product link */}
            <input
                value={postDetails.productLink}
                type="text"
                placeholder="Add product link"
                name="productLink"
                className={component.entervalue}
                onChange={processInput}
            />
            {/* add and edit  product description */}
            <input
                value={postDetails.productDescription}
                type="text"
                placeholder="Add description"
                name="productDescription"
                className={component.entervalue}
                onChange={processInput}
            />
            <div className={component.buttonContainer}>
                <span className={component.submitButton} onClick={diselect}>
                    Cancel
                </span>
                <span className={component.submitButton} onClick={attemptLogin}>
                    {props.edit ? 'Edit' : '+ Add'}
                </span>
            </div>
        </div>
    );
}
