import { create } from 'zustand';

type MessageType = 'MESSAGE' | 'ERROR' | 'SUCCESS';
interface AppState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  message: string;
  messageType: MessageType;
  showMessage: (show: boolean, message: string, type: MessageType) => void;
}

const useAppStore = create<AppState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  message: '',
  messageType: 'MESSAGE',
  showMessage: (show, message, type) => {
    if (!show) {
      set({ message: '' });
    } else if (message) {
      set({ message, messageType: type });
    }
  },
}));

export default useAppStore;
