import React, { useEffect } from 'react'
//import Job from '../../../../models/Job'
import M from 'materialize-css/dist/js/materialize.min.js';

export const JobCard = ({ job }) => {
    useEffect(() => {
        M.AutoInit();
        // var elem = document.querySelector('.collapsible.expandable');
        // var instance = M.Collapsible.init(elem, {
        //     accordion: false
        // });
    }, []);

    return ( 
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Job Card 1</span>
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div className="card-action">

                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">widgets</i>Parts</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                        </ul>  

                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">note</i>Notes</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                        </ul>  
                    </div>
                </div>
            </div>              
        </div>
    )
}

export default JobCard;
