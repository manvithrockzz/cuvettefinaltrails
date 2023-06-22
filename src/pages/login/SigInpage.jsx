import { useContext, useState } from 'react'
import styles from './SignInPage.module.css'
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
        <div className={styles.SignInDiv}>
            <h1 className={styles.Heading}>Feedback</h1>
            <h3 className={styles.SubHeading}>Add your products and give us your valuable feedback</h3>
            <div className={styles.SigninContainer}>
                <div className={styles.signinSubContainer}>
                    <img src="../../Images/IconE.png" alt="email" className={styles.emailIcon} />
                    <input  placeholder='Email' className={styles.emailInput} name='email' onChange={processInput}></input>
                </div>
                {issue.email && <span className={styles.MessageError}>{issue.email}</span>}
                <div className={styles.mid_div}>
                    <img src="../../Images/Lock.png" alt="password" className={styles.passwordIcon} />
                    <input  type="password" placeholder='Password' className={styles.passwordInput} name='password' onChange={processInput} />
                </div>
                {issue.password && <span className={styles.MessageError}>{issue.password}</span>}
                <span className={styles.SignInbox}>Don’t have an account? <span className={styles.SignupText} onClick={handleSignUp}>Sign up </span></span>
                <div className={styles.btn_div}>
                    <span className={styles.button1} onClick={attemptLogin}>Login</span>
                </div>
            </div>
        </div>
    )
}


export default SignInPage;


