Lumo the Lama

Lumo the Lama is a React Native application designed to provide an engaging and interactive experience for users. It aims to help
people struggling with mental health to go out more, by recommending them green routes.
Built with modern development practices, it aims to deliver a seamless and intuitive interface.

Features

Cross-Platform Compatibility: Supports both iOS and Android platforms.
Modular Architecture: Organized components and screens for maintainable code.
Responsive Design: Adapts to various screen sizes and orientations.
Real-Time Updates: Utilizes state management for dynamic content rendering.

Project Structure

components/: Reusable UI components.
screens/: Different screens of the application.
App.js: Main entry point of the application.
index.js: Registers the application.
babel.config.js: Babel configuration file.
app.json: Application configuration file.
package.json: Project metadata and dependencies.

Project Dependencies

package.json includes the following key dependencies:

expo: Core Expo SDK package.
react: React library.
react-dom: React DOM bindings.
react-native: React Native framework.
react-native-web: Web support for React Native.
react-navigation: Navigation library for React Native.
react-native-paper: Material Design components for React Native.
These dependencies are essential for building and running the application across different platforms.

⚠️ Notes

Expo Go App: For quick testing on a physical device, install the Expo Go app from the App Store or Google Play. 
Scan the QR code provided in the Expo Developer Tools to launch your app.
Development Builds: If you need to use custom native code or libraries not supported by Expo Go, 
consider creating a development build using Expo's EAS Build service.

Backend In Progress

Please note that the backend for this project is currently under development. 
As a result, certain features may appear functional but are not yet connected to a live backend. 
These features are placeholders and will be fully integrated upon backend completion.

To test the project:
npx expo start 
And don't forget to install the needed dependencies.

License

This project is licensed under the MIT License - see the LICENSE file for details.
