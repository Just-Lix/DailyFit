import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import styles from './UploadStyle'; // Updated to use UploadStyle.js

// Helper function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Custom Checkbox Component
const CustomCheckbox = ({ checked, onChange, label }) => (
  <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Text style={{ color: 'white' }}>✓</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const PhotoEditorScreen = ({ route }) => {
  const { photoUri } = route.params;
  const [editedPhoto, setEditedPhoto] = useState(photoUri);
  const [isBackgroundRemoved, setIsBackgroundRemoved] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState([]); // Initialize with an empty array
  const [selectedType, setSelectedType] = useState('Roupa');
  const [canSave, setCanSave] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setEditedPhoto(photoUri);
    setIsBackgroundRemoved(false);

    return () => {
      setEditedPhoto(null);
      setIsBackgroundRemoved(false);
    };
  }, [photoUri]);

  const handleRemoveBackground = async () => {
    console.log("Background removal initiated...");
    try {
      const base64 = await FileSystem.readAsStringAsync(photoUri, { encoding: FileSystem.EncodingType.Base64 });
      const response = await axios.post(
        'https://api.remove.bg/v1.0/removebg',
        { image_file_b64: base64 },
        {
          headers: { 'X-Api-Key': 'S3Gd6w9qS5WkbYD7poPERuAd' },
          responseType: 'arraybuffer',
        }
      );

      const base64Image = `data:image/png;base64,${arrayBufferToBase64(response.data)}`;
      const newUri = `${FileSystem.documentDirectory}no-bg.png`;

      await FileSystem.writeAsStringAsync(
        newUri,
        base64Image.replace(/^data:image\/\w+;base64,/, ''),
        { encoding: FileSystem.EncodingType.Base64 }
      );

      setEditedPhoto(newUri);
      console.log("Background removal successful. Updated photo URI:", newUri);
    } catch (error) {
      console.error("Background removal failed:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Background removal failed. Please check your API key and usage limits.");
    }
  };

  const toggleBackgroundRemoval = () => {
    if (isBackgroundRemoved) {
      setEditedPhoto(photoUri);
    } else {
      handleRemoveBackground();
    }
    setIsBackgroundRemoved(!isBackgroundRemoved);
  };

  const toggleSeason = (season) => {
    setSelectedSeason((prev) =>
      prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season]
    );
    setCanSave(selectedSeason.length > 0);
  };

  const handleRotateImage = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const saveToFirebase = async () => {
    try {
      if (!canSave) {
        Alert.alert("Error", "Please select at least one season before saving.");
        return;
      }

      const fileUri = editedPhoto;
      const fileBlob = await (await fetch(fileUri)).blob();
      const storage = getStorage();
      const fileName = `images/${Date.now()}.png`;
      const storageRef = ref(storage, fileName);

      console.log("Uploading to Firebase Storage:", fileName);
      const snapshot = await uploadBytes(storageRef, fileBlob);
      console.log("Upload successful:", snapshot);

      const photoUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(snapshot.metadata.name)}?alt=media`;

      const userID = "exampleUserID";
      await addDoc(collection(db, "userPhotos"), {
        PhotoURL: photoUrl,
        type: selectedType,
        seasons: selectedSeason,
        timestamp: new Date(),
        userID: userID,
      });

      Alert.alert("Success", "Image saved to Firebase successfully!");
    } catch (error) {
      console.error("Error saving to Firebase:", error.message);
      Alert.alert("Error", "Failed to save image to Firebase.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleBackgroundRemoval} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="scissors-cutting"
            size={30}
            color={isBackgroundRemoved ? 'red' : 'black'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRotateImage} style={styles.iconButton}>
          <MaterialCommunityIcons name="rotate-right" size={30} color="black" />
        </TouchableOpacity>

        <Image
          source={{ uri: editedPhoto }}
          style={[styles.image, { transform: [{ rotate: `${rotation}deg` }] }]}
          resizeMode="contain"
        />

        <View style={styles.typeContainer}>
          {['Roupa', 'Outfit'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedType(type)}
              style={[
                styles.typeButton,
                selectedType === type && styles.typeButtonSelected,
              ]}
            >
              <Text style={styles.typeButtonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.weatherContainer}>
          {['Primavera', 'Verão', 'Outono', 'Inverno'].map((season) => (
            <CustomCheckbox
              key={season}
              checked={selectedSeason.includes(season)}
              onChange={() => toggleSeason(season)}
              label={season}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={saveToFirebase}
          style={[styles.saveButton, !canSave && styles.disabledButton]}
          disabled={!canSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PhotoEditorScreen;
