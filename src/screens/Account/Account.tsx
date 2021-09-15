import { useNavigation } from "@react-navigation/core";
import React from "react";
import LottieView from "lottie-react-native";
import Spacer from "../../components/spacer";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  AccountBackground,
  AnimationWrapper,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from "./Account.styles";
import { AuthStackParamList } from "../../navigation/stackNav/AuthStack";

type AccountcreenPropNavigation = StackNavigationProp<
  AuthStackParamList,
  "Main"
>;

const AccountScreen = () => {
  const navigation = useNavigation<AccountcreenPropNavigation>();

  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/watermelon.json")}
        />
      </AnimationWrapper>
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large" location="top">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

export default AccountScreen;
