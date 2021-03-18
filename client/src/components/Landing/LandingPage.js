import React, { useState, useEffect } from 'react';
import {
    Container,
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
var axios = require('axios');

const LandingPage = (props) => {
    const [login, setLogin] = useState(false);
    const [signInName, setSignInName] = useState('');
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [userParams, setUserParams] = useState(null);

    // ANTI-CSRF => set csrfToken on axios header request
    // But first we have to get jwt and set httpOnly cookie (on login or sign in)
    // Kako da postavim csrf token na header
   useEffect(() => {
        const getCsrfToken = async() => {
            const { data } = await axios.get('/csrf-token');
            axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
            console.log('OPALJENO')
        };
        getCsrfToken();

        if(localStorage.getItem('userId') && localStorage.getItem('token')) {
            Auth.login(() => {
                props.history.push('/home');
            })
        }
    }, [userParams]);  

    function handleSignInName(e) {
        console.log(e);
        setSignInName(e)
    }
    function handleSignInEmail(e) {
        console.log(e);
        setSignInEmail(e)
    }
    function handleSignInPassword(e) {
        console.log(e);
        setSignInPassword(e)
    }
    
    async function handleSignIn() {
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(signInEmail.match(mailFormat)) {
           console.log('pass')
            await axios.get('/newUser', {
                params: {
                    name: signInName,
                    email: signInEmail,
                    password: signInPassword
                }
            },
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                console.log(res.data);
                console.log(res.data.token);
                alert(`Welcome ${signInName}`);
                window.location.reload();
            })
            .catch(err => console.log(err.response.data)) 
            } else {
            alert('Uneli ste pogresno ime ili email adresu!')
        }  
    }

    function handleLoginEmail(e) {
        setLoginEmail(e)
    }

    function handleLoginPassword(e) {
        setLoginPassword(e)
    }

    function handleLoginState() {
        setLogin(true);
    }

    async function handleLogin() {
        await axios.get('/loginUser', {
            params: {
                email: loginEmail,
                password: loginPassword
        }})
        .then(res => {
            console.log(res.data);
            setUserParams(res);
            localStorage.setItem('userId', res.data.user.id)
            props.history.push('/home');
        })
        .catch(err => console.log(err))
        setLogin(false);
    }

    return (
        <Container style={{ textAlign: "center" }}>
            <h1>APARTMANI</h1>
            <div>
                <div>
                <h3 style={{ textAlign: "center" }}>Prijavi se ukoliko si korisnik</h3>
                <button onClick={handleLoginState}>Prijavi se</button>
                {login && (
                <>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Upisi email"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleLoginEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Upisi sifru"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleLoginPassword(e.target.value)}
                    />
                </InputGroup>
                <Button variant="success" onClick={handleLogin}>Prijavi se</Button>
                </>
                )}
                </div>
                <div>
                    <h3>Novi nalog?</h3>
                    <h4>Popunite formu kako biste registrovali novi nalog.</h4>
                    <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Upisi ime"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleSignInName(e.target.value)}
                    />
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Upisi email"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleSignInEmail(e.target.value)}
                    />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Upisi sifru"
                            aria-label=""
                            aria-describedby="basic-addon2"
                            onChange={(e) => handleSignInPassword(e.target.value)}
                        />
                    </InputGroup>
                    <Button variant="success" onClick={handleSignIn}>Prijavi se</Button>
                </div>
            </div>
        </Container>
    );
};

export default withRouter(LandingPage);