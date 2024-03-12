import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMulti = [...multiple];
    const findIndexOfCurrentId = cpyMulti.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) cpyMulti.push(getCurrentId)
    else cpyMulti.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMulti);
  }
  return (
    <div className="wrapper">
      <h2>Project No. #1</h2>
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {
          data && data.length > 0 ?
            data.map((dataItem => (<div className="item">
              <div onClick={enableMultiSelection ? () => handleMultiSelection(dataItem.id) : () => handleSingleSelection(dataItem.id)} className="title">
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                enableMultiSelection ?
                  multiple.indexOf(dataItem.id) !== -1 &&
                  <div className="content">{dataItem.answer}</div> :
                  selected === dataItem.id && <div className="content">{dataItem.answer}</div>
              }
              {/* {
                selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                  <div className="content">{dataItem.answer}</div>
                  : null
              } */}
            </div>
            ))
            )
            : (<div>No data found !</div>
            )
        }

      </div>
    </div >
  );
}