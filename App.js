import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, TouchableHighlight } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tableHead, setTableHead] = useState(['Food', 'Type', 'Actions']);
  const [tableData, setTableData] = useState([
    ['Idli', 'Breakfast', 'idli'],
    ['Palak Paneer', 'Dinner', 'palak-paneer'],
    ['Sambosa', 'Snack', 'sambosa'],
  ]);
  
 
  const _alertIndex = (id, action) => {
    // Alert.alert(`${action}ing ${id}`);
    
    if(action  === 'Delete'){
      Alert.alert(
        `Are you sure you want to delete ${id}`,
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {
            const data = tableData.filter(item => item[2] !== id);
            console.log("OK Pressed", data);
            setTableData(data)
          } }
        ],
        { cancelable: false }
      );
    }else {
      setModalVisible(true);
    }
  }
      const element = (data, index) => (
        <View style={styles.rowSpace}>
        <TouchableOpacity onPress={() => _alertIndex(data, "Edit")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _alertIndex(data, "Delete")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Delete</Text>
          </View>
        </TouchableOpacity>
        </View>
      );
    return (
      <>
      <View style={styles.container}>
         <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
            {
              tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
            <Text>Modal open</Text>
            <TouchableHighlight
              style={{ backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
          </View>
        </Modal>
      </View>
      </>
    );

  }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  rowSpace: { flexDirection: 'row', backgroundColor: '#fff' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2, marginRight: 8 },
  btnText: { textAlign: 'center', color: '#fff' },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});