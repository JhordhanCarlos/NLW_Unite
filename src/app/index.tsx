import { Input } from "@/components/input";
import { View, Image, Alert } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        Alert.alert("Ingresso", "Informe o código do ingresso!");
      }

      const { data } = await api.get(`/attendees/${code}/badge`);
      badgeStore.save(data.badge);

      setIsLoading(true);
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Ingresso",
        "O código do ingresso está inválido ou não exite!"
      );
      setIsLoading(false);
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />;
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar style="light" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3 ">
        <Input>
          <MaterialCommunityIcons
            name="ticket"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Código do Ingresso"
            onChangeText={setCode}
          />
        </Input>

        <Button
          title="Acessar Credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          {" "}
          Ainda não possui ingresso
        </Link>
      </View>
    </View>
  );
}
