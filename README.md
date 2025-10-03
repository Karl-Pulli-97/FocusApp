# Welcome to Mindful Minnow app 👋
Min app heter Mindful Minnow!
Detta är en app som är tänkt att hjälpa användaren att fokusera under en period som användaren själv väljer. Appen ger feedback under en session när det är dags att fokusera och när det är dags för rast/vila. Det finns inställningar för hur notiserna ska funka. Det går även att toggla dnd mode när man startar en sektion men den fungerarde inte riktigt som jag tänkt.
Min tanke var även att få till så att undertiden man fokuserar så hjälper man till att växa en fisk som man sedan kan spara i ett akvarie för att få en känsla av progress. I akvariet sen ska man kunna se sina fiskar och man skulle eventuellt kunna interagera med dem som tillexempel ge dem mat.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

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