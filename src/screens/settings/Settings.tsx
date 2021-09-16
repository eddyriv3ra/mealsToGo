import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { List, Avatar } from "react-native-paper";
import Spacer from "../../components/spacer";
import Text from "../../components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../../store/authentication/authenticationContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsItem, AvatarContainer } from "./Settings.style";
// type SettingsScreenPropNavigation = StackNavigationProp<
//   FAvour,
//   "Restaurants"
// >;

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SafeAreaView>
      <AvatarContainer>
        <Avatar.Icon
          size={180}
          icon="human"
          style={{ backgroundColor: "#2182BD" }}
        />
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
