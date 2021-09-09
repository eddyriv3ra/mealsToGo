import styled from "styled-components/native";
import { FlatList } from "react-native";

export const SearchbarContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const CenterContainer = styled.View`
  justify-content: center;
  flex: 1;
`;
