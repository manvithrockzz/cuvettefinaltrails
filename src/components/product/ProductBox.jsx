/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect, useState } from 'react'
import styles from './ProductBox.module.css'
import { Postcomment, Upvote } from '../../Client/api';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
export default
    function ProductBox(props) {

    const [isChipsVisible, setisChipsVisible] = useState();
    const [commentDisplayState, setCommentDisplayState] = useState();
    const [isBoxCommentVisible, setIsBoxCommentVisible] = useState(); 
    const [commentText, setCommentText] = useState('');
    const [numLikes, setNumLikes] = useState();
    const [totalComments, setTotalComments] = useState();
    const { userLoggedIn, setModalToShow, setView, setProductToEdit } = useContext(UserContext);

    useEffect(() => {
        const isChipsShown = props.tags.map((item) => {
            return (
                <span className={styles.chipItems}>{item}</span>
            )
        })

        const isCommentsDisplayed = props.comments.map((item) => {
            return (
                <span className={styles.comments}>{item}</span>
            )
        })

        setCommentDisplayState(isCommentsDisplayed);
        setisChipsVisible( isChipsShown);
        setIsBoxCommentVisible(false);
        setNumLikes(props.likes);
        setTotalComments(props.comments_count);
    }, [])


    const BoxtoggleComment = () => {
        setIsBoxCommentVisible(isBoxCommentVisible ? false : true);
    }

    const handleCommentInputChange = (e) => {
        setCommentText(() => {
            return e.target.value

        })
    }

    const handleSubmitComment = async () => {
        const result = await Postcomment({
            id: props.id,
            comment: commentText
        })
        if (result.success) {
            setTotalComments(totalComments + 1);
            const newCommentsArray = commentDisplayState.map(item => item)
            newCommentsArray.push(<span className={styles.comments}>{commentText}</span>)
            setCommentDisplayState(newCommentsArray);
        }
        else {
            toast.error(result.message, { autoClose: 2000 })
        }
    }

    const handleLikes = async () => {
        const result = await Upvote(props.id);
        if (result.success) {
            setNumLikes(numLikes + 1);
        }
        else {
            toast.error(result.message, { autoClose: 2000 })
        }
    }

    const handleEdit = () => {
        if (userLoggedIn) {
            setModalToShow('AddProductsEdit');
            setView(true);
            setProductToEdit(props);
        }

    }


    return (
        <>
            <div className={styles.ProductBoxContainer}>
                <img src={props.logo} className={styles.HomeImage}></img>
                <div className={styles.mainDiv}>
                    <span className={styles.HeadingOne}>{props.name}</span>
                    <span className={styles.HeadingTwo}> {props.description}</span>
                    <div className={styles.productBoxDiv}>
                        {isChipsVisible}
                        <img src="../../Images/IconC2.png" alt="" className={styles.commentIcon} onClick={BoxtoggleComment} />
                        <span className={styles.text4} onClick={BoxtoggleComment}>Comment</span>
                        {userLoggedIn && <span className={`${styles.button1} `} onClick={handleEdit}>Edit</span>}
                    </div>
                </div>
                <div className={styles.box3}>
                    <div className={styles.box31} onClick={handleLikes}>
                        <img src='../../Images/Upvote.png' className={styles.image2}></img>
                        <span className={styles.text3}>{numLikes}</span>
                    </div>
                    <div className={styles.box32}>
                        <span className={styles.text5}>{totalComments}</span>
                        <img src="../../Images/IconC1.png" alt="" className={styles.image5} />
                    </div>
                </div>

            </div>
            {isBoxCommentVisible && <div className={styles.main2}>
                <div className={styles.top}>
                    <input className={styles.commentBox} placeholder='Add a comment...' onChange={handleCommentInputChange}></input>
                    <img src="../../Images/Submit.png" alt="" className={styles.image4} onClick={handleSubmitComment} />
                </div>
                <div className={styles.bottom}>
                    {commentDisplayState}
                </div>
            </div>}
        </>
    )
}



