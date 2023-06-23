import component from './Login.module.css'
import { ValidationForm } from '../../Client/Formvalidation';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';
import { LoginUser } from '../../Client/api';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';



    function Login() {
        // used to track & display login issues or errors.
    const [clientInfo, setClientInfo] = useState({
        //  initial state containing email and password properties.
        email: '',
        // both initially set to empty strings.
        password: ''
    })
    // used to handle and display any login-related issues or errors,
    const [issue, setIssue] = useState({});
    // used to manage user-related state and UI components.
    const { setActiveUser, setActivePopup } = useContext(UserContext);


    // callback function is triggered when event occurs
    const processInput = (e) => {
        setClientInfo((prevDetails) => {
            //  typically associated with user input in a form field.
            return {
                // create a shallow copy of the previous state object
                ...prevDetails,
                // allow to retain any existing properties as updated
                [e.target.name]: e.target.value
            }
        })
    }


    const attemptLogin = async () => {
            // Created an object with user information for login
        const userToBeLoggedIn = {
            name: '0000000',
            email: clientInfo.email,
            mobile: '0000000000',
            password: clientInfo.password
        }

            //  form validation on the user input
        const result = ValidationForm(userToBeLoggedIn);
        if (result.success) {
            // if, validation was successful, then proceed for API call for login
            const userLogIn = await LoginUser(userToBeLoggedIn);

            if (userLogIn.success) {
                // The login API call was successful
                toast.success(userLogIn.message, { autoClose: 2000 });
                // auto-close the message after 2 seconds
                setActiveUser(true);
                // it will sets as true then add product page is visible
                setActivePopup('AddProducts');
            }
            else {
                // if API call fails, display with error message
                toast.error(userLogIn.message, { autoClose: 2000 });
            }

        }
        else {
            // if form validation fails then set to display to the user
            setIssue(result.issue);
        }
    }

    const handleSignUp = () => {
        // Set active popup to 'SignUp'
        setActivePopup('SignUp');
    }

    return (
       
            <div className={component.signinContainer}>
            <span className={component.signinMessage}>Log-in to continue</span>
            <div className={component.mainDiv}>
                <img src="../../Images/IconE.png" alt="Enter your Email adress" className={component.emailIcon} />
                <input placeholder='Email' className={component.entervalueOne} name='email' onChange={processInput}></input>
            </div>
                {/* Display error message for email field */}
            {issue.email && <span className={component.error}>{issue.email}</span>}
            <div className={component.subDiv}>
                <img src="../../Images/Lock.png" alt="Enter your password" className={component.passwordIcon} />
                <input type="password" placeholder='Password' className={component.entervalueTwo} name='password' onChange={processInput} />
            </div>
                {/* Display error message for password field */}
            {issue.password && <span className={component.error}>{issue.password}</span>}
            <span className={component.bottomDiv}>Don’t have an account? <span className={component.signupMessage} onClick={handleSignUp}>Sign up </span></span>
            <div className={component.buttonDiv}>
                <span className={component.loginButton} onClick={attemptLogin}>Login</span>
            </div>
        </div>
      

    )
}



export default Login
