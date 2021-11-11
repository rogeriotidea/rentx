import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, InputText, IconContainer } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'],
    value?: string;
}

export function PasswordInput({
    iconName,
    value,
    ...rest
}: Props){
 const [isPasswordVisible, SetIsPasswordVisible] = useState(true);
 const [isFocused, setIsFocused] = useState(false);
 const [isFilled, setIsFilled] = useState(false);

 const theme = useTheme();

 function handleInputFocus(){
    setIsFocused(true);
 }

 function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value);
 }
 

 function handlePasswordVisibilityChange(){
    SetIsPasswordVisible(prevState => !prevState);
 }

 return (
   <Container>
       <IconContainer isFocused={isFocused}>
           <Feather name={iconName} size={24} color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail} />
       </IconContainer>
       <InputText 
          {...rest} 
          secureTextEntry={isPasswordVisible} 
          onFocus={handleInputFocus}
          isFocused={isFocused}
          onBlur={handleInputBlur} />    
       <BorderlessButton onPress={handlePasswordVisibilityChange}>
         <IconContainer>
            <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
         </IconContainer>
       </BorderlessButton>
   </Container>
 );
}