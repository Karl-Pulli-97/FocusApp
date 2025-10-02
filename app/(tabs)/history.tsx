import React from 'react';
import { View, Text } from 'react-native';


export default function HistoryScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#014a6eff', padding: 16 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Historik</Text>
            <Text style={{ color: '#9AA2B2' }}>Visa tidigare sessions. (Placeholder)</Text>
        </View>
    );
}