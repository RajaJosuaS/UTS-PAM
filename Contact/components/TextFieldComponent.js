import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerField: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center'
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
    paddingHorizontal: 7,
    fontSize: 12,
  }
})

export default function TextFieldComponent({label, value}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerField}>
        <Text style={styles.label}>
          {label}
        </Text>
        <Text style={styles.value}>
          {value}
        </Text>
      </View>
    </View>
  )
}