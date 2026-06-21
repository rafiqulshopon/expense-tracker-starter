function ConfirmDialog({ message, confirmLabel = "Delete", onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="modal-confirm-btn" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog
