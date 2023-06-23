import { useNavigate } from "react-router-dom"
import useResponsiveScreen from '../../reactHelper/handleListner';
import ProductBox from '../../components/product/ProductBox'
import FilterChip from '../../components/BoxFilter/BoxFilter'
import component from './Landing.module.css'
import { UserContext } from '../../App';
// import userIcon from "./userIcon.png"
import { toast } from 'react-toastify';
import Modal from '../../components/modal/View'
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import { ApplyFilter, getAllProducts } from '../../Client/api';

    function LandingPage() {
    const navigate = useNavigate();

    const { activeUser, setActiveUser, activePopup, setActivePopup, isVisible, setIsVisible, activeSort, sortBy, setSortBy, modifyStatus, setModifyStatus,sortUpdateState, setSortUpdateState } = useContext(UserContext);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [visibleTags, setVisibleTags] = useState([]);
    const [optionsForDisplay, setOptionsForDisplay] = useState();
    const { width } = useResponsiveScreen();
    const [chosenItem, setChosenItem] = useState('Select');
    const [itemNumber, setItemNumber] = useState();

    useEffect(() => {
        setOptionsForDisplay(false);
    }, [])
    const getProductsAndDisplay = async () => {

        let query = '';
    if (sortBy && sortBy !== 'Select') {
    query += 'sort='; // Build the query string for sorting
    query += sortBy;
    }
    if (activeSort && activeSort !== 'All') {
    if (query) {
        query += '&'; // Append '&' if there is already a 'sort' parameter in the query
    }
    query += 'product_category='; // Build the query string for filtering by product category
    query += activeSort;
}

        const result = await getAllProducts(query);
        if (result.success) {
            const tempDisplay = result.data.map((item) => {
                return (
                    <ProductBox
                        id={item._id}
                        name={item.product_name}
                        logo={item.logo_url}
                        tags={item.product_category}
                        comments={item.comments}
                        comments_count={item.total_comments}
                        likes={item.likes}
                        description={item.product_description}
                    />
                )
            })
            setVisibleProducts(tempDisplay);
            setModifyStatus(false);
            setItemNumber(tempDisplay.length);
        }
        else {
            toast.error('Error in getting products, please retry!', { autoClose: 2000 });
        }
    }
    useEffect(() => {
        getProductsAndDisplay();

    }, [])
    const getFiltersAndDisplay = async () => {
        const result = await ApplyFilter();
        if (result.success) {
            const tempDisplay = result.data.map((item) => {
                let isSelected = false;

                if (item === activeSort) {
                    isSelected = true;
                }
                return (
                    <FilterChip
                        name={item}
                        isSelected={isSelected}
                    />
                )
            })

            setVisibleTags(tempDisplay);
            setSortUpdateState(false);
        }
        else {
            toast.error('Error in getting filters', { autoClose: 2000 });
        }
    }
    useEffect(() => {

        getFiltersAndDisplay();
    }, [activeSort])

    useEffect(() => {
        if (modifyStatus) {
            setVisibleProducts('');
            getProductsAndDisplay();
        }
    }, [modifyStatus])

    useEffect(()=>{
        if(sortUpdateState){
            getFiltersAndDisplay();
        }
    }, [sortUpdateState])


    const handleLoginLogout = () => {
        if (activeUser) {
            setActiveUser(false); // Set the activeUser state to false, indicating user logout
            toast.success('User Logout Successfully!'); // Display a success toast message indicating successful logout
            localStorage.removeItem('feedbackUser'); // Remove the 'feedbackUser' item from localStorage
        } else {
            navigate('login'); // Navigate to the 'login' page
        }
    }
    

    const handleAddProducts = () => {
        if (activeUser) {
            setActivePopup('AddProducts'); // Set the active popup to 'AddProducts'
        } else {
            setActivePopup('LogIn'); // Set the active popup to 'LogIn'
        }
        setIsVisible(true); // Set the visibility of the popup to true
    }
    

    const handleFilter = (filter) => {
        setOptionsForDisplay(optionsForDisplay ? false : true)
        if (filter === 'Comments') {
            if (sortBy === 'comments') {
                setSortBy('');
                setChosenItem('Select');
            }
            else {
                setSortBy('comments');
                setChosenItem(filter);

            }
            setModifyStatus(true);

        }
        else if (filter === 'UpVotes') {
            if (sortBy === 'likes') {
                setChosenItem('Select');
                setSortBy('');
            }
            else {
                setSortBy('likes');
                setChosenItem(filter);

            }
            setModifyStatus(true);

        }
    }
    const handleSignUp = ()=>{
        if(!activeUser){
            navigate('signUp')
        }
    }


    return (
        <>
            <div className={component.HomeDiv}>
                <span className={component.HomeHeading}>Feedback</span>
                <div className={component.mainDiv}>
                    <span className={component.navButtons} onClick={handleLoginLogout}>{activeUser ? 'Logout' : 'Login'}</span>
                    <span className={component.navButtons} onClick={handleSignUp}>{activeUser ? `Welcome  ` : 'Sign up'}{activeUser &&  <h2> :/ </h2> }</span>
                </div>
            </div>
            <div className={component.Imagetext}>
                <div className={component.ImageContainer}>
                    <img src='../../Images/image1.png' className={component.HomeImage}></img>
                </div>
                <div className={component.textDiv}>
                    <span className={component.Addproduct}>Add your products and give your valuable feedback</span>
                    <span className={component.feedbackText}>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</span>
                </div>
            </div>

            <div className={component.formDiv}>
                {width > 600 &&
                    <div className={component.Filtersdiv}>
                        <div className={component.filtertextdiv}>
                            <span className={component.ApplyText}>Apply Filter</span>
                            <span className={component.feedbacktextbox}>Feedback</span>
                        </div>
                        <div className={component.TagsDiv}>
                            {visibleTags}
                        </div>
                    </div>}
                <div className={component.productsDiv}>

                    <div className={component.SuggestionsDiv}>
                        <div className={component.SuggestiononeDiv}>
                            <span className={component.SuggestionsText}> {itemNumber} Suggestions</span>
                        </div>
                        <div className={component.sortText}>
                            <div className={component.TextoneSort}>
                                <span className={component.Sortbytext} >Sort By: </span>
                            </div>

                            <div className={component.SelectContainer}>
                                <span className={component.OneSelectContainer} onClick={() => handleFilter('Select')}>&nbsp;{chosenItem}</span>
                                {optionsForDisplay && <span className={component.TwoSelectContainer} onClick={() => handleFilter('UpVotes')}>&nbsp; Upvotes</span>}
                                {optionsForDisplay && <span className={component.TwoSelectContainer} onClick={() => handleFilter('Comments')}>&nbsp; Comments</span>}

                            </div>
                        </div>
                        <div className={component.Product_btn} onClick={handleAddProducts}>+ Add Products</div>
                    </div>

                    {
                        width < 600 &&
                        <div className={component.WholeContainer}>
                            <div className={component.filtertext}>Filters: </div>
                            <div className={component.TagsDiv}>
                                {visibleTags}
                            </div>
                        </div>

                    }

                    <div className={component.VisibleProductdiv}>
                        {visibleProducts}
                    </div>
                </div>
            </div>
            {isVisible && <Modal show={activePopup} />}

        </>
    )
}


export default LandingPage;

