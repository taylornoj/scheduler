import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
// -- this file formats each appointment space depending on status of the interview

// -- mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// -- Appointment component
export default function Appointment(props) {

  // -- SHOW if interview exists, EMPTY if no interview exists
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // -- save action
  function save(name, interviewer) {
    // -- if no name entered, or no interviewer selected, form cannot be saved
    if (!name || !interviewer) {
      return;
    }
    // -- after save, transition to status component, then submit info to API
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      }).catch(() => transition(ERROR_SAVE, true));
  };

  // -- delete action
  function deleteFunc() {
    // -- after delete, transition to status component for DELETING
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        // -- remove appointment and transition to EMPTY for blank appointment space
        transition(EMPTY)
      }).catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (<Form
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        student={props.interview.student}
        onCancel={() => back(SHOW)}
        onSave={save}
      />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        onSave={save}
      />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm
        onCancel={() => back()}
        message={"Are you sure you want to delete?"}
        onConfirm={deleteFunc}
      />}
      {mode === ERROR_SAVE && <Error message={"Could not create appointment"}
        onClose={() => back()}
      />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment"}
        onClose={() => back()}
      />}
    </article>
  );
}