import Form from "../Form/Form";
import { indexCollection, user } from "../datas";
import { useEffect, useState } from "react";
import { findPartsOfForm, getlabelList } from "../../utils/functions";
import { initialStateConfigObject } from "../../config/configInitialState";
import logo from "./logo.PNG";
let edit = false;

function App() {
  const [state, setState] = useState({});

  var userFromServer = window.user ?? user;
  var indexCollectionFromServer = window.indexCollection ?? indexCollection;
  var collId = window.collId;
  // var Res_Id = window.Res_id;
  // var Coll_Id = window.Coll_Id;
  // var datasFromBD = window.datasFromBd;

  // on recupere tous les labels pour generer les champs
  const labels = Array.from(getlabelList(indexCollectionFromServer));

  let formDatas = labels.map((labelName) =>
    findPartsOfForm(labelName, indexCollectionFromServer)
  );

  const getValueFromId = (id, formdatas, shortlabel) => {
    const label = formdatas
      .map((element) => {
        return element
          .map((el) => {
            if (el.SHORT_LABEL && el.SHORT_LABEL === shortlabel) {
              return el["VALEURS"][id];
            }
          })
          .filter((el) => el !== undefined);
      })
      .filter((el) => el.length && el)
      .join("")
      .toString();
    return label;
  };

  const setInitialValue = (initialState, formdatas, label, shortLabel, id) => {
    initialState[label][shortLabel].value = {
      id,
      label: getValueFromId(id, formdatas, shortLabel),
    };
    return { ...initialState };
  };

  useEffect(() => {
    if (!edit) {
      let initialState = { ...initialStateConfigObject };

      initialState.currentUser.userid = userFromServer;

      initialState = setInitialValue(
        initialState,
        formDatas,
        "Type de document",
        "Type de document",
        16
      );

      setState({ ...initialState });
    }
  }, []);

  return (
    <div className="App">
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <img width="40%" src={logo} alt="logo Credit agricole developpement" />
      </div> */}
      <header className="App-header">
        <h1 className="App-title">Demande de contrat</h1>
        <div className="App-decorator"></div>
      </header>
      {Object.keys(state).length && (
        <Form
          labels={labels}
          datas={formDatas}
          state={state}
          setState={setState}
          collId={collId}
        />
      )}
    </div>
  );
}

export default App;
