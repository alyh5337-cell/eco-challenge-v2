import { Preferences } from "@capacitor/preferences";

// Same shape as the storageGet/storageSet helpers used inside App.jsx.
// The `shared` flag is accepted for API compatibility but ignored here —
// this build has no backend, so everything is saved locally on the device
// via Capacitor's native Preferences storage (SharedPreferences on Android).
export async function storageGet(key /*, shared */) {
  try {
    const res = await Preferences.get({ key });
    return res.value ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}

export async function storageSet(key, value /*, shared */) {
  try {
    await Preferences.set({ key, value: JSON.stringify(value) });
    return true;
  } catch {
    return false;
  }
}
