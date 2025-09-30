import { Tabs } from 'expo-router';
import React from 'react';


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#9AA2B2',
        tabBarStyle: { backgroundColor: '#0B0E13' },
        headerStyle: { backgroundColor: '#0B0E13' },
        headerTintColor: 'white',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Hem' }} />
      <Tabs.Screen name="history" options={{ title: 'Historik' }} />
      <Tabs.Screen name="settings" options={{ title: 'Inställningar' }} />
    </Tabs>
  );
}
