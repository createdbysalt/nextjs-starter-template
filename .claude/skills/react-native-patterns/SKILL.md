# React Native Patterns (Expo)

## Project Structure
````
src/
├── components/
│   ├── platform/     # Platform-specific (iOS/Android)
│   └── shared/       # Cross-platform
├── screens/
├── navigation/
├── services/
│   ├── api/
│   └── storage/
├── hooks/
└── utils/
````

## Expo SDK 54 + New Architecture

### Enable New Architecture
````json
// app.json
{
  "expo": {
    "newArchEnabled": true,
    "plugins": [
      "expo-router"
    ]
  }
}
````

### File-Based Routing (Expo Router)
````
app/
├── (tabs)/
│   ├── index.tsx       # /
│   ├── profile.tsx     # /profile
│   └── _layout.tsx
├── modal.tsx           # Modal route
└── _layout.tsx
````

## Testing with Expo

### Component Tests
````typescript
// __tests__/components/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Tap Me</Button>
    );
    
    fireEvent.press(getByText('Tap Me'));
    expect(onPress).toHaveBeenCalled();
  });
});
````

### E2E with Detox
````typescript
// e2e/login.test.ts
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login successfully', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password');
    await element(by.id('login-button')).tap();
    
    await expect(element(by.text('Welcome'))).toBeVisible();
  });
});
````