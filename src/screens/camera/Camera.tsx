import React, { useRef, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RNCamera } from "react-native-camera";
import styled from "styled-components/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthenticationContext } from "../../store/authentication/authenticationContext";
import Text from "../../components/Text";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsStackParamList } from "../../navigation/stackNav/SettingsStackNav";

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "lightgreen",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text>Waiting</Text>
  </View>
);

type CameraScreenPropNavigation = StackNavigationProp<
  SettingsStackParamList,
  "Camera"
>;

const CameraScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigation<CameraScreenPropNavigation>();

  const takePicture = async (camera: any) => {
    const options = { quality: 0.5, base64: true };
    const photo = await camera.takePictureAsync(options);
    AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        androidRecordAudioPermissionOptions={{
          title: "Permission to use audio recording",
          message: "We need your permission to use your audio",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== "READY") return <PendingView />;
          return (
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}
              >
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});

export default CameraScreen;
