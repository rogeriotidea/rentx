import React from 'react';
import LottieView from 'lottie-react-native';
import LoadingCar from '../../assets/loading.json';

import { Container } from './styles';

export function Load(){
 return (
   <Container>
    <LottieView 
      source={LoadingCar}    
      style={{
        height: 100
      }}
      resizeMode="contain"
      loop
      autoPlay
    />
   </Container>
 );
}