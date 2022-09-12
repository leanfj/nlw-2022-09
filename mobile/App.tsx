import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.tile}>Ola Mundo!</Text>
      <Button title='Botao'></Button>
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => Vibration.vibrate(10 * 1000)}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    color: '#fff',
    fontSize: 28,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#996DFF',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  }

});
