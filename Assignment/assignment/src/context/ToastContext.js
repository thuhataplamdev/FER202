import React, { createContext, useContext, useReducer } from 'react';

const ToastContext = createContext();

// Toast reducer for managing toast state
const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      const newToast = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        duration: action.payload.duration || 3000
      };
      return {
        ...state,
        toasts: [...state.toasts, newToast]
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };

    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: []
      };

    default:
      return state;
  }
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, {
    toasts: []
  });

  const showToast = (message, type = 'info', duration = 3000) => {
    dispatch({
      type: 'ADD_TOAST',
      payload: { message, type, duration }
    });
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  const clearToasts = () => {
    dispatch({ type: 'CLEAR_TOASTS' });
  };

  const value = {
    toasts: state.toasts,
    showToast,
    removeToast,
    clearToasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}; 