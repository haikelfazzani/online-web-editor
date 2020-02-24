import React, { useState, useEffect, useContext } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { KodyContext } from "../hooks/KodyProvider";

export default function Editor () {

  const { state, setState } = useContext(KodyContext);
  const [value, setValue] = useState();

  useEffect(() => {
    switch (state.mode) {
      case 'css':
        setValue(state.css);
        break;

      case 'javascript':
        setValue(state.javascript);
        break;

      default:
        setValue(state.html);
        break;
    }

  }, [state, setState]);

  const onChange = (code) => {
    setValue(code);

    switch (state.mode) {
      case 'css':
        setState({...state, css: code});
        break;

      case 'javascript':
        setState({...state, javascript: code});
        break;

      default:
        setState({...state, html: code});
        break;
    }
  }

  return <AceEditor
    placeholder="Placeholder Text"
    mode={state.mode}
    theme="monokai"
    name="kody-ace-editor"
    onChange={onChange}
    fontSize={state.fontSize}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={true}
    value={value}
    wrapEnabled={true}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
      useWorker: false
    }} />
}