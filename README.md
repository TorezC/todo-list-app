# How to Run the To-Do App

This guide explains how to set up and run the To-Do app built with **React Native, TypeScript, and Expo**.

---

## Prerequisites

Before running the app, make sure you have:

1. **Node.js v18+** installed → [Download Node.js](https://nodejs.org/)

2. A device or emulator to test the app:

   * **Expo Go** app on iOS/Android (recommended)
   * Android Emulator (via Android Studio)
   * iOS Simulator (Xcode on macOS)

---

## Steps to Run

### 1. Clone the repository

```bash
git clone https://github.com/TorezC/todo-list-app.git/
cd rn-todo-app
```

### 2. Install dependencies

```bash
npm install or yarn
```

### 3. Start the development server

```bash
npm run start or yarn start
```

This will open the **Expo Developer Tools** in your browser.

### 4. Run the app

* **On Android** → Press `a` in the terminal to launch Android Emulator
* **On iOS** → Press `i` to launch iOS Simulator (macOS only)
* **On a physical device** → Scan the QR code with the Expo Go app

---

## Project Scripts

* `npm start` → Start development server
* `npm run android` → Run app on Android emulator/device
* `npm run ios` → Run app on iOS simulator/device
* `npm run web` → Run app in browser

---

## Troubleshooting

* If Metro bundler fails, clear cache:

  ```bash
  npx expo start -c
  ```
* Ensure emulator or Expo Go app is running before starting.
* If issues persist, delete `node_modules` and reinstall:

  ```bash
  rm -rf node_modules package-lock.json
  npm install or yarn
  ```


✅ You’re ready to run and test the app!
