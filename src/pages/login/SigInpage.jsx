import { useContext, useState } from 'react'
import styles from './SignInPage.module.css'
import { ValidationForm } from '../../Client/Formvalidation';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import {LoginUser } from '../../Client/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    function LoginPage() {

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const {setUserLoggedIn} = useContext(UserContext);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setUserDetails((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleSubmit = async() => {
        const userToBeLoggedIn = {
            name: '0000000',
            email: userDetails.email,
            mobile: '0000000000',
            password: userDetails.password
        }
        const result = ValidationForm(userToBeLoggedIn);
        if (result.success) {
            const userLogIn = await LoginUser(userToBeLoggedIn);

            if(userLogIn.success){
                toast.success(userLogIn.message, {autoClose: 2000});
                setUserLoggedIn(true);
                navigate('/');
            }
            else{
                toast.error(userLogIn.message, {autoClose: 2000});
            }
            
        }
        else {
            setErrors(result.errors);
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
                    <input  placeholder='Email' className={styles.emailInput} name='email' onChange={handleChange}></input>
                </div>
                {errors.email && <span className={styles.MessageError}>{errors.email}</span>}
                <div className={styles.mid_div}>
                    <img src="../../Images/Lock.png" alt="password" className={styles.passwordIcon} />
                    <input  type="password" placeholder='Password' className={styles.passwordInput} name='password' onChange={handleChange} />
                </div>
                {errors.password && <span className={styles.MessageError}>{errors.password}</span>}
                <span className={styles.SignInbox}>Don’t have an account? <span className={styles.SignupText} onClick={handleSignUp}>Sign up </span></span>
                <div className={styles.btn_div}>
                    <span className={styles.button1} onClick={handleSubmit}>Login</span>
                </div>
            </div>
        </div>
    )
}


export default LoginPage;


