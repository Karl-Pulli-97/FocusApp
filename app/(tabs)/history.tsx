import React from 'react';
import { View, Image, Text } from 'react-native';


export default function HistoryScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#014a6eff', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#7edbe7ff', textShadowColor: '#498fafff', textShadowOffset: { width: 2, height: 0 }, textShadowRadius: 1, fontSize: 45, fontWeight: '800' }}>Akvariet</Text>
            <Image
                source={require('../../assets/images/FishTank.png')}
                style={{ width: 400, height: 400 }}
                resizeMode="contain"
            />
        </View>
    );
}