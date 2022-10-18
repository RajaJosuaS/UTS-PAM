import { View, StyleSheet, Text, TextInput } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerField: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  label: {
    top: -10,
    left: 5,
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: 'white',
    paddingHorizontal: 2
  },
  value: {
    flex: 1,
    paddingHorizontal: 7,
    fontSize: 12,
  }
})

export default function TextFieldComponent({label, value, onChangeText}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerField}>
        <Text style={styles.label}>
          {label}
        </Text>
        <TextInput
          style={styles.value} 
          value={value}
          onChangeText={onChangeText}>
        </TextInput>
      </View>
    </View>
  )
}