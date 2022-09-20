# Getting Started with the test app

First install Android Studio. Make sure command line tools (ADB) are included in the installation. Although, they should be installed by default without any additional input. Install emulator and at least one Android system image. Android 12 or 11 should work just fine. Or, if you have an Android phone, you can use it for development as well.

**Important**
If you have already installed Node on your system, make sure it is Node 14 or newer. If you already have a JDK on your system, we recommend JDK11. You may encounter problems using higher JDK versions.

Make sure you have path to Android SDK specified in `android/local.properties` file. Here's what it could look like for macOS:
`sdk.dir=/Users/username/Library/Android/sdk`

We strongly recommend using `yarn` for this project. Running `yarn install` should take care of installing all dependencies and linking them to the native projects.

# Launching the app

Connect your phone to your computer, or start the emulator. If everything is set up correctly, running `yarn android` should build the project, start the metro bundler, install and launch the app.

# Additional info

Please refer to the [official docs](https://reactnative.dev/docs/environment-setup) for any additional information.
