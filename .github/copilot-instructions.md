# Copilot Instructions for Pokedex React Native Project

## Project Overview

- This is a React Native app bootstrapped with `@react-native-community/cli`.
- The main entry point is `index.js`, which registers the `PokedexApp` from `src/PokedexApp.tsx`.
- The app uses a modular architecture: `src/domain` (entities), `src/infrastructure` (API interfaces, mappers), `src/presentation` (UI components, context, hooks, navigation, screens).
- Navigation is managed via `StackNavigator` in `src/presentation/navigator/StackNavigator.tsx`.
- State management and data fetching use `@tanstack/react-query` and custom context providers (e.g., `ThemeContextProvider`).

## Build & Run Workflows

- **Start Metro (JS bundler):**
  - `npm start` or `yarn start` from project root.
- **Android:**
  - `npm run android` or `yarn android`
- **iOS:**
  - First run: `bundle install` (installs CocoaPods via Ruby bundler)
  - After native deps update: `bundle exec pod install`
  - Run: `npm run ios` or `yarn ios`
- **Hot Reload / Fast Refresh:**
  - Edit `App.tsx` or any screen/component, save to auto-refresh.
  - Full reload: Press `R` in iOS Simulator, or double `R` in Android Emulator.

## Testing

- Tests are in `__tests__/` (e.g., `App.test.tsx`).
- Use `npm test` or `yarn test` to run Jest tests.

## Code Structure & Patterns

- **API Integration:**
  - API interfaces in `src/infrastructure/interfaces/poke-api.interfaces.ts` (auto-generated via quicktype.io).
  - Data mapping via `PokemonMapper` in `src/infrastructure/mappers/pokemon.mapper.ts`.
- **UI Components:**
  - Organized under `src/presentation/components/`.
  - Screens in `src/presentation/screens/`.
- **Theme & Context:**
  - Theming via `ThemeContextProvider` in `src/presentation/context/ThemeContext.tsx`.
- **Navigation:**
  - Stack navigation setup in `src/presentation/navigator/StackNavigator.tsx`.
- **Assets:**
  - Images in `src/assets/`.

## Conventions

- TypeScript is used throughout (`.ts`, `.tsx`).
- Prettier and ESLint configs: see `.prettierrc.js` and `.eslintrc.js`.
- API types are generated and should not be manually edited.
- Use React Query for all async data fetching.
- Use context providers for global state (theme, etc).

## Native Integration

- iOS native code in `ios/pokedex/` (Swift, Storyboard, Info.plist).
- Android native code in `android/app/` (Gradle configs).
- For native dependency changes, always run `bundle exec pod install` (iOS).

## Troubleshooting

- See [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) for common issues.

---

**For questions or unclear patterns, review `README.md` or ask for clarification.**
