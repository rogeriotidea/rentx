import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
    Container,
    Title,
} from './styles';

interface Props extends RectButtonProps { 
    title: string;
    color?: string;
    loading?: boolean;
    light?: boolean;
}

export function Button({
  title,
  color,
  enabled,
  light = false,
  loading = false,
  ...rest  
}: Props){
 
 const theme = useTheme();
 return (
   <Container {...rest} color={color} enabled={enabled} style={{opacity: (enabled === false || loading === true) ? .5 : 1}}>
      {loading ? <ActivityIndicator color={theme.colors.shape} /> : <Title light={light} >{title}</Title>}
   </Container>
 );
}