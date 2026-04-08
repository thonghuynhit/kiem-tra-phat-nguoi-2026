import { Tabs } from 'expo-router';
import { Search, History, Settings } from 'lucide-react-native';
import { useAppStore } from '@/store/useAppStore';
import { getTheme } from '@/theme/tokens';

export default function TabsLayout() {
  const themeMode = useAppStore((state) => state.themeMode);
  const palette = getTheme(themeMode);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: palette.background },
        headerTintColor: palette.text,
        tabBarStyle: { backgroundColor: palette.card, borderTopColor: palette.border },
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.mutedText
      }}
    >
      <Tabs.Screen
        name="check"
        options={{
          title: 'Kiểm tra',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Lịch sử',
          tabBarIcon: ({ color, size }) => <History color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
