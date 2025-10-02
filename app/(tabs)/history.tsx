import React from 'react';
import { View, Image } from 'react-native';


export default function HistoryScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#014a6eff', justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../../assets/images/FishTank.png')}
                style={{ width: 400, height: 400 }}
                resizeMode="contain"
            />
        </View>
    );
}