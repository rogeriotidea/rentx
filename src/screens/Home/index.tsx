import React, {useEffect, useState} from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { Load } from '../../components/Load';
import { Car } from '../../components/Car';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import {
   Container,
   Header,
   TotalCars, 
   HeaderContent,
   CarList,
   MyCarsButton
 } from './styles';
import { Button } from '../../components/Button';

 type NavigationProps = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;

};

export function Home(){

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation<NavigationProps>();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const theme = useTheme();

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

 function handleCarDetails(car: CarDTO){
    navigate("CarDetails", { car });
 }

 function handleOpenMyCars(){
   navigate('MyCars');
 }

 useEffect(() => {

    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if (isMounted){
          setCars(response.data);
        }
      }
      catch (error) {
        console.log(error);
      }
      finally {
        if (isMounted){
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
 },[]);


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
        {!loading && <TotalCars>
          Total de {cars.length} carros
        </TotalCars>}
      </HeaderContent>
     </Header>
     { loading ? <Load /> : <CarList
      data={cars}
      renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
      keyExtractor={item =>item.id}
     />}

     <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View 
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        > 
          <ButtonAnimated onPress={handleOpenMyCars} style={
            [styles.button, { 
                backgroundColor: theme.colors.main }
            ]}>
            <Ionicons name="ios-car-sport" size={32} color="#FFF" />
          </ButtonAnimated>
        </Animated.View>
     </PanGestureHandler>
   </Container>
 );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})