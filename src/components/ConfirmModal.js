import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({
  show,
  onHide,
  title,
  bodyText = "Êtes-vous sûr de vouloir supprimer?",
  onCancel,
  onConfirm,
  confirmText = "Supprimer",
  cancelText = "Annuler"
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger">{bodyText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
