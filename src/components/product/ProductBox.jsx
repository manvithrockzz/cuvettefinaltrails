/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect, useState } from 'react'
import component from './ProductBox.module.css'
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
                <span className={component.chipItems}>{item}</span>
            )
        })

        const isCommentsDisplayed = props.comments.map((item) => {
            return (
                <span className={component.comments}>{item}</span>
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
            newCommentsArray.push(<span className={component.comments}>{commentText}</span>)
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
            <div className={component.ProductBoxContainer}>
                <img src={props.logo} className={component.HomeImage}></img>
                <div className={component.mainDiv}>
                    <span className={component.HeadingOne}>{props.name}</span>
                    <span className={component.HeadingTwo}> {props.description}</span>
                    <div className={component.productBoxDiv}>
                        {isChipsVisible}
                        <img src="../../Images/IconC2.png" alt="" className={component.commentIcon} onClick={BoxtoggleComment} />
                        <span className={component.commentext} onClick={BoxtoggleComment}>Comment</span>
                        {activeUser && <span className={`${component.editbutton} `} onClick={handleEdit}>Edit</span>}
                    </div>
                </div>
                <div className={component.Divthree}>
                    <div className={component.Divthree_One} onClick={handleLikes}>
                        <img src='../../Images/Upvote.png' className={component.UpvoteIcon}></img>
                        <span className={component.NumofLikes}>{numLikes}</span>
                    </div>
                    <div className={component.Divthreetwo}>
                        <span className={component.NumofComments}>{totalComments}</span>
                        <img src="../../Images/IconC1.png" alt="" className={component.CommentIconOne} />
                    </div>
                </div>

            </div>
            {isBoxCommentVisible && <div className={component.ProcutBoxContainerDiv}>
                <div className={component.AddCommentDiv}>
                    <input className={component.commentBox} placeholder='Add a comment...' onChange={handleCommentInputChange}></input>
                    <img src="../../Images/Submit.png" alt="" className={component.SubmitIcon} onClick={handleSubmitComment} />
                </div>
                <div className={component.DivcLASS}>
                    {commentDisplayState}
                </div>
            </div>}
        </>
    )
}


export default ProductBox;


