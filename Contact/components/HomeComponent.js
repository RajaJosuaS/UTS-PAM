import { View, StyleSheet, SectionList, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native'

import ItemContactComponent from './ItemContactComponent'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  containerList: {
    flex: 9,
    padding: 10,
    backgroundColor: 'white'
  },
  containerAddButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  title: {
    color: '#3498DB'
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonImage: {
    width: 20,
    resizeMode: 'contain',
    marginRight: 5
  },
  addButtonText: {
    color: '#3498DB',
    fontSize: 16,
    marginLeft: 5
  }
})

function sortData(data) {
  data.sort((a, b) => a.title.localeCompare(b.title))

  for (items of data) {
    items.data.sort((a, b) => a.name.localeCompare(b.name))
  }

  return data
}

function onDelete(setData, item) {
  setData(previousData => {
    const data = [...previousData]

    const title = item.name[0].toUpperCase()
    let count = 0
    let indexObject = -1
    while (count < data.length) {
      const object = data[count]
      if (object.title === title) {
        indexObject = count
        break
      }
      count++
    }

    const object = data[indexObject]

    count = 0
    let index = -1

    while (count < object.data.length) {
      const itemToDelete = object.data[count]
      if (itemToDelete.id == item.id) {
        index = count
        break
      }
      count++
    }
    object.data.splice(index, 1)

    if (object.data.length === 0) {
      data.splice(indexObject, 1)
    }

    return data
  })
}

function renderItem(item, onEditContact, setData) {
  if (item.birthday instanceof Date) {
    item.birthday = item.birthday.toLocaleDateString('pt-BR')
  }
  
  return (
    <ItemContactComponent item={item} edit={onEditContact} _delete={() => onDelete(setData, item)}/>
  )
}

function renderSectionHeader({ section: { title } }) {
  return (
    <Text style={styles.title}>{title}</Text>
  )
}

export default function HomeComponent({onAddContact, onEditContact, data, setData}) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerAddButton}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => onAddContact()}>
          <Image
            style={styles.addButtonImage}
            source={require('../assets/add-user-32.png')}>
          </Image>
          <Text style={styles.addButtonText}>
            Buat Kontak baru
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        <SectionList
          style={styles.containerList}
          sections={sortData(data)}
          keyExtractor={(item) => item.id}
          extraData={data}
          renderItem={({item}) => renderItem(item, onEditContact, setData)}
          renderSectionHeader={renderSectionHeader}>
      </SectionList>
      </View>
    </SafeAreaView>
  )
}