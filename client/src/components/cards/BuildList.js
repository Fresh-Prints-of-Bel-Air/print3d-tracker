import React from 'react';
import {connect} from 'react-redux';
import BuildItem from './BuildItem';

const BuildList = ({build: {builds}}) => {
  builds.forEach((build) => console.log(build._id));
  //console.log("derp");
  return (
    <div style={{ backgroundImage: "url(/images/mountain_low_contrast.jpg"}}>
          {builds.length === 0 ? (
            <p className='center' style={{backgroundColor: 'white', opacity: '1.0'}}>No builds to show...</p>
          ) : (
            builds.map((buildEntry) => <BuildItem build={buildEntry} key={buildEntry._id} />)
          )}
      </div>
  )
}
const mapStateToProps = (state) => ({
  build: state.build
});

export default connect(mapStateToProps)(BuildList);