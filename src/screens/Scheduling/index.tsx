import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps} from '../../components/Calendar';
import ArrowSvg from '../../assets/arrow.svg';

import { 
  Container, 
  Header, 
  Title, 
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content, 
  Footer,
  DateValueContainer
} from './styles';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

type NavigationProps = {
  navigate: (screen: string, params: any) => void;
  goBack: () => void;
};

interface Params {
  car: CarDTO
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling(){

 const theme = useTheme();
 const route = useRoute();
 const { car } = route.params as Params;

 const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
 const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
 const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

 const { navigate } = useNavigation<NavigationProps>();

 function handleConfirmRental() {
   if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert("Selecione o intervalo para alugar");
   }
   else{
      navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      });
   }
 }

 function handleChangeDate(date: DayProps){

    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
 }

 return (
   <Container>  
     <Header>
       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
       <BackButton color={theme.colors.shape} onPress={() => {}} />    
       <Title>
         Escolha uma{'\n'}
         ata de inicio e{'\n'} 
         fim do aluguel{'\n'}
       </Title>  
     
       <RentalPeriod>
         <DateInfo>
           <DateTitle>DE</DateTitle>
           <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
           </DateValueContainer>
         </DateInfo>

         <ArrowSvg />

         <DateInfo>
           <DateTitle>ATE</DateTitle>
           <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
           </DateValueContainer>
         </DateInfo>
       </RentalPeriod>

     </Header>

     <Content>
       <Calendar    
          markedDates={markedDates} 
          onDayPress={handleChangeDate}
       />

     </Content>

     <Footer>
       <Button title="Confirmar" onPress={handleConfirmRental} enabled={!!rentalPeriod.endFormatted} ></Button>
     </Footer>
      
   </Container>
 );
}