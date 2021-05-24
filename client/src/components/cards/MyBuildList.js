import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getBuilds } from '../../actions/buildActions';
import { getJobsByIdArray } from '../../actions/jobActions';
import MyBuildItem from './MyBuildItem';

// the list of the builds currently running (shown in operator view, right)

export const MyBuildList = ({ build: { builds }, user: { user }, getBuilds }) => {
    useEffect(() => {
        console.log("user is: ");
        console.log(user);
        console.log("User's build IDs:");
        console.log(builds);
        getBuilds({ operators: [user.name] });
        console.log(builds);
        // getJobsByIdArray(user.jobQueue);
    }, [user]);

    return (
        builds && builds.map((build) => <MyBuildItem build={build} key={build._id} />)
    )
}

const mapStateToProps = (state) => ({
  build: state.build,
  user: state.user
})

export default connect(mapStateToProps, { getBuilds })(MyBuildList);