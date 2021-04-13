import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import { deleteJob } from '../../actions/jobActions';

const DeleteJobModal = ({ user: { user }, jobNumber, jobID, updateUser, deleteJob }) => {
    const deleteJobHandler = () => {
        // handleCardButtonClick(jobID);
        // setSelectedJobID(jobID);
        console.log("delete button clicked");
        console.log("jobID is: ");
        console.log(jobID);
        deleteJob(jobID);
        updateUser({
          ...user, 
          requestedJobs: [
            ...user.requestedJobs.filter(requestedJobID => requestedJobID != jobID)
          ]
        })
      }

    return ( 
        <div>
            <a className="btn-small teal truncate modal-trigger" style={{margin: '5px'}} 
                href={`#myJobListDeleteModal${jobNumber}`}>
                <i class="small material-icons left">delete_forever</i>Delete
            </a>
            <div id={`myJobListDeleteModal${jobNumber}`} className="modal">
            <div className="modal-content grey darken-3">
                <h5>Are you sure you want to delete Job {jobNumber}?</h5>
                <h6>Deleted job requests cannot be restored.</h6>
                <div className="grey darken-4">
                    <ul>
                        <li className="left-align">
                            - If you wish to keep a record of the request, use Edit > Change Status to Cancelled instead.
                        </li>
                        <li className="left-align">
                            - If the deletion is to correct some mistakes, use the Edit button.
                        </li>
                        <li className="left-align">
                            - If you want to redo the request with more parts, it is suggested to create another request
                        </li>
                        <li className="left-align">
                            - If you want to redo the request with fewer parts, it is suggested to 
                            use Edit > Change Status to Complete when you have received the parts you do want.
                        </li>
                        <li className="left-align">
                            - If the request must be redone,   
                            Use Create Job > Refill to fill in the form with the values of the
                            last request for your convenience.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="modal-footer grey darken-3">
                <a href="#!" className="modal-close green btn-flat" onClick={deleteJobHandler}>Yes</a>
                <a href="#!" className="modal-close red btn-flat">No</a>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { updateUser, deleteJob })(DeleteJobModal);