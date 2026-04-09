# DailyFit

DailyFit is a mobile solution designed for personal wardrobe management. Built with **React Native (Expo)**, it allows users to inventory their clothing, plan outfits, schedule outfits and use AI-driven features for a seamless digital closet experience.

## Technical Stack
- **Framework:** React Native (Expo)
- **State Management:** React Hooks (useState, useEffect)
- **Backend & Auth:** Firebase (Authentication & Firestore)
- **Cloud Storage & Edge Cases:** Supabase (Relational data management & asset storage)
- **API Integration:** Axios (Background removal via REST API)
- **Navigation:** React Navigation (Stack Navigator)

## Key Technical Implementations
- **API Orchestration:** In `PhotoEditorScreen.js`, I implemented a flow to convert image buffers to base64 and process them through a background removal API.
- **Dynamic Data Handling:** Real-time CRUD operations with Firebase Firestore to manage user themes and clothing items.
- **Cloud Integration:** Scalable storage and authentication setup using Firebase and Supabase.

