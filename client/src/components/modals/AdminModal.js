import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAdmin, register, pullRegistrationRequest } from '../../actions/authActions'
import M from 'materialize-css';

const AdminModal = ({ admin: { registrationRequests }, getAdmin, pullRegistrationRequest, register }) => {
    useEffect(() => {
        getAdmin();
        M.AutoInit();
    }, [registrationRequests])

    const acceptRegistrationOnClick = (e) => {
        console.log("Registration accepted clicked");
        register(e.target.regReq);
        pullRegistrationRequest(e.target.regReq);
    }

    const denyRegistrationOnClick = (e) => {
        console.log("Registration denied clicked");
        pullRegistrationRequest(e.target.regReq);
    }

    return (
        <div id='adminModal'className='modal modal-fixed-footer'>
            <div className="modal-content">
                <h4 className="center">Pending Registration Requests</h4>
                    {registrationRequests.map((regReq, index) => 
                        (<h5 className="row" reqRequest={regReq} key={index}>
                            <div className="col s12">
                                <div className="card grey darken-3">
                                    <div className="card-content white-text">
                                    <span className="card-title">
                                        {regReq.name && 'Ey Ror'}
                                    </span>
                                        <p>{regReq.email && 'Error@gmail.com'}</p>
                                    </div> 
                                    <div className="card-action">
                                        <a className="waves-effect green waves-green btn-flat" onClick={acceptRegistrationOnClick}>Accept</a>
                                        <a className="waves-effect red waves-red btn-flat" onClick={denyRegistrationOnClick}>Deny</a>
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
    admin: state.admin
});

export default connect(mapStateToProps, { getAdmin, register, pullRegistrationRequest })(AdminModal);