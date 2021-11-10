import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

export function SchedulingComplete(){

 const { width } = useWindowDimensions();

 const { navigate } = useNavigation<NavigationProps>();

 async function handleConfirm(){
   navigate('Home');
 }

 return (
   <Container>  
     <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />   
     <Content>
     <LogoSvg width={width} />
        <DoneSvg width={80} height={80} />    
        <Title>Carro alugado !</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          ate a concessionaria da RENTX {'\n'}
          pegar o seu automovel.
        </Message>
     </Content>

    <Footer>
      <ConfirmButton title="OK" onPress={handleConfirm} />
    </Footer>
    


   </Container>
 );
}