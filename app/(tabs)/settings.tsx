import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Crown, Info, Mail, Moon } from 'lucide-react-native';
import { ThemeMode, useAppStore } from '@/store/useAppStore';
import { getTheme } from '@/theme/tokens';

const THEMES: ThemeMode[] = ['light', 'deepBlue', 'dark'];

export default function SettingsScreen() {
  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const upgradeToPro = useAppStore((s) => s.upgradeToPro);
  const palette = getTheme(themeMode);

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}> 
      <Pressable style={[styles.row, { backgroundColor: palette.card }]} onPress={upgradeToPro}>
        <Crown color={palette.primary} size={18} />
        <Text style={[styles.text, { color: palette.text }]}>Mua bản PRO (Subscription tháng / năm)</Text>
      </Pressable>

      <View style={[styles.row, { backgroundColor: palette.card, alignItems: 'flex-start' }]}>
        <Moon color={palette.primary} size={18} style={{ marginTop: 2 }} />
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={[styles.text, { color: palette.text }]}>Đổi giao diện</Text>
          <View style={styles.themeRow}>
            {THEMES.map((mode) => (
              <Pressable
                key={mode}
                onPress={() => setThemeMode(mode)}
                style={[styles.themeChip, { borderColor: mode === themeMode ? palette.primary : palette.border }]}
              >
                <Text style={{ color: palette.text }}>{mode}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <Pressable style={[styles.row, { backgroundColor: palette.card }]} onPress={() => Alert.alert('Liên hệ', 'Mở Mail / Zalo')}>
        <Mail color={palette.primary} size={18} />
        <Text style={[styles.text, { color: palette.text }]}>Liên hệ</Text>
      </Pressable>

      <Pressable style={[styles.row, { backgroundColor: palette.card }]} onPress={() => Alert.alert('Về chúng tôi')}>
        <Info color={palette.primary} size={18} />
        <Text style={[styles.text, { color: palette.text }]}>Giới thiệu / Về chúng tôi</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  row: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  text: { fontWeight: '600', flex: 1 },
  themeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  themeChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }
});
