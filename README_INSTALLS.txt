#React navigation. allows us to implement a
#navigation system between views
- npm install @react-navigation/native
- npm install react-native-screens
- npm install react-native-safe-area-context
- npm install @react-navigation/native-stack
  #MainActivity.java
  #Import on top file and below the package statement
  import android.os.Bundle;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
#If you have an error "RNCSafeAreaProvider" was not 
#found in the UIManager Error
- Uninstall APP from phone
- npm link react-native-safe-area-context
- cd android/ -> ./gradlew clean -> cd .. -> 
  npx react-native run-android


#React Native Elements
- npm install @rneui/themed @rneui/base
- npm install react-native-vector-icons
  #If the icons don't work go to: 
  # android/app/build.gradle and paste at top
  - apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

#Async Storage to save data in 
#local storage device
- npm install @react-native-async-storage/async-storage


#Date fns
- npm install date-fns --save

#Circular progress indicator
- npm install react-native-circular-progress-indicator
- npm install react-native-svg



#To use Circular Progress
#****** React Native Reanimated is annoying ******
#https://github.com/expo/expo/issues/22444
#If you have this problem:
#ninja: error: manifest 'build.ninja' still dirty after 100 tries #22444
#*** Move your Folder APP to a directory shorter

#https://github.com/software-mansion/react-native-reanimated/issues/4624
- npm install react-native-reanimated@3.1.0
  #In "babel.config.js" paste the next
  module.exports = {
    ... ------>
    plugins: ["react-native-reanimated/plugin",],
  };
  #https://sebhastian.com/remove-node-modules/
- npx rimraf node_modules
- npm i
- cd android -> ./gradlew clean -> cd .. 
  -> Close VSCode an re-open
- npm start -- --reset-cache

#To use Circular Progress
- yarn add react-native-redash 
or 
- npm install react-native-redash