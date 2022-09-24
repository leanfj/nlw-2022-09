import React, { useState } from 'react';
import { Modal, View, ModalProps, Text, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';

import { THEME } from '../../theme';
import { Heading } from '../Heading';

import { styles } from './styles';

interface Props extends ModalProps {
  discord: string,
  onClose: () => void
}



export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleDiscord() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Copiado com sucesso!', `Copiamos o seu Discord: ${discord} para a área de transferência!`, [
      {
        text: 'Abrir Discord',
        onPress: async () => {
          try {
            await Linking.openURL(`discord://`)
          } catch (error) {
            Alert.alert('Não foi possível abrir o Discord', 'Verifique se o aplicativo está instalado em seu dispositivo.');
          }
        }
      }
    ]);
    setIsCopping(false)
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType='slide'>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>
          <MaterialIcons name="check-circle-outline" size={70} color="#50C878" />
          <Heading title="Let's Play" subTitle='Agora á sua hora de jogar' style={styles.heading} />
          <Text style={styles.discordCall}>
            Adicione no Discord
          </Text>
          <TouchableOpacity style={styles.discord} onPress={handleDiscord} disabled={isCopping}>
            <Text style={styles.discordText}>
              {isCopping ? <ActivityIndicator /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}