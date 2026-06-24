import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RcFile } from 'antd/es/upload/interface';

interface StreamEventResult {
  imageDetect_path: string;
  imageProcess_path: string;
  detect_result: string;
  process_result: string;
  final_result: string;
}

interface AgentDataState {
  detectFile: RcFile | null;
  processFile: RcFile | null;
  loading: boolean;
  streamLog: string;
  currentStep: number;
  currentNode: string;
  finalResult: StreamEventResult | null;
  modalVisible: boolean;
  modalContent: {
    title: string;
    content: string;
  };
  
  setDetectFile: (file: RcFile | null) => void;
  setProcessFile: (file: RcFile | null) => void;
  setLoading: (loading: boolean) => void;
  setStreamLog: (log: string) => void;
  appendStreamLog: (content: string) => void;
  setCurrentStep: (step: number) => void;
  setCurrentNode: (node: string) => void;
  setFinalResult: (result: StreamEventResult | null) => void;
  setModalVisible: (visible: boolean) => void;
  setModalContent: (content: { title: string; content: string }) => void;
  resetAnalysis: () => void;
  resetFiles: () => void;
}

export const useAgentDataStore = create<AgentDataState>()(
  persist(
    (set) => ({
      detectFile: null,
      processFile: null,
      loading: false,
      streamLog: '',
      currentStep: 0,
      currentNode: '',
      finalResult: null,
      modalVisible: false,
      modalContent: {
        title: '',
        content: '',
      },
      
      setDetectFile: (file) => set({ detectFile: file }),
      setProcessFile: (file) => set({ processFile: file }),
      setLoading: (loading) => set({ loading }),
      setStreamLog: (log) => set({ streamLog: log }),
      appendStreamLog: (content) => set((state) => ({ streamLog: state.streamLog + content })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setCurrentNode: (node) => set({ currentNode: node }),
      setFinalResult: (result) => set({ finalResult: result }),
      setModalVisible: (visible) => set({ modalVisible: visible }),
      setModalContent: (content) => set({ modalContent: content }),
      
      resetAnalysis: () => set({
        streamLog: '',
        currentStep: 0,
        currentNode: '',
        finalResult: null,
      }),
      
      resetFiles: () => set({
        detectFile: null,
        processFile: null,
      }),
    }),
    {
      name: 'agent-data-storage',
      partialize: (state) => ({
        streamLog: state.streamLog,
        currentStep: state.currentStep,
        finalResult: state.finalResult,
      }),
    }
  )
);
