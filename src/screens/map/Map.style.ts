import styled from "styled-components/native";
import Map from "react-native-maps";

export const MapContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const MapView = styled(Map)`
  width: 100%;
  height: 100%;
`;

export const SearchbarContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  top: 40px;
  z-index: 999;
  width: 100%;
`;
