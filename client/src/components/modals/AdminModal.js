import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRegistrationRequests } from '../../actions/authActions'
import M from 'materialize-css';

const AdminModal = ({ admin: { registrationRequests }, getRegistrationRequests }) => {
    useEffect(() => {
        //getRegistrationRequests();
        M.AutoInit();
    }, [registrationRequests])

    const acceptRegistrationOnClick = () => {
        console.log("Registration accepted clicked");
    }

    const denyRegistrationOnClick = () => {
        console.log("Registration denied clicked");
    }

    return (
        <div id='adminModal'className='modal modal-fixed-footer'>
            <div className="modal-content">
                <h4 className="center">Pending Registration Requests</h4>

                <h5 className="row">
                    <div className="col s12">
                        <div className="card grey darken-3">
                            <div className="card-content white-text">
                            <span className="card-title">
                                Don Joe
                            </span>
                                <p>DonJoe@gmail.com</p>
                            </div> 
                            <div className="card-action">
                                <a className="waves-effect green waves-green btn-flat" onClick={acceptRegistrationOnClick}>Accept</a>
                                <a className="waves-effect red waves-red btn-flat" onClick={denyRegistrationOnClick}>Deny</a>
                            </div>
                        </div>
                    </div>
                </h5>
                <h5 className="row">
                    <div className="col s12">
                        <div className="card grey darken-3">
                            <div className="card-content white-text">
                            <span className="card-title">
                                Don Joe
                            </span>
                            <p>DonJoe@gmail.com</p>
                            </div> 
                            <div className="card-action">
                                <a className="waves-effect green waves-green btn-flat" onClick={acceptRegistrationOnClick}>Accept</a>
                                <a className="waves-effect red waves-red btn-flat" onClick={denyRegistrationOnClick}>Deny</a>
                            </div>
                        </div>
                    </div>
                </h5>
                <h5 className="row">
                    <div className="col s12">
                        <div className="card grey darken-3">
                            <div className="card-content white-text">
                            <span className="card-title">
                                Don Joe
                            </span>
                            <p>DonJoe@gmail.com</p>
                            </div> 
                            <div className="card-action">
                                <a className="waves-effect green waves-green btn-flat" onClick={acceptRegistrationOnClick}>Accept</a>
                                <a className="waves-effect red waves-red btn-flat" onClick={denyRegistrationOnClick}>Deny</a>
                            </div>
                        </div>
                    </div>
                </h5>
                <h5 className="row">
                    <div className="col s12">
                        <div className="card grey darken-3">
                            <div className="card-content white-text">
                            <span className="card-title">
                                Don Joe
                            </span>
                            <p>DonJoe@gmail.com</p>
                            </div> 
                            <div className="card-action">
                                <a className="waves-effect green waves-green btn-flat" onClick={acceptRegistrationOnClick}>Accept</a>
                                <a className="waves-effect red waves-red btn-flat" onClick={denyRegistrationOnClick}>Deny</a>
                            </div>
                        </div>
                    </div>
                </h5>


            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin
});

export default connect(mapStateToProps, { getRegistrationRequests })(AdminModal);