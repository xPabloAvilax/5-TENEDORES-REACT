import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/api";

export default function ChangePasswordForm(props) {
  const { setShowModal, toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValue());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    setErrors({});

    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatPassword
    ) {
      setErrors({
        password: !formData.password
          ? "Las contraseña no puedene estar vacias"
          : "",
        newPassword: !formData.newPassword
          ? "Las contraseña no puedene estar vacias"
          : "",
        repeatPassword: !formData.newPassword
          ? "Las contraseña no puedene estar vacias"
          : "",
      });
    } else if (formData.newPassword !== formData.repeatPassword) {
      setErrors({
        newPassword: "Las contraseñas no coinciden",
        repeatPassword: "Las contraseñas no coinciden",
      });
    } else if (size(formData.newPassword) < 6) {
      setErrors({
        newPassword: "La contraseña debe tener al menos 6 caracteres",
      });
    } else {
      setIsLoading(true);
      await reauthenticate(formData.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch(() => {
              setErrors({
                password: "Error al actualizar la contraseña",
              });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setErrors({
            password: "La contraseña no es correcta",
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.View}>
      <Input
        placeholder="Contraseña Actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Input
        placeholder="Contraseña Nueva"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir contraseña nueva"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "repeatPassword")}
        errorMessage={errors.repeatPassword}
      />

      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnColor}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

function defaultValue() {
  return {
    password: "",
    newPassword: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnColor: {
    backgroundColor: "#00a680",
  },
});
