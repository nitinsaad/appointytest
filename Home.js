import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link , Redirect} from 'react-router-dom'
import Moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
    var access_token = localStorage.getItem('access_token');
    var username = localStorage.getItem('username');
    const [repos, setRepos] = useState([]);
    const [i, setI] = useState(5);
    const [isloading , setIsloading] = useState(true);

    useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.github.com/users/${username}/repos`)
            .then(result => {
                console.log(result)
                setRepos(result.data)
                setIsloading(false);
                //alert(result.data.login)
                //localStorage.setItem('username' , result.data.login)

            })
            .catch(error => console.log('error', error));
    }, [])

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        window.location = "/";
        // <Redirect to="/" />
    }
    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            // setRepos(repos.concat(Array.from({ length: 3 })))
            setI(i + 5);
        }, 1000);
    };
    if (access_token == null || access_token == '' || username == null) {
        return   window.location = "/";  // isko redirect krna hai
    }
    else {


        return (
            isloading ? <h2>Please Wait....</h2> :
            <div className="container" style={{backgroundColor:'GrayText'}}>
                


{/* 
                <div
                    id="scrollableDiv"
                    style={{
                        height: 600,
                        overflow: 'auto',                                            
                        // display: 'flex',
                        //flexDirection: 'column-reverse',
                        backgroundColor:'GrayText'
                    }}
                > */}
                    <div className="row alert alert-warning">
                        <span style={{fontSize:'50px'}}>Home</span>
                        <button className="btn btn-danger pull-right" onClick={() => logout()}>Logout</button>
                    </div>
                    <div className="row">
                        <h3 className=""> Your Repositories</h3><br/>
                    </div>
                    <InfiniteScroll
                        dataLength={repos.length}
                        next={()=>fetchMoreData()}
                        style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
                        inverse={true} //
                        hasMore={true}
                        loader={i < repos.length ? <h4>Loading...</h4> : ""}
                        
                    >
                        <div>
                        {
                            repos.slice(0, i).map(item => (
                                <div>
                                    <div className="row" style={{marginBottom:'20px'}}>

                                        <div className="col-md-1"></div>
                                        <div className="col-md-4">
                                            <div className="mt-30">
                                                <p className="">Name</p>
                                                <p className="mt-30">{item.name}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="mt-30">
                                                <p className="">Created Date</p>
                                                <p className="mt-30">{Moment(item.created_at).format('DD MMM YYYY')}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="mt-30">
                                                <a className="btn btn-primary" target="_blank" href={item.html_url} >Go To Repository</a>
                                            </div>
                                        </div>


                                        <div className="col-md-2">
                                            <div className="mt-30">
                                                <Link className="btn btn-warning" to={{
                                                    pathname: '/details',
                                                    item: { item }
                                                }}>Get Details</Link>
                                            </div>
                                        </div>
                                        <div className="col-md-1"></div>

                                    </div>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                </div>
                            ))
                        }
                        {/* <button className="btn btn-danger" hidden={i < repos.length ? false : true} onClick={()=>fetchMoreData()}>Get More</button> */}
                        </div>
                    </InfiniteScroll>
                </div>
            // </div>
        )
    }
}

export default Home
