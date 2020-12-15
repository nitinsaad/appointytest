import React, { useState } from 'react'
import GitHubLogin from 'react-github-login';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

function Login() {

    const [isloading, setIsloading] = useState(false);

    const onSuccess = response => {
        setIsloading(true)
        console.log(response)
        axios.get(`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=c13dc1e1bf8d74359e95&redirect_uri=http://localhost:3000/&client_secret=ffd58ccdc063139c9b2c56c7a39f45eb38914016&code=${response.code}`)
            .then(result => {
                console.log(result)
                var str = result.data;
                var res = str.replace("access_token=", "")
                var res2 = res.replace("&scope=user%3Aemail&token_type=bearer", "")
                //alert(res2)
                localStorage.setItem('access_token', res2)
                getUserinfo(res2);
            })
            .catch(error => console.log('error', error));

    }
    const getUserinfo = (accesstoken) => {

        var requestOptions = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accesstoken
            }
        };
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.github.com/user`, requestOptions)
            .then(result => {
                console.log("user", result)
                //alert(result.data.login)
                localStorage.setItem('username', result.data.login)
                if (result.data.login != '') {
                    window.location = "/#/home"
                    setIsloading(false)
                    // <Redirect to="/#/home" />
                }

            })
            .catch(error => console.log('error', error));

    }
    return (
        <div style={{ height: '100%' }}>
            <div className="container" style={{ margin: '100px auto' }}>
                <h1>Welcome To Appointy Test</h1>
                <h3>Please Login Your Github Account</h3>
                <div className="row">
                    <br />
                    <div className="col-md-12">
                        <GitHubLogin
                            clientId="c13dc1e1bf8d74359e95"
                            redirectUri="http://localhost:3000"
                            onSuccess={onSuccess}
                            onFailure={console.log}
                            className="btn btn-primary" />
                    </div>
                </div>
                {isloading ? <h1>Please Wait ...</h1> : null}
            </div>
        </div>
    )
}

export default Login
