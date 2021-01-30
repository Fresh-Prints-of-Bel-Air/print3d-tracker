import React, {useEffect} from 'react'
import M from 'materialize-css';

const DropDown = () => {

  useEffect(() => {
    M.AutoInit();
  })
  return (
    <div className="col s2" style={{marginLeft: '50px'}}>
                                <a class='dropdown-trigger btn blue' href='#' data-target='dropdown1'>Builds</a>
                                <ul id='dropdown1' class='dropdown-content'>
                                    <li><a href="#!">one</a></li>
                                    <li><a href="#!">two</a></li>
                                    <li class="divider" tabindex="-1"></li>
                                    <li><a href="#!">three</a></li>
                                    <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                                    <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                                </ul>
                            </div>
  )
}

export default DropDown;