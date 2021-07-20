import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getBuilds } from '../../actions/buildActions';
import { getBuildsByIdArray} from '../../actions/buildActions';
import MyBuildItem from './MyBuildItem';

// the list of the builds currently running (shown in operator view, right)

export const MyBuildList = ({ build: { userBuildList }, user: { user }, getBuildsByIdArray }) => {
    useEffect(() => {
       getBuildsByIdArray(user.buildList);
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