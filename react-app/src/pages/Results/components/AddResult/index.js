import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert } from "../../../../../../components";
import { Button } from "../../../../../../core";
import { AutoComplete } from "../AutoComplete";
import {
  // callActionTakenActions,
  // callDispositionActions,
  callHistoryActions,
  callHistorySaveActions,
} from "../../actions";
import styles from "./AddResult.module.scss";
import { pageActions } from "../../../../../../store/actions/page.action";
export const AddCall = ({ show, setShow, selectedItem, isEditing }) => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const callHistorySave = useSelector((state) => state.callHistorySave);
  const callActionTaken = useSelector((state) => state.callActionTaken);
  const callDisposition = useSelector((state) => state.callDisposition);
  //inputs
  const [dNC, setDNC] = useState(false);
  const [closeCase, setCloseCase] = useState(false);
  const [callComplete, setCallComplete] = useState(false);
  const [callComments, setComments] = useState("");
  const [actionsTaken, setActionsTaken] = useState("");
  const [dispositionId, setDispositionId] = useState("");
  const [actions, setActions] = useState([]);

  const [errorActionsTaken, setErrorActsTaken] = useState(false);
  const [errorDisposition, setErrorDisposition] = useState(false);
  const [errorCheckbox, setErrorCheckbox] = useState(false);
  const [errorComments, setErrorComments] = useState(false);
  // useEffect(() => {
  //   dispatch(
  //     pageActions.pageRequest(
  //       isEditing ? "Edit Call History" : "Add Call History"
  //     )
  //   );
  //   // eslint-disable-next-line
  // }, []);
  // useEffect(() => {
  //   if (show && userData.token !== undefined) {
  //     let request = {};
  //     dispatch(
  //       callActionTakenActions.callActionTakenRequest(request, userData.token)
  //     );
  //     dispatch(
  //       callDispositionActions.callDispositionRequest(request, userData.token)
  //     );
  //   }
  //   // eslint-disable-next-line
  // }, [userData.token, show]);

  useEffect(() => {
    if (isEditing)
      if (
        selectedItem !== undefined &&
        callDisposition.getAll.length > 0 &&
        callActionTaken.actions.length > 0
      ) {
        let actionArr = selectedItem.Action.split(", ");
        let ActArr = [];
        for (let i in actionArr) {
          ActArr.push(
            callActionTaken.actions.filter((item) =>
              item.ActionName.includes(actionArr[i])
            )[0]
          );
        }

        if (selectedItem.Action !== undefined && ActArr.length > 0) {
          setActions(ActArr);
          getSelectedActions(ActArr);
        }
        setDispositionId(
          callDisposition.getAll.filter((item) =>
            item.DispositionName.includes(selectedItem.Disposition)
          )[0]
        );
        setCallComplete(selectedItem.CallComplete === "Yes" ? true : false);
        setDNC(selectedItem.DNC === "Yes" ? true : false);
        setCloseCase(selectedItem.CloseCase === "Yes" ? true : false);
        setComments(selectedItem.Comment);
      }
    // eslint-disable-next-line
  }, [selectedItem, callDisposition.getAll, callActionTaken.actions]);

  useEffect(() => {
    if (callHistorySave.message.Result !== undefined) {
      if (callHistorySave.message.Result === "Success") {
        setActionsTaken("");
        setCallComplete(false);
        setDNC(false);
        setCloseCase(false);
        setComments("");
        setDispositionId("");

        const request = {
          page: 1,
          patientAdmissionId: patientId,
        };
        if (typeof userData.token !== "undefined")
          dispatch(
            callHistoryActions.callHistoryRequest(request, userData.token)
          );
      }
      setTimeout(() => {
        setShow(false);
        dispatch(callHistorySaveActions.callHistorySaveRequestReset());
      }, 1000);
    }
    // eslint-disable-next-line
  }, [callHistorySave.message, callHistorySave.error]);

  const removeComma = (str) => {
    if (str != null && str.length > 0 && str.charAt(str.length - 1) === ",") {
      str = str.substring(0, str.length - 1);
    }
    return str;
  };

  const saveCallHistory = () => {
    if (!validate()) {
      if (userData.token !== undefined) {
        let request;
        if (isEditing) {
          // request = {
          //   AdmissionID: patientId,
          //   DNC: dNC,
          //   CallComplete: callComplete,
          //   CloseCase: closeCase,
          //   DispositionID: dispositionId.DispositionID,
          //   CallComments: callComments,
          //   ActionTakenIDs: actionsTaken,
          //   flag: "Update",
          //   historyID: selectedItem.id,
          // };

          request = {
            AdmissionID: patientId,
            DispositionID: dispositionId.DispositionID,
            CallComplete: callComplete,
            CallComments: callComments,
            DNC: dNC,
            CloseCase: closeCase,
            ActionTakenIDs: removeComma(actionsTaken),
            flag: "Update",
            HistoryID: selectedItem.HistoryID,
          };
        } else {
          request = {
            AdmissionID: patientId,
            DispositionID: dispositionId.DispositionID,
            CallComplete: callComplete,
            CallComments: callComments,
            DNC: dNC,
            CloseCase: closeCase,
            ActionTakenIDs: removeComma(actionsTaken),
            flag: "Insert",
            HistoryID: "",
          };
        }

        dispatch(
          callHistorySaveActions.callHistorySaveRequest(request, userData.token)
        );
      }
    }
  };
  const validate = () => {
    let cancel = false;
    if (actionsTaken === "") {
      cancel = true;
      setErrorActsTaken(true);
    } else {
      setErrorActsTaken(false);
    }
    if (dispositionId === "") {
      cancel = true;
      setErrorDisposition(true);
    } else {
      setErrorDisposition(false);
    }
    if (callComments === "") {
      cancel = true;
      setErrorComments(true);
    } else {
      setErrorComments(false);
    }
    if (dNC || closeCase || callComplete) {
      //anyone is true then ok otherwise
      setErrorCheckbox(false);
    } else {
      cancel = true;
      setErrorCheckbox(true);
    }
    return cancel;
  };

  //filter patient by the flags
  const selectedActions = new Map();

  const getSelectedActions = (selected) => {
    for (let i in selected) {
      selectedActions.set(selected[i].ActionID, selected[i].ActionID);
    }
    let tempFlag = "";
    for (const [key] of selectedActions.entries()) {
      tempFlag = key + "," + tempFlag;
    }

    setActionsTaken(tempFlag);
  };

  return (
    <div className={styles.add_call_container}>
      {/* <h4>Add Call</h4> */}
      <div className={styles.row1}>
        <AutoComplete
          error={errorActionsTaken}
          isMulti
          isLoading={callActionTaken.loading}
          label="Actions Taken"
          options={callActionTaken.actions}
          getOptionLabel={(option) => option.ActionName}
          getOptionValue={(option) => option.ActionID}
          value={actions}
          onChange={(selected) => {
            getSelectedActions(selected);
            setActions(selected);
          }}
        />

        <AutoComplete
          error={errorDisposition}
          isLoading={callDisposition.loading}
          label="Disposition"
          options={callDisposition.getAll}
          value={dispositionId}
          getOptionLabel={(option) => option.DispositionName}
          getOptionValue={(option) => option.DispositionID}
          onChange={(selected) => setDispositionId(selected)}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type={"checkbox"}
          checked={dNC}
          name="DNC"
          onChange={(evt) => setDNC(evt.target.checked)}
        />
        <label className={styles.checkbox_label}>DNC</label>
        <input
          className={styles.checkbox}
          type={"checkbox"}
          name="Close_this_case"
          checked={closeCase}
          onChange={(evt) => setCloseCase(evt.target.checked)}
        />
        <label className={styles.checkbox_label}> Close This Case</label>
        <input
          className={styles.checkbox}
          type={"checkbox"}
          name="Call_complete"
          checked={callComplete}
          onChange={(evt) => setCallComplete(evt.target.checked)}
        />
        <label className={styles.checkbox_label}>Call Complete</label>
      </div>
      {errorCheckbox && (
        <p className={styles.error}>Required check atleast one field*</p>
      )}
      <div className={styles.info_row}>
        <p className={styles.label}>{"Comments"}:</p>

        <textarea
          className={styles.value}
          value={callComments}
          onChange={(evt) => setComments(evt.target.value)}
        />
      </div>
      {errorComments && <p className={styles.error}>Required*</p>}

      <Button
        label={isEditing ? "Update" : "Add"}
        loading={callHistorySave.loading}
        onClick={saveCallHistory}
      />

      {callHistorySave.message.Result !== undefined && (
        <Alert
          isSuccess={callHistorySave.message.Result === "Success"}
          successMessage={
            isEditing ? "Successfully updated!" : "Successfully added!"
          }
          failureMessage={isEditing ? "Failed to update!" : "Failed to add!"}
        />
      )}
    </div>
  );
};
