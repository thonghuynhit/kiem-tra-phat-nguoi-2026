# Kiểm tra phạt nguội 2026 (Expo)

Khung ứng dụng React Native Expo theo đúng đặc tả Technical Specification/UI-UX:

- 3 tab chính bằng `expo-router`: **Kiểm tra**, **Lịch sử**, **Cài đặt**.
- Theme 3 chế độ: `light`, `deepBlue`, `dark`.
- Trạng thái người dùng + giới hạn lượt miễn phí (3 lần) bằng `zustand` + `AsyncStorage`.
- Sẵn `.env.example` cho OneSignal, AdMob, RevenueCat, API.

## Chạy local

```bash
npm install
npm run start
```

## Kiến trúc nhanh

- `app/(tabs)/check.tsx`: UI tra cứu + chip phương tiện + CTA gradient + vị trí Native Ad.
- `app/(tabs)/history.tsx`: danh sách lịch sử card-based + placeholder banner ad.
- `app/(tabs)/settings.tsx`: nâng cấp PRO, đổi theme, info menu.
- `src/store/useAppStore.ts`: logic paywall local (`searchCount > 3` nếu chưa PRO thì chặn).
- `src/theme/tokens.ts`: design tokens cho 3 theme.

## Ghi chú tích hợp production

- Thay placeholder ad bằng `react-native-google-mobile-ads` Native/Banner component.
- Kết nối RevenueCat thật trong action `upgradeToPro`.
- Thay `trySearch` mock bằng API thật qua `API_BASE_URL`.


## Nâng cấp Expo SDK 55 (tháng 02/2026)

Đã đồng bộ các package cốt lõi theo Expo SDK 55 để giảm rủi ro xung đột phiên bản:

- `expo` `~55.0.12`
- `expo-router` `~55.0.11`
- `react-native` `0.83.4`
- `react` `19.2.0`
- `react-native-gesture-handler` `~2.30.0`
- `react-native-reanimated` `4.2.1` + `react-native-worklets` `0.7.2`
- `expo-linear-gradient` `~55.0.11`
- `@react-native-async-storage/async-storage` `2.2.0`
- `@shopify/flash-list` `2.0.2`

Khuyến nghị sau khi pull code:

```bash
npm install
npx expo-doctor@latest
```

> Lưu ý: các thư viện native bên thứ ba như `react-native-google-mobile-ads`, `react-native-onesignal`, `react-native-purchases` nên được kiểm tra thêm bằng `expo-doctor` và build thật trên Android/iOS vì chúng có chu kỳ cập nhật riêng.
