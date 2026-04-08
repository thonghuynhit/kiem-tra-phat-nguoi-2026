# Kiểm tra phạt nguội 2026 (Expo)

Khung ứng dụng React Native Expo theo đúng đặc tả Technical Specification/UI-UX:

- 3 tab chính bằng `expo-router`: **Kiểm tra**, **Lịch sử**, **Cài đặt**.
- Theme 3 chế độ: `light`, `deepBlue`, `dark`.
- Trạng thái người dùng + giới hạn lượt miễn phí (3 lần) bằng `zustand` + `AsyncStorage`.
- Chỉ giữ phần UI và luồng mock, chưa tích hợp SDK native bên thứ ba.

## Chạy local

```bash
npm install
npm run start
```

## Kiến trúc nhanh

- `app/(tabs)/check.tsx`: UI tra cứu + chip phương tiện + CTA gradient.
- `app/(tabs)/history.tsx`: danh sách lịch sử card-based + placeholder banner.
- `app/(tabs)/settings.tsx`: nâng cấp PRO (mock), đổi theme, info menu.
- `src/store/useAppStore.ts`: logic paywall local (`searchCount > 3` nếu chưa PRO thì chặn).
- `src/theme/tokens.ts`: design tokens cho 3 theme.

## Bộ thư viện đã tối giản cho Expo SDK 54

Để tránh xung đột giữa thư viện Expo-managed và thư viện thiên về React Native CLI, dự án hiện chỉ giữ các package phù hợp với phần giao diện:

- `expo` `~54.0.0`
- `expo-router` `~4.0.0`
- `react-native` `0.81.0`
- `react` `19.1.0`
- `react-native-gesture-handler` `~2.28.0`
- `expo-linear-gradient` `~14.1.0`
- `@react-native-async-storage/async-storage` `2.2.0`
- `zustand` `^5.0.2`
- `lucide-react-native` `^0.468.0`

Các package native không cần cho UI đã được loại bỏ (ví dụ: IAP/ads/push) để bạn tự tích hợp lại sau theo đúng nhu cầu production.
