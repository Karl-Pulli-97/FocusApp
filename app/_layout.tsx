import { Stack } from 'expo-router';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#0B0E13' }, headerTintColor: 'white', contentStyle: { backgroundColor: '#0B0E13' } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="session" options={{ title: 'Session' }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Ny Session' }} />
    </Stack>
  );
}
