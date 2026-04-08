import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore, VehicleType } from '@/store/useAppStore';
import { getTheme } from '@/theme/tokens';

const VEHICLES: VehicleType[] = ['Ô tô', 'Xe máy', 'Xe điện'];

export default function CheckScreen() {
  const [plate, setPlate] = useState('');
  const themeMode = useAppStore((s) => s.themeMode);
  const palette = getTheme(themeMode);
  const searchCount = useAppStore((s) => s.searchCount);
  const isPro = useAppStore((s) => s.isPro);
  const selectedVehicle = useAppStore((s) => s.selectedVehicle);
  const setSelectedVehicle = useAppStore((s) => s.setSelectedVehicle);
  const trySearch = useAppStore((s) => s.trySearch);
  const remaining = useMemo(() => Math.max(0, 3 - searchCount), [searchCount]);

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}> 
      <Text style={[styles.remaining, { color: palette.text }]}>Bạn còn {remaining}/3 lượt miễn phí</Text>

      <TextInput
        autoCapitalize="characters"
        placeholder="Nhập biển số, ví dụ: 30A12345"
        placeholderTextColor={palette.mutedText}
        value={plate}
        onChangeText={setPlate}
        style={[styles.input, { backgroundColor: palette.card, color: palette.text, borderColor: palette.border }]}
      />

      <View style={styles.chipRow}>
        {VEHICLES.map((vehicle) => {
          const active = vehicle === selectedVehicle;
          return (
            <Pressable
              key={vehicle}
              onPress={() => setSelectedVehicle(vehicle)}
              style={[styles.chip, { borderColor: active ? palette.primary : palette.border, backgroundColor: palette.card }]}
            >
              <Text style={{ color: active ? palette.primary : palette.text }}>{vehicle}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.nativeAd, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={{ color: palette.mutedText }}>Vị trí Native Ad (ẩn khi người dùng PRO)</Text>
      </View>

      <Pressable
        onPress={() => trySearch(plate)}
        disabled={!plate.trim()}
        style={{ opacity: plate.trim() ? 1 : 0.6 }}
      >
        <LinearGradient colors={[palette.primary, palette.secondary]} style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>{isPro ? 'Tra cứu (PRO)' : 'Tra cứu'}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 14 },
  remaining: { fontSize: 14, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
    letterSpacing: 1
  },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  nativeAd: {
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 88,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center'
  },
  searchBtnText: { color: 'white', fontWeight: '700', fontSize: 16 }
});
