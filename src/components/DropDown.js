import React, { useState } from 'react';

export default function DropDown ({ text, items, selectedItem, onSelectItem }) {

  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  }

  return (
    <div className="w-100">
      <span className="text-white text-uppercase pl-3 pr-2 ltsp">{text} ({selectedItem})</span>
      <div className="dropdown mt-2">
        <div className="w-100 list-group-item dropdown-toggle" type="button" onClick={onToggle}>
          {selectedItem}
        </div>
        <div className="dropdown-menu" style={{ display: toggle ? 'block' : 'none' }}>
          {items.map(i => <a
            className={"dropdown-item " + (selectedItem === i ? 'bg-success' : '')}
            key={i}
            onClick={() => { onSelectItem(i); }}>{i}</a>)}
        </div>
      </div>
    </div>);
}