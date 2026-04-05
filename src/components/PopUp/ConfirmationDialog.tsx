import React from 'react';

type ConfirmProps = {
  isOpen: boolean;
  loading: boolean;
  text: string;
  type?: 'success' | 'danger' | 'warn';
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

const ConfirmationDialog = ({ isOpen, loading, onClose, text, type = 'danger', onConfirm }: ConfirmProps) => {
  return <div>ConfirmationDialog</div>;
};

export default ConfirmationDialog;
