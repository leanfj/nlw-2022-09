import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {width: 200, height: 300, backgroundColor: THEME.COLORS.SHAPE, borderRadius: 8, padding: 20, alignItems: 'center', marginRight: 16},
  button: {justifyContent: 'space-evenly', flexDirection: 'row',width: '100%',  alignItems: 'center', backgroundColor: THEME.COLORS.PRIMARY, borderRadius: 8, height: 50},
  textButton: {color: THEME.COLORS.CAPTION_300, fontSize: 16, fontFamily: THEME.FONT_FAMILY.BOLD},
});