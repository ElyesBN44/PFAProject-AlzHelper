import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CaregiverDashboard from './screens/CaregiverDashboard';
import DoctorDashboard from './screens/DoctorDashboard';
import AddReportScreen from './screens/AddReportScreen';
import ViewReportsScreen from './screens/ViewReportsScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import AddPatientScreen from './screens/AddPatientScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  CaregiverDashboard: undefined;
  DoctorDashboard: undefined;
  AddReportScreen: undefined;
  ViewReportsScreen: undefined;
  AddNoteScreen: { report: any };
  PatientDetailsScreen: { patient: any };
  AddPatientScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CaregiverDashboard" component={CaregiverDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="AddReportScreen" component={AddReportScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ViewReportsScreen" component={ViewReportsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PatientDetailsScreen" component={PatientDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
