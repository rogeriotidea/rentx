import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

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

interface NavigationProps {
   navigate(screen: string, params: any): void;
}

export function SignUpFirstStep(){  
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const { navigate } = useNavigation<NavigationProps>();

  async function handleNextStep(){
     try {
         const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatorio'),
            email: Yup.string().required('Email obrigatorio').email('email invalido'),
            driverLicense: Yup.string().required('CNH é obrigatória')
         });

         const data = { name, email, driverLicense };
         await schema.validate(data);

         navigate('SignUpSecondStep', { user: data });
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
         <FormTitle>1. Dados</FormTitle>
         <Input 
            iconName="user"
            placeholder="Nome"   
            onChangeText={setName}
            value={name}         
         />
         <Input 
            iconName="mail"
            placeholder="Email"   
            keyboardType="email-address"   
            onChangeText={setEmail}
            value={email}     
            autoCorrect={false}
            autoCapitalize="none" 
         />
         <Input 
            iconName="credit-card"
            placeholder="CNH"          
            keyboardType="numeric"  
            onChangeText={setDriverLicense}
            value={driverLicense}
         />
      </Form>
      <Button 
         title="Próximo"
         onPress={handleNextStep}
      />
   </Container>
   </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
 );
}