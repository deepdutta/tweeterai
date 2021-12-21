import React , {useState} from 'react';
import {kyubiExtensionId}  from "../../config";
import AuthServices from "../../services/authService";
import { useNavigate } from 'react-router-dom';

const Login = ()=> {

    const navigate = useNavigate();

    // For defining Initial State

    const [state , setState] = useState({
        email : "",
        password : "",
        errorMessage: ""
    })

   

    // For Handling onChange of the Form Input Elements

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    // For form validation

    const validation= () =>
    {
        console.log('Getting Called');
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let checkResult = emailRegex.test(String(state.email).toLowerCase());
        let formIsValid = true;

        if (!state.email) {
            formIsValid = false;
            setState(prevState => ({
                ...prevState,
               ['errorMessage'] : 'Email Is Required'
            }))
            return formIsValid;
        }
        else if (checkResult === false) {
            formIsValid = false;
            setState(prevState => ({
                ...prevState,
               ['errorMessage'] : 'Please enter a proper email'
            }));
            return formIsValid;
        }
        else if (!state.password) {
            formIsValid = false;
            setState(prevState => ({
                ...prevState,
               ['errorMessage'] : 'Password Is Required'
            }));
            return formIsValid;
            }
            else{
                formIsValid = true;
                return formIsValid;
            }
            
            return formIsValid;
       
    }

    // For Submitting the login form

    const loginButtonHandler = async (e) =>{
        e.preventDefault();
        if(validation())
        {
            setState(prevState => ({
                ...prevState,
               ['errorMessage'] : ''
            }));
            let payload  ={
                extensionId: kyubiExtensionId,
                email: state.email,
                password: state.password,
            }
            await AuthServices.login(payload).then(async result=>{
                if(result.data.code  === 1){
                    let token = result.data.token;
                    let tokens = token.split(".");
                    tokens =atob(tokens[1]);
                    let myObj = JSON.parse(tokens);
                    console.log("Tis Is my Obj",myObj)
                    localStorage.setItem('kyubi_user_token', myObj.user.id);
                    navigate('/dashboard');
                  
                }else{
                   
                    setState(prevState => ({
                        ...prevState,
                       ['errorMessage'] : 'User not found or In-Active'
                    }));
                }
                

            }).catch(error=>{
                console.log(error);
                setState(prevState => ({
                    ...prevState,
                   ['errorMessage'] : 'User not found or In-Active'
                }));
            });
        }
        
    }
    
    return (

        <div className="inBody d-flex flex-column">
        <div className="extHeader text-center">
            <figure className="logo-basic">
                <img src="./images/logo.png" alt="" />
            </figure>
        </div>
        <div className="extBody">
            <div className="formOuter">
                <h3>
                    <small>Welcome,</small>
                    Login to continue!
                </h3>
                <form action="">
                    { state.errorMessage && (
                    <div  className="form-error-message" >{state.errorMessage}</div>
                    )}
                    <div className="form-group ">
                        <input type="email" name="email" id="email" value={state.email}
                       onChange={handleChange} className="login-input" placeholder="Enter your email"  autoComplete="off"/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password"  className="login-input" id="password" placeholder="Password" autoComplete="off" value={state.password}
                        onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btnSubmit" type="button" id="login" onClick={loginButtonHandler}>
                            Login
                        </button>
                    </div>
                    <div className="form-group form-forget text-center">
                        <a href="./forgot-pass.html">
                            Forgot Password?
                        </a>
                        <p>Don’t have an account? <a href="javascript:void(0)" target="_blank" id="sign_up_link">Sign Up Now</a></p>
                    </div>
                </form>
                {/* <div  className="form-error-message">Please enter valid credentials or user is in-active</div> */}
            </div>
        </div>
        
        <div className="extFooter">
            <p>Powered by <a target="_blank" href="https://www.tier5.us/" id="powered_by">Tier5</a> and the <a target="_blank"
                    href="https://partnership.tier5.us/jr-partner1" id="official_page">Tier5
                    Partnerhsip</a></p>

            <div className="supportFooter">
                <a href="https://www.facebook.com/tier5development" target="_blank" id="chat_support">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.66" height="21.66" viewBox="0 0 21.66 21.66"><path d="M18.952,21.66H2.707A2.705,2.705,0,0,1,0,18.952V2.707A2.705,2.705,0,0,1,2.707,0H18.952A2.705,2.705,0,0,1,21.66,2.707V18.952a2.705,2.705,0,0,1-2.707,2.707ZM6.436,8.564v3.008h2.6v7.719H12.14V11.572h2.591l.388-3.008H12.14V6.643a2.609,2.609,0,0,1,.057-.6,1.089,1.089,0,0,1,.22-.463,1.006,1.006,0,0,1,.454-.3,2.307,2.307,0,0,1,.76-.106h1.593V2.488A21.2,21.2,0,0,0,12.9,2.369,3.64,3.64,0,0,0,9.034,6.346V8.564Z" transform="translate(0 0)"/></svg>
                </a>

                <a href="#" id="fb_group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.66" height="21.66" viewBox="0 0 21.66 21.66"><g transform="translate(0 0)"><path d="M20.942,23.657H4.707A2.643,2.643,0,0,1,2,20.965V4.707A2.643,2.643,0,0,1,4.707,2H20.95a2.643,2.643,0,0,1,2.707,2.707V20.95a2.723,2.723,0,0,1-2.715,2.707ZM11.66,9.525,5.38,16.131l5.693-3.094,2.97,3.094,6.234-6.605L14.63,12.619Z" transform="translate(-1.998 -1.998)"/></g></svg>
                </a>
            </div>
        </div>
    </div>
    );

};

export default Login;