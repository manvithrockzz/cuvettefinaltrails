import SignUp from '../signup/SignUp'
import AddProduct from '../PostAdd/PostAdd'
import Login from '../login/Login'
import component from "./View.module.css"

 function Modal(props) {
    return (
        <div className={component.viewContainer}>
            <div className={component.subContainer}>
                <div className={component.divLside}>
                    {/* Render Login component when props.show is 'LogIn' */}
                    {props.show === 'LogIn' && <Login />}
                    {/* Render SignUp component when props.show is 'SignUp' */}
                    {props.show === 'SignUp' && <SignUp />}
                    {/* Render AddProduct component with edit set to false when props.show is 'AddProducts' */}
                    {props.show === 'AddProducts' && <AddProduct edit={false} />}
                    {/* Render AddProduct component with edit set to true when props.show is 'AddProductsEdit' */}
                    {props.show === 'AddProductsEdit' && <AddProduct edit={true} />}
                </div>
                <div className={component.divRside}>
                    <span className={component.Heading}>Feedback</span>
                    {/* Displays subheading!! */}
                    <span className={component.subHeading}>Add your product and rate other items...</span>
                </div>
            </div>
        </div>
    )
}


export default Modal;

