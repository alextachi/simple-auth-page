import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RedditSimple } from 'reddit-simple'

//Components
import { Input, Button, MemePopup } from '../../components';

//Styles
import './auth.scss';

//Images
import redditIcon from '../../assets/images/reddit_icon.png';
import loadingGif from '../../assets/images/loading_anim.svg';

//Utils
import { validateField } from '../../utils/';

//redux
import { authUser} from '../../redux/actions/users';

const Auth = () => {

    const dispatch = useDispatch();
    const userData = useSelector(({ user }) => user.data);
    const isAuth = useSelector(({ user }) => user.isAuth);

    const [emailValid, setEmailValid] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [email, setEmail] = useState(null);

    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [password, setPassword] = useState(null);

    const [formValid, setFormValid] = useState(false);

    const [randomMemeUrl, setRandomMemeUrl] = useState(null);
    const [memeLoaded, setMemeLoaded] = useState(false);
    const [isMemeLoading, setIsMemeLoading] = useState(false);

    const validateForm = () => {
        setFormValid(emailValid && passwordValid);
    }

    /**
     * Validating email
     */
    useEffect(() => {
        validateForm();
        // eslint-disable-next-line
    }, [emailValid]);


    /**
     * Validating password
     */
    useEffect(() => {
        validateForm();
        // eslint-disable-next-line
    }, [passwordValid]);

    /**
     * Catch data from actions
     */
    useEffect(() => {
        if (isAuth && userData) {
            alert(`Authorized\nYour name: ${userData.full_name}\nYour height: ${userData.height}\nYour weight: ${userData.weight}\nYour debut: ${userData.debut}`);
        }
    }, [userData, isAuth]);


    /**
     * Catch meme 
     */
    useEffect(() => {
        console.log(memeLoaded);

    }, [memeLoaded]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authUser(email, password));
    };


    const loadRandomMeme = (e) => {
        setIsMemeLoading(true);
        RedditSimple.RandomPost('programmerHumor').then(res => {
            if (res[0]?.data.url) {
                setRandomMemeUrl(res[0]?.data.url);
                setMemeLoaded(true);
            }
        }).catch(err => {
            console.log(err);
            alert("Error while loading meme");
        })
            .finally(() => {
                setIsMemeLoading(false);
            })
    };

    const handleCloseModal = () => {
        setMemeLoaded(false);
        setRandomMemeUrl(null);
    }


    return (
        <section className="auth">
            <MemePopup trigger={memeLoaded} imageURL={randomMemeUrl} onClose={handleCloseModal} />
            <div className="auth__bg"></div>
            <div className="auth__wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col col-2 col-xl-1 offset-xl-1">
                            <div className="auth__form-wrap">
                                <div className="auth__header">
                                    <h1 className="auth__title">Authorization form</h1>
                                    <p className="auth__subtitle">Login: jonn@earth.com | password: thisisNotPassword</p>
                                </div>
                                <form className="auth__form" onSubmit={handleSubmit}>
                                    <Input
                                        inputName="email"
                                        inputType="email"
                                        labelText="Your e-mail:"
                                        errorMessage={emailErrorMessage}
                                        onInputHandler={(event) => {
                                            const validationResult = validateField('email', event.target.value);
                                            setEmailErrorMessage(validationResult.email.message);
                                            setEmailValid(validationResult.email.valid);
                                            setEmail(event.target.value);
                                        }} />

                                    <Input
                                        inputName="password"
                                        inputType="password"
                                        labelText="Your password:"
                                        errorMessage={passwordErrorMessage}
                                        onInputHandler={(event) => {
                                            const validationResult = validateField('password', event.target.value);
                                            setPasswordValid(validationResult.password.valid);
                                            setPasswordErrorMessage(validationResult.password.message);
                                            setPassword(event.target.value)
                                        }} />
                                    <br />
                                    <div className="input__field">
                                        <Button disabled={!formValid} submit>Log in</Button>
                                    </div>

                                    <div className="input__field">
                                        <div className="input__split-wrapper">
                                            <div className="input__split-text">or look at some Reddit meme</div>
                                        </div>
                                    </div>
                                </form>
                                <br />
                                <div className="auth-buttons">
                                    {isMemeLoading ?
                                        <img src={loadingGif} className="loading-image" alt="Loading"/>
                                        :
                                        <Button primary icon title="Find random reddit meme" onClick={loadRandomMeme}>
                                            <img src={redditIcon} alt="Reddit icon" />
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;