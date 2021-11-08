import React from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

import { Car } from '../../components/Car';

import {
   Container,
   Header,
   TotalCars, 
   HeaderContent,
   CarList
 } from './styles';

export function Home(){

  const carData = {
    brand: 'Audi',
    name: 'RS Coupe',
    rent: {
        period: 'Ao dia',
        price: 120,
    },
    thumbnail: 'https://tmdcobreq.com.br/lancamentos/N-2071_A5/N-2071_A5-IMAGEM-CARRO.png'    

  }
 return (
   <Container>  
     <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
     />
     <Header>
       <HeaderContent>
        <Logo 
          width={RFValue(100)}
          height={RFValue(12)}        
        />
        <TotalCars>
          Total de 12 carros
        </TotalCars>
      </HeaderContent>
     </Header>
     <CarList
      data={[1,2,3,4,5,6,7]}
      renderItem={({ item }) => <Car data={carData} />}
      keyExtractor={item => String(item)}
     />
      
   
   </Container>
 );
}