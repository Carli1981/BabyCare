import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "../src/services/authService";
import { auth } from "../src/config/firebase";
import { getBabyData } from "../src/services/babyService";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 👈 estado de carga

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await loginUser(email, password);

      const userId = auth.currentUser?.uid;
      if (!userId) {
        setError("No se pudo obtener el usuario.");
        setLoading(false);
        return;
      }

      const babyData = await getBabyData(userId);

      // Navegación condicional
      if (babyData) {
        router.replace("/home"); // ✅ Tiene datos → ir a Home
      } else {
        router.replace("/setup"); // ❌ No tiene datos → ir a Setup
      }
    } catch (e: any) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Iniciar sesión" onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
  link: { color: "#007bff", textAlign: "center", marginTop: 10 },
});