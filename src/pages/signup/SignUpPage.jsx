import { useState } from 'react';
import component from './SignUpPage.module.css'
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
        <div className={component.SignUpDiv}>

            <h1 className={component.Headdingone}>Feedback</h1>
            <h3 className={component.Headingtwo}>Add your products and give us your valuable feedback</h3>

            <div className={component.SignupContainer}>

                <div className={component.ImageDivOne}>
                    <img src="../../Images/IconU.png" alt="UIcon-Ima" className={component.image1} />
                    <input placeholder='Name' className={component.Entertextone} name='name' onChange={processInput} ></input>
                </div>
                {issue.name && <span className={component.RedMessage}>{issue.name}</span>}

                <div className={component.ImageDivOne}>
                    <img src="../../Images/IconE.png" alt="Enter your email adress" className={component.image1} />
                    <input placeholder='Email' className={component.Entertextone} name='email' onChange={processInput} ></input>
                </div>
                {issue.email && <span className={component.RedMessage}>{issue.email}</span>}

                <div className={component.ImageDivOne}>
                    <img src="../../Images/Phone.png" alt="Enter your ph number" className={component.image1} />
                    <input type='Number' placeholder='Mobile' className={component.Entertextone} name='mobile' onChange={processInput} ></input>
                </div>
                {issue.mobile && <span className={component.RedMessage}>{issue.mobile}</span>}

                <div className={component.ImageDivTwo}>
                    <img src="../../Images/Lock.png" alt="Password-img" className={component.image2} />
                    <input type="password" placeholder='Password' className={component.TwoEnterText} name='password' onChange={processInput} />
                </div>
                {issue.password && <span className={component.RedMessage}>{issue.password}</span>}

                <span className={component.LoginMessage}>Already have an account? <span className={component.text3} onClick={handleLogin} >Login</span></span>

                <div className={component.SignupBtn}>
                    <span className={component.button1} onClick={attemptLogin} >Signup</span>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;



