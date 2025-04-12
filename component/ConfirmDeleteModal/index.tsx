'use client';

import { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmDeleteModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  show,
  onCancel,
  onConfirm,
  itemName = 'this item',
}) => {
  return (
    <Modal
      show={show}
      onHide={onCancel}
      centered
      backdrop="static"
      keyboard={false}
      container={typeof window !== 'undefined' ? document.body : undefined}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
