# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

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
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Components

React Native

1. FlatList
– Visar listan med fokussessions på startsidan och hanterar effektiv rendering.

2. Pressable
– Knappar för handlingar: Starta session, Spara session, Avbryt, Ta bort (långtryck).

3. Switch
– Toggle per session: “Öppna DND/Inställningar vid start” (på/av).

4. TextInput
– Formulär i “Ny Session” (namn, fokusminuter, pausminuter).

Expo SDK:er

1. expo-notifications
– Ber om notisbehörighet och schemalägger “Fokus klart”/paus-påminnelse.

2. expo-haptics
– Ger haptisk feedback när en session startar/slutar (snabb bekräftelsekänsla).

3. expo-intent-launcher
– Android: Öppnar systemets DND-/notisinställningar med ett tryck (snabb genväg).
– iOS: Faller tillbaka på Linking.openSettings() för att öppna appens inställningar.

4. expo-secure-store
– Sparar sessions lokalt (namn, fokus-/paustid, DND-togglen) på ett säkert sätt.

## Att göra/Extra feats

- Kunna skriva in och spara datum och deadlines för tentor eller inlämningar.
- Notiser som påminner om dessa events.

- Kolla om man kan tysta andra appar medans man har igång en session.

