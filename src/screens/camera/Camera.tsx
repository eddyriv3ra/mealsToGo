import React, { useRef, useState, useEffect } from "react";
// import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View } from "react-native";
import Text from "../../components/Text";

// const ProfileCamera = styled(Camera)`
//   width: 100%;
//   height: 100%;
// `;

const CameraScreen = () => {
  return null;
  // const [hasPermission, setHasPermission] = useState(false);
  // const cameraRef = useRef<Camera | null>(null);

  // useEffect(() => {
  //   const hasPermission = async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };
  //   hasPermission();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  // return (
  //   <ProfileCamera
  //     ref={(camera) => (cameraRef.current = camera)}
  //     type={Camera.Constants.Type.front}
  //   ></ProfileCamera>
  // );
};

export default CameraScreen;
