# Welcome to Mindful Minnow app 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Exp

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Components

React Native

1. FlatList
– Visar listan med fokussessions på startsidan och hanterar effektiv rendering. [X]

2. Pressable
– Knappar för handlingar: Starta session, Spara session, Avbryt och Ta bort. [X]

3. Switch
– Toggle per session: “Öppna DND/Inställningar vid start” (på/av). [X]

4. TextInput
– Formulär i “Ny Session” (namn, fokusminuter, pausminuter). [X]

Expo SDK:er

1. expo-notifications
– Ber om notisbehörighet och schemalägger “Fokus klart”/paus-påminnelse. [X]

2. expo-haptics
– Ger haptisk feedback när en session slutar, även när paus slutar (snabb bekräftelsekänsla). [X]

3. expo-intent-launcher
– Android: Öppnar systemets DND-/notisinställningar med ett tryck (snabb genväg).
– iOS: Faller tillbaka på Linking.openSettings() för att öppna appens inställningar. [X]

4. expo-secure-store
– Sparar sessions lokalt (namn, fokus-/paustid, DND-togglen) på ett säkert sätt. [X]

## Att göra/Extra feats

- Göra så att under tiden som man fokuserar så hjälper man till att växa en fisk som man sedan kan se/ta hand om i ett akvarie.
- Skapa ett akvarie som håller de fiskarna som man växer medans man fokuserar.