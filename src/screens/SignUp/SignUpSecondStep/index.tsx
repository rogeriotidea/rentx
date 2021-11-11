import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import api from '../../../services/api';

import { 
   KeyboardAvoidingView, 
   TouchableWithoutFeedback, 
   Keyboard,
   Alert,  
 } from 'react-native';

import { 
   Container, 
   Header,
   Steps,
   Title, 
   SubTitle,
   Form,
   FormTitle,
} from './styles';

interface Params {
   user: {
      name: string;
      email: string;
      driverLicense: string;
   }
}

interface NavigationProps {
   navigate(screen: string, params: any): void;
}

export function SignUpSecondStep(){

 const [password, setPassword] = useState('');
 const [passwordConfirm, setPasswordConfirm] = useState('');    

 const { navigate } = useNavigation<NavigationProps>();
 const theme = useTheme();
 const route = useRoute();

 const { user } = route.params as Params;

 async function handleRegister(){
    if (!password || !passwordConfirm){
       return Alert.alert('Informe a senha e a confirmação !');
    }

    if (password !== passwordConfirm){
      return Alert.alert('As senhas nao sao iguais !');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,     
    }).then(() => {
      navigate('Confirmation', {
         nextScreenRoute: 'SignIn',
         title: 'Conta Criada !',
         message: `Agora é so fazer login\ne aproveitar`
      })
    })
    .catch(() => {
       Alert.alert('Opa', 'Nao foi possivel cadastrar');
    })
    
 }

 return (
   <KeyboardAvoidingView behavior="position" enabled>
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   <Container>
      <Header>
        <BackButton />     
        <Steps>              
           <Bullet active />
           <Bullet />
        </Steps>    
      </Header>

      <Title>
         Crie sua{'\n'}conta
      </Title>       

      <SubTitle>
         Faça seu cadastro de{'\n'}   
         forma rápida e fácil
      </SubTitle>

      <Form>
         <FormTitle>2. Senha</FormTitle>
         <PasswordInput 
            iconName="lock"
            placeholder="Senha"  
            onChangeText={setPassword}
            value={password}          
         />   
         <PasswordInput 
            iconName="lock"
            placeholder="Repetir Senha" 
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}                
         />        
      </Form> 
      <Button 
         title="Cadastrar"
         color={theme.colors.success}
         onPress={handleRegister}
      />
   </Container>
   </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
 );
}