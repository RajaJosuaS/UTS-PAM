import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

import TextFieldComponent from './TextFieldComponent'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 2,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#3498DB',
    padding: 5,
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  imageButton: {
    width: 15,
    resizeMode: 'contain', marginRight: 2.5
  },
  textButton: {
    fontSize: 14,
    marginLeft: 2.5
  },
  containerEditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  containerDeleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  containerNameAndBirthday: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  containerEmail: {
    flex: 1,
    padding: 5
  },
  containerName: {
    flex: 2,
    marginRight: 2.5
  },
  containerBirthday: {
    flex: 1,
    marginLeft: 2.5
  }
})

export default function ItemContactComponent({item, edit, _delete}) {
  return (
    <View style = {styles.container}>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          onPress={() => {
            edit(item)
          }} 
          style={styles.containerEditButton}>
          <Image 
            style={styles.imageButton}
            source={require('../assets/edit-30.png')}>
          </Image>
          <Text style={styles.textButton, {color: '#3498DB'}}>
            Edit Kontak
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            _delete(item)
          }} 
          style={styles.containerDeleteButton}>
          <Image 
            style={styles.imageButton}
            source={require('../assets/delete-30.png')}>
          </Image>
          <Text style={styles.textButton, {color: '#E74C3C'}}>
            Hapus Kontak
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerNameAndBirthday}>
        <View style={styles.containerName}>
          <TextFieldComponent label={"Nama"} value={item.name}/>
        </View>
        <View style={styles.containerBirthday}>
          <TextFieldComponent label={"Ulang Tahun"} value={item.birthday}/>
        </View>
      </View>
      <View style={styles.containerEmail}>
        <TextFieldComponent label={"E-mail"} value={item.email}/>
      </View>
    </View>
  )
}