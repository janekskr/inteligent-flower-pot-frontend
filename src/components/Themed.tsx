import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native';

import {Colors} from 'constant';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';

  if(colorName) return Colors[theme][colorName];
  else Colors[theme]
 
}

export function Text(props: TextProps) {
  const { ...otherProps } = props;
  const color = useThemeColor('text');

  return <DefaultText style={[{ color}, {fontFamily: "Poppins" }]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor('background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
