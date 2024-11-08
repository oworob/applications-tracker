import { useEffect } from "react";
import "./ConfirmModal.scss";

export default function ConfirmModal(props: any) {
  const { title, message, onConfirm, onCancel } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div id="ConfirmModal">
      <div className="modal-window">
        <h3 className="title">{title}</h3>
        <p className="message">{message}</p>
        <div className="actions">
          <button type="button" onClick={onCancel} className="button secondary">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="button primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
