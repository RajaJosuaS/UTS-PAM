import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react'

import HomeComponent from './components/HomeComponent'
import ContactEditComponent from './components/ContactEditComponent'

const Stack = createNativeStackNavigator()

const model = {
  homeScreen: {
    dispatch: (navigation, setData, item = null) => {
      const onComeBack = () => {
        navigation.dispatch(
          StackActions.pop()
        )
      }
      navigation.dispatch(
        StackActions.push("Contact Edit", { contact: item, setData: setData, onComeBack: onComeBack})
      )
    }
  }
}

function HomeScreen({ navigation }) {
  const [data, setData] = useState([])
  
  return (
    <HomeComponent 
      onAddContact={() => {
        model.homeScreen.dispatch(navigation, setData)
      }}
      onEditContact={(item) => {
        model.homeScreen.dispatch(navigation, setData, item)
      }}
      data={data}
      setData={setData}/>
  )
}

function ContactEditScreen({route}) {
  return (
    <ContactEditComponent 
      contact={route.params.contact} 
      data={route.params.data} 
      setData={route.params.setData}
      onComeBack={route.params.onComeBack}/>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen
          name="Contact Edit"
          component={ContactEditScreen}
          options={{headerShown: true, headerTitle: ''}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}