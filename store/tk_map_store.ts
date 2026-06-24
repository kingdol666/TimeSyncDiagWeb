import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThicknessMapData {
  id: number;
  thickness_map_uuid: string;
  map_image: string;
  map_combined: string;
  start_time: string;
  end_time: string;
  data_points_count: number;
  min_thickness: number;
  max_thickness: number;
  avg_thickness: number;
  is_abnormal: boolean;
}

interface WebSocketMessage {
  success: boolean;
  message: string;
  data?: ThicknessMapData;
}

interface ThicknessMapState {
  currentMap: ThicknessMapData | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  lastUpdateTime: string | null;
  autoReconnect: boolean;
  
  connect: () => void;
  disconnect: () => void;
  updateMap: (data: ThicknessMapData) => void;
  setError: (error: string | null) => void;
  setAutoReconnect: (enabled: boolean) => void;
}

const WS_URL = '/api/thickness-map/ws';

let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

export const useThicknessMapStore = create<ThicknessMapState>()(
  persist(
    (set, get) => ({
      currentMap: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      lastUpdateTime: null,
      autoReconnect: true,

      connect: () => {
        const state = get();
        
        if (state.isConnected || state.isConnecting) {
          return;
        }

        set({ isConnecting: true, error: null });

        try {
          ws = new WebSocket(WS_URL);

          ws.onopen = () => {
            console.log('[ThicknessMap] WebSocket connected');
            reconnectAttempts = 0;
            set({ isConnected: true, isConnecting: false, error: null });
            
            if (reconnectTimer) {
              clearTimeout(reconnectTimer);
              reconnectTimer = null;
            }
          };

          ws.onmessage = (event) => {
            try {
              const message: WebSocketMessage = JSON.parse(event.data);
              
              if (message.success && message.data) {
                get().updateMap(message.data);
              } else {
                console.warn('[ThicknessMap] Received unsuccessful message:', message.message);
              }
            } catch (error) {
              console.error('[ThicknessMap] Error parsing message:', error);
            }
          };

          ws.onerror = (error) => {
            console.error('[ThicknessMap] WebSocket error:', error);
            set({ error: 'WebSocket连接错误', isConnected: false, isConnecting: false });
          };

          ws.onclose = (event) => {
            console.log('[ThicknessMap] WebSocket closed:', event.code, event.reason);
            set({ isConnected: false, isConnecting: false });
            
            ws = null;

            const state = get();
            if (state.autoReconnect && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
              reconnectAttempts++;
              console.log(`[ThicknessMap] Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
              
              reconnectTimer = setTimeout(() => {
                get().connect();
              }, RECONNECT_DELAY);
            } else {
              console.error('[ThicknessMap] Max reconnection attempts reached or auto-reconnect disabled');
              set({ error: 'WebSocket连接失败，已达到最大重连次数' });
            }
          };
        } catch (error) {
          console.error('[ThicknessMap] Error creating WebSocket:', error);
          set({ error: '无法创建WebSocket连接', isConnecting: false });
        }
      },

      disconnect: () => {
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }

        if (ws) {
          ws.close();
          ws = null;
        }

        reconnectAttempts = 0;
        set({ isConnected: false, isConnecting: false });
      },

      updateMap: (data: ThicknessMapData) => {
        set({
          currentMap: data,
          lastUpdateTime: new Date().toISOString(),
          error: null
        });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setAutoReconnect: (enabled: boolean) => {
        set({ autoReconnect: enabled });
      },
    }),
    {
      name: 'thickness-map-storage',
      partialize: (state) => ({
        lastUpdateTime: state.lastUpdateTime,
        thickness_map_uuid: state.currentMap?.thickness_map_uuid,
      }),
    }
  )
);

export const initializeThicknessMapWebSocket = () => {
  if (typeof window !== 'undefined') {
    const store = useThicknessMapStore.getState();
    
    if (!store.isConnected && !store.isConnecting) {
      console.log('[ThicknessMap] Initializing WebSocket connection...');
      store.connect();
    }

    window.addEventListener('beforeunload', () => {
      store.disconnect();
    });
  }
};
