import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { AppStackRoutes } from './app.stack.routes';
import { Profile } from '../screens/Profile';
import { MyCars } from '../screens/MyCars';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){

    const theme = useTheme();

    return (
        <Navigator 
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.colors.main,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarShowLabel: false,
            tabBarStyle: {
                paddingVertical: Platform.OS === 'ios' ? 0 : 0,
            }
          }}
      
         
        >                 
            <Screen 
                name="Inicio"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: (({ color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
            <Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: (({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    ))
                }}
            />            
            <Screen 
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: (({ color }) => (
                        <CarSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
        </Navigator>
    )
}