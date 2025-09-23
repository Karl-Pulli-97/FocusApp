import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#0B0E13' }, headerTintColor: 'white', contentStyle: { backgroundColor: '#0B0E13' } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="session" options={{ title: 'Session' }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Ny Session' }} />
    </Stack>
  );
}
