import AddProduct from '../PostAdd/PostAdd'
import Login from '../login/Login'
import SignUp from '../signup/SignUp'
import component from "./View.module.css"

export default
    function Modal(props) {
    return (
        <div className={component.viewContainer}>
            <div className={component.subContainer}>
                <div className={component.divLside}>
                    {props.show === 'LogIn' && <Login />}
                    {props.show === 'SignUp' && <SignUp />}
                    {props.show === 'AddProducts' && <AddProduct edit={false} />}
                    {props.show === 'AddProductsEdit' && <AddProduct edit={true} />}
                </div>
                <div className={component.divRside}>
                    <span className={component.Heading}>Feedback</span>
                    <span className={component.subHeading}>Add your product and rate other items...</span>
                </div>
            </div>
        </div>
    )
}


