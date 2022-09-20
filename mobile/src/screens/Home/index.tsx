import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';


export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch(('http://192.168.15.126:3333/games')).then(response => response.json()).then(data => setGames(data));
  }, []);
  return (
    <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading title="Encontre seu Duo" subTitle="Selecione o game que deseja jogar..."/>
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
    </View>
  );
}