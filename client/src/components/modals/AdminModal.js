import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAdmin, register, pullRegistrationRequest } from '../../actions/authActions'
import M from 'materialize-css';

const AdminModal = ({ user: { user, isAuthenticated }, admin: { registrationRequests }, getAdmin, pullRegistrationRequest, register }) => {
    useEffect(() => {
       if(isAuthenticated === true){
         getAdmin();
       }
       M.AutoInit();
    }, [user]);

    const acceptRegistrationOnClick = (regReq) => {
        console.log("Registration accepted clicked");
        console.log("e.target");
        console.log(regReq);
        register(regReq);
        pullRegistrationRequest(regReq);
    }

    const denyRegistrationOnClick = (regReq) => {
        console.log("Registration denied clicked");
        pullRegistrationRequest(regReq);
    }

    return (
        <div id='adminModal'className='modal modal-fixed-footer'>
            <div className="modal-content">
                <h4 className="center">Pending Registration Requests</h4>
                    {registrationRequests && registrationRequests.map((regReq, index) => 
                        (<h5 className="row" key={index}>
                            <div className="col s12">
                                <div className="card grey darken-3">
                                    <div className="card-content white-text">
                                    <span className="card-title">
                                        {regReq.name && regReq.name }
                                    </span>
                                        <p>{regReq.email && regReq.email}</p>
                                    </div> 
                                    <div className="card-action">
                                        <a className="waves-effect green waves-green btn-flat" regRequest={regReq} onClick={() => acceptRegistrationOnClick(regReq)}>Accept</a>
                                        <a className="waves-effect red waves-red btn-flat" onClick={() => denyRegistrationOnClick(regReq)}>Deny</a>
                                    </div>
                                </div>
                            </div>
                        </h5>)
                    )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    admin: state.admin
});

export default connect(mapStateToProps, { getAdmin, register, pullRegistrationRequest })(AdminModal);