import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { 
  Container,
  Title,
  Message,
  Content,
  Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

type NavigationProps = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation(){

 const { width } = useWindowDimensions();
 const { navigate } = useNavigation<NavigationProps>();

 const route = useRoute();
 const { title, message, nextScreenRoute } = route.params as Params; 

 async function handleConfirm(){
   navigate(nextScreenRoute);
 }

 return (
   <Container>  
     <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />   
     <Content>
     <LogoSvg width={width} />
        <DoneSvg width={80} height={80} />    
        <Title>{title}</Title>
        <Message>
          {message}
        </Message>
     </Content>

    <Footer>
      <ConfirmButton title="OK" onPress={handleConfirm} />
    </Footer>
    


   </Container>
 );
}