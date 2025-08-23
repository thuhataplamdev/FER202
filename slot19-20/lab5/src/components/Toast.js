import React, { useEffect } from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';

const Toast = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-success" />;
      case 'error':
        return <FaTimesCircle className="text-danger" />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning" />;
      default:
        return <FaInfoCircle className="text-info" />;
    }
  };

  const getVariant = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <BootstrapToast
      bg={getVariant(toast.type)}
      onClose={() => onRemove(toast.id)}
      className="mb-2"
    >
      <BootstrapToast.Header closeButton>
        <div className="d-flex align-items-center gap-2">
          {getIcon(toast.type)}
          <strong className="me-auto">Notification</strong>
        </div>
      </BootstrapToast.Header>
      <BootstrapToast.Body className="text-white">
        {toast.message}
      </BootstrapToast.Body>
    </BootstrapToast>
  );
};

const ToastContainerComponent = () => {
  const { toasts, removeToast } = useToast();

  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </ToastContainer>
  );
};

export default ToastContainerComponent; 