import AddProduct from '../addProduct/AddProduct'
import Login from '../login/Login'
import SignUp from '../signup/SignUp'
import styles from "./View.module.css"

export default
    function Modal(props) {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.subContainer}>
                <div className={styles.divLside}>
                    {props.show === 'LogIn' && <Login />}
                    {props.show === 'SignUp' && <SignUp />}
                    {props.show === 'AddProducts' && <AddProduct edit={false} />}
                    {props.show === 'AddProductsEdit' && <AddProduct edit={true} />}
                </div>
                <div className={styles.divRside}>
                    <span className={styles.Heading}>Feedback</span>
                    <span className={styles.subHeading}>Add your product and rate other items...</span>
                </div>
            </div>
        </div>
    )
}


