import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getBuilds } from '../../actions/buildActions';
import { getBuildsByIdArray} from '../../actions/buildActions';
import MyBuildItem from './MyBuildItem';

// the list of the builds currently running (shown in operator view, right)

export const MyBuildList = ({ build: { builds, userBuildList }, user: { user }, getBuildsByIdArray }) => {
    useEffect(() => {
        console.log("user is: ");
        console.log(user);
        console.log("User's buildList:");
        console.log(userBuildList);
        // getBuilds({ operators: [user.name] });
        getBuildsByIdArray(user.buildList);
        console.log(userBuildList);
        // getJobsByIdArray(user.jobQueue);
    }, [user]);

   
    return (
        userBuildList && userBuildList.map((build) => <MyBuildItem build={build} key={build._id} />)
    )
}

const mapStateToProps = (state) => ({
  build: state.build,
  user: state.user
})

export default connect(mapStateToProps, { getBuildsByIdArray })(MyBuildList);