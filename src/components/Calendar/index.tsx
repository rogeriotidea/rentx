import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ptBR } from './localeConfig';

import { generateInterval } from './generateInterval';

import { 
    Calendar as CustomCalendar,
    LocaleConfig,
} from 'react-native-calendars';
import theme from '../../styles/theme';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    }
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
}

interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress: any;
}

function Calendar({ markedDates, onDayPress }: CalendarProps){
 return (
   <CustomCalendar 
       renderArrow={(direction) => 
        <Feather size={24} color={theme.colors.text} name={direction === 'left' ? 'chevron-left' : 'chevron-right'} />
       }
       headerStyle={{
           backgroundColor: theme.colors.background_secondary,
           borderBottomWidth: 0.5,
           borderBottomColor: theme.colors.text_detail,
           paddingBottom: 10,
           marginBottom: 10
       }}
       theme={{
           textDayFontFamily: theme.fonts.primary_400,
           textDayHeaderFontFamily: theme.fonts.primary_500,
           textDayHeaderFontSize: 10,
           textDayFontSize: 12,
           textMonthFontSize: 20,
           textMonthFontFamily: theme.fonts.secondary_600,
           monthTextColor: theme.colors.title,
           arrowStyle: {
               marginHorizontal: -15
           }
       }}
       firstDay={1}
       markingType="period"
       markedDates={markedDates}
       onDayPress={onDayPress}
       minDate={new Date()}
   />  
 );
}

export { 
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
}