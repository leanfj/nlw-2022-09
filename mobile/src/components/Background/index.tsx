import React from 'react';
import { ImageBackground } from 'react-native';

import { styles } from './styles';

import imgBackGround from '../../assets/background-galaxy.png'

interface Props {
    children: React.ReactNode
}

export function Background({children}: Props) {
  return (
    <ImageBackground style={styles.container} source={imgBackGround} defaultSource={imgBackGround}> 
        {children}
    </ImageBackground>
  );
}