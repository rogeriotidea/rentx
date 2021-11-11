import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { 
  StatusBar, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { 
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Form,
 } from './styles';

import theme from '../../styles/theme';
import { PasswordInput } from '../../components/PasswordInput';
import { database } from '../../database';

export function SignIn(){
 
 const [email, setEmail] = useState(''); 
 const [password, setPassword] = useState('');
 const { navigate } = useNavigation();
 const { signIn } = useAuth();

 async function handleSignIn() {
    try {  
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatorio').email('email invalido'),
          password: Yup.string().required('Senha obrigatoria')
        });

        await schema.validate({ email, password });

        await signIn({email, password});
        Alert.alert('Tudo certo !');
    }
    catch(error){

      if (error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      }
      else{
        Alert.alert('Erro na autenticacao', 'Ocorreu um erro');
      }
    }
 }

 function handleNewAccount(){
    navigate('SignUpFirstStep');
 }

 useEffect(() => {
    async function loadData(){
       const userCollection = database.get('users');
       const users = await userCollection.query().fetch();
       console.log(users);
    }

    loadData();
 },[]);

 return (
   <KeyboardAvoidingView behavior="position" enabled>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <Container>
       <StatusBar
          translucent
          barStyle="dark-content" 
          backgroundColor="transparent" 
       />
       <Header>
         <Title>
           Estamos{'\n'}quase lá
         </Title>
         <SubTitle>
           Faça seu login para começar{'\n'}uma experiência incrível.
         </SubTitle>
       </Header>      

       <Form>    

          <Input 
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          /> 

          <PasswordInput 
            iconName="lock"
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"    
            onChangeText={setPassword}
            value={password}        
          />
          
       </Form>

       <Footer>         
          <Button 
            title="Login" 
            onPress={handleSignIn} 
            enabled={true} 
            loading={false} />
          <Button 
            color={theme.colors.background_secondary}
            title="Criar conta gratuita" 
            light={true}
            onPress={handleNewAccount} 
            enabled={true} 
            loading={false} />
       </Footer>
   </Container>
   </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
 );
}