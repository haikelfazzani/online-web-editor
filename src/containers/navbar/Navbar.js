import React from 'react';
import { Link } from 'react-router-dom';
import SelectFont from './SelectFont';

import './Navbar.css';
import ButtonInput from './ButtonInput';
import AppUtil from '../../util/AppUtil';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Timer from './Timer';

export default function Navbar () {

  const isSassEnabled = useStoreState(state => state.webeditor.model.isSassEnabled);
  const enableSass = useStoreActions(actions => actions.webeditor.enableSass);

  const onDownload = () => {
    AppUtil.generateTemplateAndDownload();
  }

  const onEnableSass = () => {
    enableSass(!isSassEnabled);
  }

  return <nav className="cs-header">

    <div className="w-25 d-flex">
      <Link to="/" className="btn btn-success mr-3">
        <i className="fas fa-shapes"></i> Kody
      </Link>

      <Link to="/" className="btn btn-primary mr-3">
        <i className="fas fa-home" data-toggle="tooltip"
          data-placement="top" title="Back Home"></i>
      </Link>
    </div>


    <div className="w-75 d-flex justify-content-end">
      <SelectFont />

      <button className={"btn btn-primary ml-3 " + (isSassEnabled ? "bg-pink" : "")}
        onClick={onEnableSass}
        data-toggle="tooltip" data-placement="bottom" title="Enable sass">
        <i className="fab fa-sass"></i>
      </button>

      <ButtonInput />

      <Timer />

      <button className="btn btn-primary mr-3" onClick={onDownload}>
        <i className="fas fa-download"></i>
      </button>

      <a className="btn btn-primary" href="https://github.com/haikelfazzani/kody-web-editor">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </nav>;
}