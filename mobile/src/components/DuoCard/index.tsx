import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { DuoInfo } from '../DuoInfo';
import { Entypo } from '@expo/vector-icons'

import { styles } from './styles';
import { THEME } from '../../theme';

export interface DuoCardProps {
  hourEnd: string
  hourStart: string
  id: string
  name: string,
  useVoiceChannel: number,
  weekDays: string[]
  yearsPlaying: number,
}

interface Props {
  data: DuoCardProps
  onConnect: () => void
}

export function DuoCard({data, onConnect}: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label='Nome' value={data.name}/>
      <DuoInfo label='Tempo de Jogo' value={`${data.yearsPlaying} ano(s)`}/>
      <DuoInfo label='Disponbilidade' value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart} - ${data.hourEnd}`}/>
      <DuoInfo label='Chamada de áudio' value={data.useVoiceChannel ? 'sim' : 'não'} colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}/>
      <TouchableOpacity style={styles.button} onPress={onConnect}>
          <Entypo name='game-controller' color={THEME.COLORS.CAPTION_300} size={20} />
          <Text style={styles.textButton}> Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}