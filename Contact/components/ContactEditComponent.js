import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useState, useEffect } from 'react'

import TextInputFieldComponent from './TextInputFieldComponent'
import DateFieldComponent from './DateFieldComponent'
import NumberInputFieldComponent from './NumberInputFieldComponent'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  fieldContainer: {
    width: '100%',
    height: 50,
    marginVertical: 5
  },
  containerButtons: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    height: '100%',
    width: 100,
    backgroundColor: 'red',
    marginRight: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  saveButton: {
    height: '100%',
    width: 100,
    backgroundColor: '#3498DB',
    marginLeft: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  text: {
    color: 'white', 
    fontWeight: 'bold'
  }
})

function createGuid() {  
   function _p8(s) {  
      var p = (Math.random().toString(16)+"000000000").substr(2,8);  
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
   }  
   return _p8() + _p8(true) + _p8(true) + _p8();  
}

function toISODate(value) {
  const day = value.substring(0, 2)
  const month = value.substring(3, 5)
  const year = value.substring(6, 10)

  return `${year}-${month}-${day} UTC-3`
}

function isValidDate(value) {
  return !isNaN(Date.parse(value))
}

function onSave(setData, isEdit, {id, name, email, phone, company, birthday}, onComeBack) {
  setData(previousData => {
    const data = [...previousData]

    const edit = () => {
      const title = name[0].toUpperCase()
      let count = 0
      let index = -1
      while (count < data.length) {
        const object = data[count]
        if (object.title === title) {
          index = count
          break
        }
        count++
      }

      const object = data[index]

      count = 0
      index = -1

      while (count < object.data.length) {
        const item = object.data[count]
        if (item.id == id) {
          index = count
          break
        }
        count++
      }

      object.data[index].name = name
      object.data[index].email = email
      object.data[index].phone = phone
      object.data[index].company = company
      object.data[index].birthday = birthday
    }

    const save = () => {
      const title = name[0].toUpperCase()
      let count = 0
      let index = -1
      while (count < data.length) {
        const object = data[count]
        if (object.title === title) {
          index = count
          break
        }
        count++
      }

      const newContact = {
        id: createGuid(),
        name: name,
        birthday: birthday === '' ? birthday : new Date(toISODate(birthday)),
        phone: phone,
        email: email,
        company: company
      }

      if (index !== -1) {
        const object = data[index]
        object.data.push(newContact)
      }
      else {
        data.push({
          title: title,
          data: [newContact]
        })
      }
    }

    if (isEdit) {
      edit()
    }
    else {
      save()
    }
    return data
  })

  onComeBack()
}

export default function ContactEditComponent({contact, setData, onComeBack}) {
  const [name, setName] = useState(contact?.name ?? '')
  const [email, setEmail] = useState(contact?.email ?? '')
  const [birthday, setBirthday] = useState(contact?.birthday ?? '')
  const [phone, setPhone] = useState(contact?.phone ?? '')
  const [company, setCompany] = useState(contact?.company ?? '')

  const [canSave, setCanSave] = useState(true)

  useEffect(() => {
    if (name !== '' && (birthday === '' || (birthday.length === 10 && isValidDate(toISODate(birthday))))) {
      setCanSave(false)
    }
    else {
      setCanSave(true)
    }
  }, [name, birthday])

  const isEdit = () => {
    return contact !== null
  }

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInputFieldComponent 
          label={"Nama"} 
          value={name} 
          onChangeText={setName}/>
      </View>
      <View style={styles.fieldContainer}>
        <TextInputFieldComponent 
          label={"Email"} 
          value={email}
          onChangeText={setEmail}/>
      </View>
      <View style={styles.fieldContainer}>
        <DateFieldComponent 
          label={"Ulang Tahun"} 
          value={birthday} 
          onChangeText={setBirthday}/>
      </View>
      <View style={styles.fieldContainer}>
        <NumberInputFieldComponent 
          label={"Nomor"} 
          value={phone}
          onChangeText={setPhone}/>
      </View>
      <View style={styles.fieldContainer}>
        <TextInputFieldComponent 
          label={"Perusahaan"} 
          value={company}
          onChangeText={setCompany}/>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          onPress={() => onComeBack()}
          style={styles.cancelButton}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={canSave}
          style={styles.saveButton}
          onPress={() => {onSave(setData, isEdit(), {id: contact?.id, name, email, phone, company, birthday}, onComeBack)}}>
          <Text style={styles.text}>save</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}
