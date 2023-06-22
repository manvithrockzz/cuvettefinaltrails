import { useState } from 'react';
import styles from './SignUpPage.module.css'
import { ValidationForm} from '../../Client/Formvalidation';
import { useNavigate } from 'react-router-dom';
import { getsucessfullRegisteredUser } from '../../Client/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


    function SignUpPage() {

    const [clientInfo, setClientInfo] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const [issue, setIssue] = useState({});
    const navigate = useNavigate();


    const processInput = (e) => {
        setClientInfo((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }


    const attemptLogin = async () => {
        const userToBeValidated = {
            name: clientInfo.name,
            email: clientInfo.email,
            mobile: clientInfo.mobile,
            password: clientInfo.password
        }
        const result = ValidationForm(userToBeValidated);
        if (result.success) {
            const userRegistration = await getsucessfullRegisteredUser(userToBeValidated);

            if (userRegistration.success) {
                toast.success(userRegistration.message, { autoClose: 2000 });
                navigate('/login');
            }
            else {
                toast.error(userRegistration.message, {autoClose: 2000});
            }
        }
        else {
            setIssue(result.issue);
        }
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles.SignUpDiv}>

            <h1 className={styles.Headdingone}>Feedback</h1>
            <h3 className={styles.Headingtwo}>Add your products and give us your valuable feedback</h3>

            <div className={styles.SignupContainer}>

                <div className={styles.ImageDivOne}>
                    <img src="../../Images/IconU.png" alt="UIcon-Ima" className={styles.image1} />
                    <input placeholder='Name' className={styles.Entertextone} name='name' onChange={processInput} ></input>
                </div>
                {issue.name && <span className={styles.RedMessage}>{issue.name}</span>}

                <div className={styles.ImageDivOne}>
                    <img src="../../Images/IconE.png" alt="Enter your email adress" className={styles.image1} />
                    <input placeholder='Email' className={styles.Entertextone} name='email' onChange={processInput} ></input>
                </div>
                {issue.email && <span className={styles.RedMessage}>{issue.email}</span>}

                <div className={styles.ImageDivOne}>
                    <img src="../../Images/Phone.png" alt="Enter your ph number" className={styles.image1} />
                    <input type='Number' placeholder='Mobile' className={styles.Entertextone} name='mobile' onChange={processInput} ></input>
                </div>
                {issue.mobile && <span className={styles.RedMessage}>{issue.mobile}</span>}

                <div className={styles.ImageDivTwo}>
                    <img src="../../Images/Lock.png" alt="Password-img" className={styles.image2} />
                    <input type="password" placeholder='Password' className={styles.TwoEnterText} name='password' onChange={processInput} />
                </div>
                {issue.password && <span className={styles.RedMessage}>{issue.password}</span>}

                <span className={styles.LoginMessage}>Already have an account? <span className={styles.text3} onClick={handleLogin} >Login</span></span>

                <div className={styles.SignupBtn}>
                    <span className={styles.button1} onClick={attemptLogin} >Signup</span>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;

