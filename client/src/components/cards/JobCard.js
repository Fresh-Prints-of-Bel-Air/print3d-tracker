import React from 'react'
import {useEffect} from 'react'
import M from 'materialize-css'
//import Job from '../../../../models/Job'

export const JobCard = ({job}) => {
  //const {}
  useEffect(() => {
    M.AutoInit();
    //eslint-disable-next-line
  }, []);
    return (
        <div>
            <ul className="collapsible expandable">
                <li>
                    <div className="collapsible-header"><i className="material-icons">note</i>First</div>
                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                    <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>
        </div>
    )
}

export default JobCard;