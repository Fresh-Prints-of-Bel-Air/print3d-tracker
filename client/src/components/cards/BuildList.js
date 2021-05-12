import React from 'react';
import {connect} from 'react-redux';
import BuildItem from './BuildItem';

const BuildList = ({build: {builds}, formDimensions}) => {
  //formDimensions for 1080p
  // height: '20vh',
  // formMarginBtm: '8.5vh',
  // buttonHeight: '4vh',
  // buttonWidth: '7vw',
  // listSize: '73.2vh'

  console.log("build IDs in the list:");
  builds.forEach((build) => console.log(build._id));
  return (
    <div style={{backgroundImage: builds.length !== 0 && "url(/images/mountain_low_contrast.jpg)", maxHeight: formDimensions.listSize, overflow: 'auto'}}>
         
          {builds.length === 0 ? (
            <p className='center' style={{backgroundColor: 'white', opacity: '1.0', overflow: 'none'}}>No builds to show...</p>
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