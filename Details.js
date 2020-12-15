import React from 'react'
import axios from 'axios';
import Moment from 'moment';
import { Redirect , Link} from 'react-router-dom'

function Details(props) {
    var username = localStorage.getItem('username');
    const UpdateDetails = () => {
        axios.patch(`https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${username}/apptest`)
            .then(result => {
                console.log(result)
                //setRepos(result.data)               

            })
            .catch(error => console.log('error', error));
    }
    var details = props.location.item;
    if (details != undefined) {
        localStorage.setItem('Details', JSON.stringify(details));
    }
    else {
        details = JSON.parse(localStorage.getItem('Details'));
    }
    var access_token = localStorage.getItem('access_token');
    if (access_token == null || access_token == '') {
        return window.location = "/";  // isko redirect krna hai
    }
    else {
        return (
            <div className="container">
                {/* <h2>Details</h2>
                <div>
                   
                    <span>Name :- </span><span>{details.item.name}</span> <br />
                    <span>Description :- </span><span>{details.item.description}</span> <br />
                    <span>Github Repository :- </span><a target="_blank" href={details.item.html_url} >Link </a> <br />
                    <span>Created Date :- </span>{Moment(details.item.created_at).format('DD MM YYYY')}<br />
                   
                    <span>Issue Page <a target="_blank" href="https://github.com/issues">Move to Isssue Page</a></span>
                </div> */}

                <div class="jumbotron jumbotron-fluid" style={{ backgroundColor: 'Highlight', marginTop: '20px' }}>
                    <div class="container">
                        <Link to="/home" className="btn btn-default pull-left">Back</Link>
                        <h1 >
                            {details.item.name}
                        </h1>

                        <p>Description : {details.item.description}</p>
                        <p>Created-On : {Moment(details.item.created_at).format('DD MMM YYYY')}</p>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <a className="btn btn-warning" target="_blank" href="https://github.com/issues">Go to Isssue Page</a>
                                </div>
                                <div className="col-md-6">
                                    <a className="btn btn-danger" target="_blank" href={details.item.html_url} >Go To Repository </a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}

export default Details
