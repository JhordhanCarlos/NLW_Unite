import { useState } from "react";
import { Input } from "@/components/input";
import { View, Image, Alert } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { api } from "@/server/api";
import axios from "axios";
import { useBadgeStore } from "@/store/badge-store";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    try {
      if (!name.trim()) {
        return Alert.alert("Ingresso", "Informe o nome completo!");
      }

      if (!email.trim()) {
        return Alert.alert("Ingresso", "Informe o seu email!");
      }

      setIsLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(
          `/attendees/${registerResponse.data.attendeeId}/badge`
        );
        badgeStore.save(badgeResponse.data.badge);

        const route = "/ticket";
        Alert.alert("Ingresso", "Inscrição feita com sucesso!", [
          {
            text: "OK",
            onPress: () => router.push(route as any),
          },
        ]);
      }
    } catch (err) {
      console.log(err);

      if (axios.isAxiosError(err)) {
        if (String(err.response?.data.message).includes("already registered")) {
          return Alert.alert("Inscrição", "Esse usuário já está cadastrado!");
        }
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Nome completo"
            keyboardType="email-address"
            onChangeText={setName}
          />
        </Input>

        <Input>
          <FontAwesome6 name="at" size={20} color={colors.green[200]} />
          <Input.Field placeholder="E-mail" onChangeText={setEmail} />
        </Input>
        <Button
          title="Realizar inscrição"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />

        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
