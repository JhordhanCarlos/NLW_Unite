import { colors } from "@/styles/colors";
import QRCode from "react-native-qrcode-svg";

type Props = {
  value: string;
  size: number;
};
export function QRCodeSVG({ value, size }: Props) {
  return (
    <QRCode
      value={value}
      size={size}
      color={colors.white}
      backgroundColor="transparent"
    />
  );
}
