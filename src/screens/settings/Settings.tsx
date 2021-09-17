import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { List, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import Spacer from "../../components/spacer";
import Text from "../../components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../../store/authentication/authenticationContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsItem, AvatarContainer } from "./Settings.style";
import { SettingsStackParamList } from "../../navigation/stackNav/SettingsStackNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

type SettingsScreenPropNavigation = StackNavigationProp<
  SettingsStackParamList,
  "Settings"
>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenPropNavigation>();
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState<string | null>(null);

  const getProfilePicture = async (currentUser: any) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <SafeAreaView>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!photo && (
            <Avatar.Icon
              size={180}
              icon="human"
              style={{ backgroundColor: "#2182BD" }}
            />
          )}
          {photo && (
            <Avatar.Image
              size={180}
              source={{ uri: photo }}
              style={{ backgroundColor: "#2182BD" }}
            />
          )}
        </TouchableOpacity>
        <Spacer location="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          style={{ padding: 16 }}
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          style={{ padding: 16 }}
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeAreaView>
  );
};

export default SettingsScreen;
