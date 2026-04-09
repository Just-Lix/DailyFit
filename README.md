# DailyFit

Mobile application for smart wardrobe management and digital outfit planning.

## Overview
DailyFit is a React Native solution designed to digitize personal wardrobes. It allows users to manage their clothing inventory, remove backgrounds from photos automatically, and plan outfits through a clean, intuitive interface.

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

