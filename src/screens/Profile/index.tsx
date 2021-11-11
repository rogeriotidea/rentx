import React from 'react';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { 
    Container } from './styles';

export function Profile(){
   const theme = useTheme();

   function handleSignOut(){

   }

   return (
   <Container>  
       <Header>
           <HeaderTop>
               <BackButton color={theme.colors.shape} />
               <HeaderTitle>Editar Perfil</HeaderTitle>
               <LogoutButton onPress={handleSignOut}>
                   <Feather name="power" size={24} color={theme.colors.shape} />
               </LogoutButton>
           </HeaderTop>
           <PhotoContainer>
               <Photo source={{uri: 'https://avatars.githubusercontent.com/u/33330827?v=4https://avatars.githubusercontent.com/u/33330827?v=4'}} />
           </PhotoContainer>
       </Header>


   </Container>
 );
}