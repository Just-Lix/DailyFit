import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  iconButton: {
    margin: 10,
    alignSelf: 'flex-end', // Aligns the button to the right
    justifyContent: 'center',
  },
  
  
  image: {
    width: 500,      
    height: 500,      
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
},

  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5e5e5e',
    borderRadius: 20,
  },
  typeButtonSelected: {
    backgroundColor: 'black',
  },
  typeButtonText: {
    color: 'white',
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: 'black',
  },
  checkboxLabel: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  saveButton: {
    width: '100%',
    padding: 15,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;
