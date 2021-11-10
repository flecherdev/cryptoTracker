## App Crypto currency
Exercice with React Native
## Dependencies
# general
npm install @react-navigation/native @react-navigation/stack npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
# navigation tabs
1- documentation: https://reactnavigation.org/docs/1.x/tab-navigator/ 
2- npm install @react-navigation/bottom-tabs

## Fix with xcworkspace in directory ios
1- Delete your Podfile.lock (I like to use the command '-rm -rf Podfile.lock' on the terminal for this)
2- Delete your Pods folder (I like to use the command '-rm -rf Pods' in the terminal for this)
3- Delete your .xcworkspace
4- Execute in terminal pod install
5- Open directory ios with xcode and wait until finish indexed to files.

## Clean cache
npx cache clean --force

## Run 
npm run ios or npx react-native run-ios // change ios for android
