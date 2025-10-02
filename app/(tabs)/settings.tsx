import React from 'react';
import { View, Text } from 'react-native';


export default function SettingsScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#014a6eff', padding: 16 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Inställningar</Text>
            <Text style={{ color: '#9AA2B2' }}>Inställningar (Placeholder)</Text>
        </View>
    );
}