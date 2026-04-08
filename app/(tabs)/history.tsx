import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppStore } from '@/store/useAppStore';
import { getTheme } from '@/theme/tokens';

export default function HistoryScreen() {
  const themeMode = useAppStore((s) => s.themeMode);
  const palette = getTheme(themeMode);
  const history = useAppStore((s) => s.history);
  const deleteHistoryItem = useAppStore((s) => s.deleteHistoryItem);

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <FlashList
        data={history}
        estimatedItemSize={80}
        ListEmptyComponent={<Text style={{ color: palette.mutedText, margin: 16 }}>Chưa có lượt tra cứu nào.</Text>}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => Alert.alert('Selection mode', 'Mẫu nhấn giữ để chọn nhiều mục.')}
            style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}
          >
            <Text style={[styles.plate, { color: palette.text }]}>{item.plate}</Text>
            <Text style={{ color: palette.mutedText }}>{item.vehicleType}</Text>
            <Text style={{ color: palette.mutedText }}>Tra cứu gần nhất: {item.checkedAt}</Text>
            <Pressable onPress={() => deleteHistoryItem(item.id)} style={styles.deleteBtn}>
              <Text style={{ color: '#DC2626', fontWeight: '600' }}>Xóa nhanh</Text>
            </Pressable>
          </Pressable>
        )}
      />
      <View style={[styles.banner, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={{ color: palette.mutedText }}>Banner Ad (ẩn khi PRO)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 4
  },
  plate: { fontSize: 18, fontWeight: '700' },
  deleteBtn: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FEE2E2'
  },
  banner: {
    margin: 16,
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
