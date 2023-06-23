import { useContext, useState } from 'react'
import component from './SignInPage.module.css'
import { ValidationForm } from '../../Client/Formvalidation';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import {LoginUser } from '../../Client/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    function SignInPage() {

    const [clientInfo, setClientInfo] = useState({
        email: '',
        password: ''
    })
    const [issue, setIssue] = useState({});
    const {setActiveUser} = useContext(UserContext);
    const navigate = useNavigate();


    const processInput = (e) => {
        setClientInfo((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const attemptLogin = async() => {
        const userToBeLoggedIn = {
            name: '0000000',
            email: clientInfo.email,
            mobile: '0000000000',
            password: clientInfo.password
        }
        const result = ValidationForm(userToBeLoggedIn);
        if (result.success) {
            const userLogIn = await LoginUser(userToBeLoggedIn);

            if(userLogIn.success){
                toast.success(userLogIn.message, {autoClose: 2000});
                setActiveUser(true);
                navigate('/');
            }
            else{
                toast.error(userLogIn.message, {autoClose: 2000});
            }
            
        }
        else {
            setIssue(result.issue);
        }
    }

    const handleSignUp = () => {
        navigate('/signUp');
    }

    return (
        <div className={component.SignInDiv}>
            <h1 className={component.Heading}>Feedback</h1>
            <h3 className={component.SubHeading}>Add your products and give us your valuable feedback</h3>
            <div className={component.SigninContainer}>
                <div className={component.signinSubContainer}>
                    <img src="../../Images/IconE.png" alt="email" className={component.emailIcon} />
                    <input  placeholder='Email' className={component.emailInput} name='email' onChange={processInput}></input>
                </div>
                {issue.email && <span className={component.MessageError}>{issue.email}</span>}
                <div className={component.mid_div}>
                    <img src="../../Images/Lock.png" alt="password" className={component.passwordIcon} />
                    <input  type="password" placeholder='Password' className={component.passwordInput} name='password' onChange={processInput} />
                </div>
                {issue.password && <span className={component.MessageError}>{issue.password}</span>}
                <span className={component.SignInbox}>Don’t have an account? <span className={component.SignupText} onClick={handleSignUp}>Sign up </span></span>
                <div className={component.btn_div}>
                    <span className={component.button1} onClick={attemptLogin}>Login</span>
                </div>
            </div>
        </div>
    )
}


export default SignInPage;


