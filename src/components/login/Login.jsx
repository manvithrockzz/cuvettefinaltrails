import { useContext, useState } from 'react';
import component from './Login.module.css'
import { ValidationForm } from '../../Client/Formvalidation';
import { LoginUser } from '../../Client/api';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';


export default
    function Login() {

    const [clientInfo, setClientInfo] = useState({
        email: '',
        password: ''
    })
    const [issue, setIssue] = useState({});
    const { setActiveUser, setActivePopup } = useContext(UserContext);


    const processInput = (e) => {
        setClientInfo((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const attemptLogin = async () => {
        const userToBeLoggedIn = {
            name: '0000000',
            email: clientInfo.email,
            mobile: '0000000000',
            password: clientInfo.password
        }
        const result = ValidationForm(userToBeLoggedIn);
        if (result.success) {
            // do the API call
            const userLogIn = await LoginUser(userToBeLoggedIn);

            if (userLogIn.success) {
                toast.success(userLogIn.message, { autoClose: 2000 });
                setActiveUser(true);
                setActivePopup('AddProducts');
            }
            else {
                toast.error(userLogIn.message, { autoClose: 2000 });
            }

        }
        else {
            setIssue(result.issue);
        }
    }

    const handleSignUp = () => {
        setActivePopup('SignUp');
    }

    return (
       
            <div className={component.signinContainer}>
            <span className={component.signinMessage}>Log-in to continue</span>
            <div className={component.mainDiv}>
                <img src="../../Images/IconE.png" alt="Enter your Email adress" className={component.emailIcon} />
                <input placeholder='Email' className={component.entervalueOne} name='email' onChange={processInput}></input>
            </div>
            {issue.email && <span className={component.error}>{issue.email}</span>}
            <div className={component.subDiv}>
                <img src="../../Images/Lock.png" alt="Enter your password" className={component.passwordIcon} />
                <input type="password" placeholder='Password' className={component.entervalueTwo} name='password' onChange={processInput} />
            </div>
            {issue.password && <span className={component.error}>{issue.password}</span>}
            <span className={component.bottomDiv}>Don’t have an account? <span className={component.signupMessage} onClick={handleSignUp}>Sign up </span></span>
            <div className={component.buttonDiv}>
                <span className={component.loginButton} onClick={attemptLogin}>Login</span>
            </div>
        </div>
      

    )
}



