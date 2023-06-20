import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import FilterChip from '../../components/BoxFilter/BoxFilter'
import Modal from '../../components/modal/View'
import ProductBox from '../../components/product/ProductBox'
import styles from './Landing.module.css'
import { UserContext } from '../../App';
// import userIcon from "./userIcon.png"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplyFilter, getAllProducts } from '../../Client/api';
import useWindowResize from '../../hooks/useWindowResize';
export default
    function HomePage() {
    const navigate = useNavigate();

    const { userLoggedIn, setUserLoggedIn, modalToShow, setModalToShow, view, setView, filterSelected, sortBy, setSortBy, updateAvailable, setUpdateAvailable,filterUpdateAvailable, setFilterUpdateAvailable } = useContext(UserContext);
    const [productDisplay, setProductDisplay] = useState([]);
    const [tagDisplay, setTagDisplay] = useState([]);
    const [displaySortOptions, setDisplaySortOptions] = useState();
    const { width } = useWindowResize();
    const [displaySelect, setDisplaySelect] = useState('Select');
    const [productCount, setProductCount] = useState();

    useEffect(() => {
        setDisplaySortOptions(false);
    }, [])
    const getProductsAndDisplay = async () => {
        let query = '';
        if (sortBy && sortBy !== 'Select') {
            query += 'sort='
            query += sortBy;
        }
        if (filterSelected && filterSelected !== 'All') {
            if (query) {
                query += '&';
            }
            query += 'product_category='
            query += filterSelected;
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
            setProductDisplay(tempDisplay);
            setUpdateAvailable(false);
            setProductCount(tempDisplay.length);
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

                if (item === filterSelected) {
                    isSelected = true;
                }
                return (
                    <FilterChip
                        name={item}
                        isSelected={isSelected}
                    />
                )
            })

            setTagDisplay(tempDisplay);
            setFilterUpdateAvailable(false);
        }
        else {
            toast.error('Error in getting filters', { autoClose: 2000 });
        }
    }
    useEffect(() => {

        getFiltersAndDisplay();
    }, [filterSelected])

    useEffect(() => {
        if (updateAvailable) {
            setProductDisplay('');
            getProductsAndDisplay();
        }
    }, [updateAvailable])

    useEffect(()=>{
        if(filterUpdateAvailable){
            getFiltersAndDisplay();
        }
    }, [filterUpdateAvailable])

    const handleLoginLogout = () => {
        if (userLoggedIn) {
            setUserLoggedIn(false);
            toast.success('User Logged out!');
            localStorage.removeItem('feedbackUser');
        }
        else {
            navigate('login');
        }
    }

    const handleAddProducts = () => {
        if (userLoggedIn) {
            setModalToShow('AddProducts');
        }
        else {
            setModalToShow('LogIn');
        }
        setView(true);
    }

    const handleFilter = (filter) => {
        setDisplaySortOptions(displaySortOptions ? false : true)
        if (filter === 'Comments') {
            if (sortBy === 'comments') {
                setSortBy('');
                setDisplaySelect('Select');
            }
            else {
                setSortBy('comments');
                setDisplaySelect(filter);

            }
            setUpdateAvailable(true);

        }
        else if (filter === 'UpVotes') {
            if (sortBy === 'likes') {
                setDisplaySelect('Select');
                setSortBy('');
            }
            else {
                setSortBy('likes');
                setDisplaySelect(filter);

            }
            setUpdateAvailable(true);

        }
    }
    const handleSignUp = ()=>{
        if(!userLoggedIn){
            navigate('signUp')
        }
    }


    return (
        <>
            <div className={styles.header}>
                <span className={styles.text1}>Feedback</span>
                <div className={styles.HeaderBox}>
                    <span className={styles.logintext} onClick={handleLoginLogout}>{userLoggedIn ? 'Logout' : 'Login'}</span>
                    <span className={styles.logintext} onClick={handleSignUp}>{userLoggedIn ? `Hello  ` : 'Sign up'}{userLoggedIn &&  <h2> </h2>}</span>
                </div>
            </div>
            <div className={styles.bodyUpper}>
                <div className={styles.upLeft}>
                    <img src='../../Images/image1.png' className={styles.image1}></img>
                </div>
                <div className={styles.upRight}>
                    <span className={styles.text3}>Add your products and give your valuable feedback</span>
                    <span className={styles.text4}>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</span>
                </div>
            </div>

            <div className={styles.bodyLower}>
                {width > 600 &&
                    <div className={styles.lowerLeft}>
                        <div className={styles.box1}>
                            <span className={styles.text6}>Apply Filter</span>
                            <span className={styles.text5}>Feedback</span>
                        </div>
                        <div className={styles.box2}>
                            {tagDisplay}
                        </div>
                    </div>}
                <div className={styles.lowerRight}>

                    <div className={styles.box3}>
                        <div className={styles.box31}>
                            <span className={styles.text7}> {productCount} Suggestions</span>
                        </div>
                        <div className={styles.box32}>
                            <div className={styles.box321}>
                                <span className={styles.text8} >Sort By: </span>
                            </div>

                            <div className={styles.box322}>
                                <span className={styles.innerBox1} onClick={() => handleFilter('Select')}>&nbsp;{displaySelect}</span>
                                {displaySortOptions && <span className={styles.innerBox2} onClick={() => handleFilter('UpVotes')}>&nbsp; Upvotes</span>}
                                {displaySortOptions && <span className={styles.innerBox2} onClick={() => handleFilter('Comments')}>&nbsp; Comments</span>}

                            </div>
                        </div>
                        <div className={styles.box4} onClick={handleAddProducts}>+ Add Products</div>
                    </div>

                    {
                        width < 600 &&
                        <div className={styles.box00}>
                            <div className={styles.text9}>Filters: </div>
                            <div className={styles.box2}>
                                {tagDisplay}
                            </div>
                        </div>

                    }

                    <div className={styles.box5}>
                        {productDisplay}
                    </div>
                </div>
            </div>
            {view && <Modal show={modalToShow} />}

        </>
    )
}