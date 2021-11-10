import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container } from './styles';

interface Props extends BorderlessButtonProps {
    color?: string;
}

type NavigationProps = {
  navigate: (screen: string) => void;
  goBack: () => void;
};


export function BackButton({ color, ...rest }: Props){

 const theme = useTheme();
 const { navigate, goBack } = useNavigation<NavigationProps>();



 return (
   <Container onPress={goBack} >
       <MaterialIcons 
            name="chevron-left"
            size={24}
            color={color ? color : theme.colors.text}
       />
   </Container>
 );
}