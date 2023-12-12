import { Text as DefaultText, View as DefaultView } from 'react-native';

import {useThemeColor} from 'hooks';

type ExtraProps = {
  weight?: "black" | "bold" | "italic" | "light" | "semibold" | "medium" | "extrabold" | "regular"
}

export type TextProps = ExtraProps & DefaultText['props'];
export type ViewProps = DefaultView['props'];

export function Text(props: TextProps) {
  const { style, weight = "regular", ...otherProps } = props;
  const theme = useThemeColor();
  return <DefaultText style={[{ color: theme.text, fontFamily: `poppins_${weight}` }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const theme = useThemeColor();

  return <DefaultView style={[{ backgroundColor: theme.background }, style]} {...otherProps} />;
}
