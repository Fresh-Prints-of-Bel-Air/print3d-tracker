import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { updateBuild } from '../../actions/buildActions';
import M from 'materialize-css';

const EditBuildModal = ({  build, updateBuild }) => {
    const [editBuildForm, setEditBuildForm] = useState({
        estPrintTime: build.estPrintTime,
        status: build.status,
    });

    useEffect(() => {
        M.AutoInit();
        console.log('EditBuildModal build')
        console.log(build);
    }, []);

    
    const statusSelectOptions = [
        { value: 'Build File Ready', label: 'Build File Ready' },
        { value: 'Build Started', label: 'Build Started' },
        { value: 'Build Complete', label: 'Build Complete' },
        { value: 'Build Post-Processed', label: 'Build Post-Processed' },
        { value: 'Build Delivered', label: 'Build Delivered' },
    ]   

    const onChange = (e) => {
        setEditBuildForm({
            ...editBuildForm,
            [e.target.name]: e.target.value
        });
    }

    const onStatusChange = (option) => {
        setEditBuildForm({
            ...editBuildForm,
            status: option.value,
        });
    }

    const clearForm = () => {
        setEditBuildForm({
            estPrintTime: build.estPrintTime,
            status: build.status,
        });
    }

    const editConfirm = (e) => { 
        
        console.log('Edit Build Submission:');
        console.log({ ...build, status: editBuildForm.status, estPrintTime: editBuildForm.estPrintTime });
        updateBuild({ ...build, status: editBuildForm.status, estPrintTime: editBuildForm.estPrintTime });
        alert("Build update submitted.");
    }




    return ( 
        <div>
            <a className="btn-small teal truncate modal-trigger" style={{margin: '5px'}} 
                href={`#myBuildListEditModal${build.build_number}`}>
                <i class="small material-icons left">edit</i>Edit
            </a>
            <div id={`myBuildListEditModal${build.build_number}`} className="modal grey darken-3">
                <div className="modal-content grey darken-3">
                <h4 className="">Edit Print Build Request #{build.build_number}</h4>
                    <div className="row">
                        <div className="col s4">
                            <label htmlFor="editStatus" className="active">
                                            Edit Build Status:
                            </label>
                        </div>
                        <div className="col s4">
                            <label   label htmlFor="estPrintTime" className="active">
                                Edit Estimated Print Time(Hours):
                            </label>
                        </div>
                    </div>
                    <div className='row' style={{marginTop: '10px'}}>
                        <div className='black-text'>
                            <div className="col s4" name="editStatus">
                                <Select
                                    options={statusSelectOptions}
                                    onChange={onStatusChange}
                                    defaultValue={{value: editBuildForm.status, label: editBuildForm.status}}
                                    value={{value: editBuildForm.status, label: editBuildForm.status}}
                                    //isSearchable={false}
                                />
                            </div>
                            <div className="input-field col s4" style={{}}>
                                <input 
                                className="white-text"
                                type="text" 
                                name="estPrintTime" 
                                value={editBuildForm.estPrintTime}
                                onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer grey darken-3 center">
                    <a href="#!" className="modal-close green darken-1 btn-flat" onClick={editConfirm}>Confirm Edit</a>
                    <a href="#!" className="modal-close red btn-flat">Cancel Edit</a>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { updateBuild })(EditBuildModal);

