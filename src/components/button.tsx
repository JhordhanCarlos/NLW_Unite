import { colors } from "@/styles/colors";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      style={{
        width: "100%",
        height: 56,
        backgroundColor: colors.orange[500],
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text className="text-green-500 text-base font-bold uppercase">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
