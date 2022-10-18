import { View, StyleSheet, Text } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

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

export default function NumberInputFieldComponent({label, value, onChangeText}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerField}>
        <Text style={styles.label}>
          {label}
        </Text>
        <TextInputMask
          style={styles.value}
          type={'only-numbers'}
          value={value}
          onChangeText={onChangeText}>
        </TextInputMask>
      </View>
    </View>
  )
}