import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'deepBlue' | 'dark';
export type VehicleType = 'Ô tô' | 'Xe máy' | 'Xe điện';

type HistoryItem = {
  id: string;
  plate: string;
  vehicleType: VehicleType;
  checkedAt: string;
};

type AppState = {
  themeMode: ThemeMode;
  isPro: boolean;
  searchCount: number;
  selectedVehicle: VehicleType;
  history: HistoryItem[];
  setThemeMode: (mode: ThemeMode) => void;
  setSelectedVehicle: (vehicle: VehicleType) => void;
  trySearch: (plate: string) => void;
  deleteHistoryItem: (id: string) => void;
  upgradeToPro: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      themeMode: 'light',
      isPro: false,
      searchCount: 0,
      selectedVehicle: 'Ô tô',
      history: [],
      setThemeMode: (themeMode) => set({ themeMode }),
      setSelectedVehicle: (selectedVehicle) => set({ selectedVehicle }),
      trySearch: (plate) => {
        const state = get();
        if (!state.isPro && state.searchCount >= 3) {
          return;
        }

        const normalizedPlate = plate.trim().toUpperCase();
        if (!normalizedPlate) {
          return;
        }

        set({
          searchCount: state.searchCount + 1,
          history: [
            {
              id: `${normalizedPlate}-${Date.now()}`,
              plate: normalizedPlate,
              vehicleType: state.selectedVehicle,
              checkedAt: new Date().toISOString().slice(0, 10)
            },
            ...state.history
          ]
        });
      },
      deleteHistoryItem: (id) => set((state) => ({ history: state.history.filter((x) => x.id !== id) })),
      upgradeToPro: () => set({ isPro: true })
    }),
    {
      name: 'phat-nguoi-2026-store',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
