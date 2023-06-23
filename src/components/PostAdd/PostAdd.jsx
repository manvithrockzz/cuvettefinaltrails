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
    const navigate = useNavigate();

    useEffect(() => {
        if (props.edit) {
            const categoryItems = editCandidate.tags.join(', ');

            setPostDetails({
                name: editCandidate.name,
                category: categoryItems,
                logoUrl: editCandidate.logo,
                productLink: editCandidate.logo,
                productDescription: editCandidate.description
            });
        }
    }, []);

    const processInput = (e) => {
        setPostDetails((prevDetails) => ({
            ...prevDetails,
            [e.target.name]: e.target.value
        }));
    };

    const attemptLogin = async () => {
        const { name, category, logoUrl, productDescription, productLink } = postDetails;
        if (!name || !category || !logoUrl || !productDescription || !productLink) {
            toast.error('Please ensure all fields are added', { autoclose: 3000 });
        } else {
            let result = '';
            if (props.edit) {
                result = await editPost(postDetails, editCandidate.id);
            } else {
                result = await addProduct(postDetails);
            }

            if (result.success) {
                toast.success(result.message, { autoclose: 3000 });
                setIsVisible(false);
                navigate('/');
                setModifyStatus(true);
                setSortUpdateState(true);
            } else {
                toast.error(result.message, { autoclose: 3000 });
            }
        }
    };

    const diselect = () => {
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
            <input
                value={postDetails.category}
                type="text"
                placeholder="Add Category"
                name="category"
                className={component.entervalue}
                onChange={processInput}
            />
            <input
                value={postDetails.logoUrl}
                type="text"
                placeholder="Add logo url"
                name="logoUrl"
                className={component.entervalue}
                onChange={processInput}
            />
            <input
                value={postDetails.productLink}
                type="text"
                placeholder="Add product link"
                name="productLink"
                className={component.entervalue}
                onChange={processInput}
            />
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

