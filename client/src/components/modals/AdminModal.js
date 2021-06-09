import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRegistrationRequests } from '../../actions/authActions'
import M from 'materialize-css';

const AdminModal = ({ admin: { registrationRequests }, getRegistrationRequests }) => {
    useEffect(() => {
        getRegistrationRequests();
        M.AutoInit();
    }, [])

    return (
        <div id='buildModal'className='modal modal-fixed-footer'>
            <div className="modal-content">

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    admin: state.admin
}

export default connect(mapStateToProps, { getRegistrationRequests })(AdminModal);