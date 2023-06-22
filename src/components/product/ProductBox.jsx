/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect, useState } from 'react'
import styles from './ProductBox.module.css'
import { Postcomment, Upvote } from '../../Client/api';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
    function ProductBox(props) {

    const [isChipsVisible, setisChipsVisible] = useState();
    const [commentDisplayState, setCommentDisplayState] = useState();
    const [isBoxCommentVisible, setIsBoxCommentVisible] = useState(); 
    const [commentText, setCommentText] = useState('');
    const [numLikes, setNumLikes] = useState();
    const [totalComments, setTotalComments] = useState();
    const { activeUser, setActivePopup, setIsVisible, setEditCandidate } = useContext(UserContext);

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
        if (activeUser) {
            setActivePopup('AddProductsEdit');
            setIsVisible(true);
            setEditCandidate(props);
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
                        <span className={styles.commentext} onClick={BoxtoggleComment}>Comment</span>
                        {activeUser && <span className={`${styles.editbutton} `} onClick={handleEdit}>Edit</span>}
                    </div>
                </div>
                <div className={styles.Divthree}>
                    <div className={styles.Divthree_One} onClick={handleLikes}>
                        <img src='../../Images/Upvote.png' className={styles.UpvoteIcon}></img>
                        <span className={styles.NumofLikes}>{numLikes}</span>
                    </div>
                    <div className={styles.Divthreetwo}>
                        <span className={styles.NumofComments}>{totalComments}</span>
                        <img src="../../Images/IconC1.png" alt="" className={styles.CommentIconOne} />
                    </div>
                </div>

            </div>
            {isBoxCommentVisible && <div className={styles.ProcutBoxContainerDiv}>
                <div className={styles.AddCommentDiv}>
                    <input className={styles.commentBox} placeholder='Add a comment...' onChange={handleCommentInputChange}></input>
                    <img src="../../Images/Submit.png" alt="" className={styles.SubmitIcon} onClick={handleSubmitComment} />
                </div>
                <div className={styles.DivcLASS}>
                    {commentDisplayState}
                </div>
            </div>}
        </>
    )
}


export default ProductBox;


