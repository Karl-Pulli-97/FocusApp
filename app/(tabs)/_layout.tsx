import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#98eaffff',
        tabBarInactiveTintColor: '#2b9dd6ff',
        tabBarStyle: { backgroundColor: '#04415fff' },
        headerStyle: { backgroundColor: '#04415fff' },
        headerTintColor: '#2b9dd6ff',
      }}
    >
      <Tabs.Screen name="index" options={{
        title: 'Hem', tabBarIcon: ({ color, size }) => (
          <Ionicons name="fish" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="history" options={{
        title: 'Akvariet', tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="fishbowl-outline" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="settings" options={{
        title: 'Inställningar', tabBarIcon: ({ color, size }) => (
          <Entypo name="dots-three-horizontal" size={size} color={color} />
        )
      }} />
    </Tabs>
  );
}
