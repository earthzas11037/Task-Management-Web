import { toast, ToastOptions } from 'react-toastify';

/**
 * Show a success toast with optional custom options.
 */
export const showSuccessToast = (message: string, options: ToastOptions = { autoClose: 1500 }) => {
  toast.success(message, options);
};

/**
 * Show an error toast with optional custom options.
 */
export const showErrorToast = (message: string, options: ToastOptions = { autoClose: 1500 }) => {
  toast.error(message, options);
};

/**
 * Show a toast for a promise, displaying a pending message,
 * then a success or error message based on the result.
 */
export const showPromiseToast = <T>(
  promise: Promise<T>,
  messages: { pending: string; success: string; error: string },
  options: ToastOptions = { autoClose: 2000 },
) => {
  toast.promise(
    promise,
    {
      pending: messages.pending,
      success: messages.success,
      error: messages.error,
    },
    options,
  );
};
