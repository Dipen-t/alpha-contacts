import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ContactRound, X, ChevronDown } from "lucide-react";
import { stages } from "../data";
import type { Contact, Stage } from "../data";
import { Avatar, Labels } from "./ContactFields";
const stageClass = (stage: string) => stage.toLowerCase();
const outsidePanel = (panel: HTMLDialogElement, x: number, y: number) => {
  const bounds = panel.getBoundingClientRect();
  return (
    x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom
  );
};
export function DetailsPanel({
  contact,
  onClose,
  onSave,
}: {
  contact: Contact;
  onClose: () => void;
  onSave: (id: string, stage: Stage, notes: string) => void;
}) {
  const [stage, setStage] = useState(contact.stage);
  const [notes, setNotes] = useState(contact.notes);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const pressedOutside = useRef(false);
  const dirty = stage !== contact.stage || notes !== contact.notes;
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    closeButton.current?.focus();
    return () => element.close();
  }, []);
  const requestClose = () => {
    if (dirty) setConfirmDiscard(true);
    else onClose();
  };
  function handleKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "Enter" &&
      !confirmDiscard
    ) {
      event.preventDefault();
      if (dirty) onSave(contact.id, stage, notes);
    }
  }
  return (
    <dialog
      ref={dialog}
      className="details-panel"
      aria-labelledby="details-name"
      onKeyDown={handleKey}
      onPointerDown={(event) => {
        pressedOutside.current =
          event.button === 0 &&
          event.target === event.currentTarget &&
          outsidePanel(event.currentTarget, event.clientX, event.clientY);
      }}
      onClick={(event) => {
        const shouldClose =
          pressedOutside.current &&
          event.target === event.currentTarget &&
          outsidePanel(event.currentTarget, event.clientX, event.clientY);
        pressedOutside.current = false;
        if (shouldClose) requestClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        if (confirmDiscard) {
          setConfirmDiscard(false);
          requestAnimationFrame(() => closeButton.current?.focus());
        } else requestClose();
      }}
    >
      <div className="panel-top" inert={confirmDiscard}>
        <span>
          <ContactRound size={16} />
          Contact details
        </span>
        <button
          ref={closeButton}
          className="icon-button"
          aria-label="Close contact details"
          onClick={requestClose}
        >
          <X size={19} />
        </button>
      </div>
      <form
        inert={confirmDiscard}
        onSubmit={(event) => {
          event.preventDefault();
          if (dirty) onSave(contact.id, stage, notes);
        }}
        className="panel-form"
      >
        <div className="panel-content">
          <div className="profile">
            <Avatar name={contact.name} />
            <h2 id="details-name">{contact.name}</h2>
            <p>
              {contact.role || "Role not added"}
              {contact.company && (
                <>
                  {" "}
                  at <strong>{contact.company}</strong>
                </>
              )}
            </p>
          </div>
          <dl className="contact-properties">
            <div>
              <dt>Email</dt>
              <dd>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                ) : (
                  <span className="missing">Not added</span>
                )}
              </dd>
            </div>
            <div>
              <dt>Company</dt>
              <dd>
                {contact.company || <span className="missing">Not added</span>}
              </dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>
                {contact.role || <span className="missing">Not added</span>}
              </dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>
                {contact.owner ? (
                  <span className="owner">
                    <Avatar name={contact.owner} small />
                    {contact.owner}
                  </span>
                ) : (
                  <span className="missing">Unassigned</span>
                )}
              </dd>
            </div>
            <div>
              <dt>Labels</dt>
              <dd>
                <Labels labels={contact.labels} />
              </dd>
            </div>
          </dl>
          <div className="editable-fields">
            <div className="field-title">
              <h3>Stage & notes</h3>
            </div>
            <label htmlFor="stage">Stage</label>
            <div className="select-wrap">
              <span className={`stage-dot ${stageClass(stage)}`} />
              <select
                id="stage"
                value={stage}
                onChange={(event) => setStage(event.target.value as Stage)}
              >
                {stages.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
              <ChevronDown size={15} />
            </div>
            <p className="field-hint">
              Saving updates this contact in both views.
            </p>
            <label htmlFor="notes">
              Notes <span>Optional</span>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add context for your next conversation…"
              rows={5}
            />
          </div>
        </div>
        <footer className="panel-footer">
          <span className="draft-status">
            {dirty ? (
              <>
                <span className="unsaved-dot" />
                Unsaved changes
              </>
            ) : (
              "No changes yet"
            )}
          </span>
          <div>
            <button
              className="secondary-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="primary-button" type="submit" disabled={!dirty}>
              Save changes
            </button>
          </div>
        </footer>
      </form>
      {confirmDiscard && (
        <div className="discard-layer">
          <div
            className="discard-box"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="discard-title"
            aria-describedby="discard-description"
          >
            <h3 id="discard-title">Discard your changes?</h3>
            <p id="discard-description">
              Your changes to {contact.name.split(" ")[0]}’s stage and notes
              haven’t been saved.
            </p>
            <div>
              <button
                autoFocus
                className="secondary-button"
                onClick={() => {
                  setConfirmDiscard(false);
                  requestAnimationFrame(() => closeButton.current?.focus());
                }}
              >
                Keep editing
              </button>
              <button className="primary-button" onClick={onClose}>
                Discard changes
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
