import React, { useEffect, useState } from 'react'

import { FlatList, Image, TouchableOpacity, View } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Entypo } from '@expo/vector-icons'

import { GameParams } from '../../@types/navigation'
import logoIgm from '../../assets/logo-nlw-esports.png'
import { THEME } from '../../theme'

import { Background } from '../../components/Background'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'
import { Heading } from '../../components/Heading'

import { styles } from './styles'
import { DuoMatch } from '../../components/DuoMatch'

export function Game() {
  const route = useRoute()

  const game = route.params as GameParams

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [discord, setDiscord] = useState('');

  useEffect(() => {
    fetch((`http://192.168.15.20:3333/games/${game.id}/ads`)).then(response => response.json()).then(data => setAds(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} >
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>
          <Image source={logoIgm} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image source={{ uri: game.bannerUrl }} style={styles.banner} resizeMode="cover" />
        <Heading title={game.title} subTitle='Encontre seu Duo' />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {
              fetch((`http://192.168.15.20:3333/ads/${item.id}/discord`)).then(response => response.json()).then(data => {
                setDiscord(data.discord)

              }).then(() => {
                setModalVisible(true)

              })

            }} />

          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <View>
              <Heading title='Nenhum Duo encontrado' subTitle='Tente novamente mais tarde' />
            </View>
          )}
        />

        <DuoMatch 
          visible={modalVisible}
          discord={discord}
          onClose={() => setModalVisible(!modalVisible)} />
      </SafeAreaView>
    </Background>
  )
}