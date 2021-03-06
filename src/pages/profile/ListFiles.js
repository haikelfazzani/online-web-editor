import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DropboxService } from '../../services/DropboxService';

let step = 5;
export default function ListFiles () {

  const [dropboxFiles, setDropboxFiles] = useState(null);
  const [slicedFiles, setSlicedFiles] = useState(null);

  useEffect(() => {
    DropboxService.getFiles()
      .then((files) => {
        if (files) {
          setDropboxFiles(files);
          setSlicedFiles(files.slice(0, step));
        }
      })
      .catch(e => { });
  }, []);

  const onLoadMore = () => {
    step = step + 5;    
    if (step <= dropboxFiles.length) {
      let nfiles = dropboxFiles.slice(0, step);
      setSlicedFiles(nfiles);      
    }
  }

  if (slicedFiles && slicedFiles.length > 0) {
    return (<div className="table-responsive">
      <table className="table">
        <thead className="bg-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">filename</th>
            <th scope="col">server modified</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {slicedFiles.map((file, i) => <tr key={file.name}>
            <th scope="row">{i + 1}</th>
            <td>{file.name}</td>
            <td>{file.server_modified}</td>
            <td>
              <Link className="btn btn-dark fs-12" to={"/playground/dropbox/" + file.name}>
                <i className="fa fa-pen-square"></i> Open
              </Link>
            </td>
          </tr>)}
        </tbody>
      </table>

      <button className="w-100 btn btn-dark" onClick={onLoadMore}>
        <i className="fa fa-chevron-circle-down"></i> Load more files ({step}/{dropboxFiles.length})
      </button>
    </div>);
  }
  else {
    return <div></div>
  }
}