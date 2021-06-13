import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import { deleteBuild } from '../../actions/buildActions';

const DeleteBuildModal = ({ user: { user }, build: { build }, buildToDelete, deleteBuild }) => {

    useEffect(() => {
        

    },[build]);
    const deleteBuildHandler = () => {
        deleteBuild(buildToDelete._id);
        updateUser({
          ...user, 
          buildList: [
            ...user.buildList.filter(listItem => listItem !== buildToDelete._id)
          ]
        });
      }

    return ( 
        <div>
            <a className="btn-small teal truncate modal-trigger" style={{margin: '5px'}} 
                href={`#myBuildListDeleteModal${buildToDelete.build_number}`}>
                <i class="small material-icons left">delete_forever</i>Delete
            </a>
            <div id={`myBuildListDeleteModal${buildToDelete.build_number}`} className="modal">
            <div className="modal-content grey darken-3">
                <h5>Are you sure you want to delete Build {buildToDelete.build_number}?</h5>
                <h6>Deleted builds cannot be restored.</h6>
                <div className="grey darken-4">
                </div>
            </div>
            <div className="modal-footer grey darken-3">
                <a href="#!" className="modal-close green btn-flat" onClick={deleteBuildHandler}>Yes</a>
                <a href="#!" className="modal-close red btn-flat">No</a>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    build: state.build
});

export default connect(mapStateToProps, { updateUser, deleteBuild })(DeleteBuildModal);