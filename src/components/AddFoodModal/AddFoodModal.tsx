import { Button, Icon, Input } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

import useFoodStorage from "../../hooks/useFoodStorage";

type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const { onSaveFood } = useFoodStorage();

  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({ calories, name, portion });
      onClose(true);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              onPress={() => onClose()}
              icon={<Icon name="close" size={28} />}
              type="clear"
            />
          </View>
          <View>
            <View style={styles.formItem}>
              <View style={styles.inputContainer}>
                <Input onChangeText={(text: string) => setCalories(text)} />
              </View>
              <View style={styles.legendContainer}>
                <Text style={styles.legend}>Calorías</Text>
              </View>
            </View>
            <View style={styles.formItem}>
              <View style={styles.inputContainer}>
                <Input onChangeText={(text: string) => setName(text)} />
              </View>
              <View style={styles.legendContainer}>
                <Text style={styles.legend}>Nombre</Text>
              </View>
            </View>
            <View style={styles.formItem}>
              <View style={styles.inputContainer}>
                <Input onChangeText={(text: string) => setPortion(text)} />
              </View>
              <View style={styles.legendContainer}>
                <Text style={styles.legend}>Porción</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleAddPress}
                title="Agregar"
                icon={<Icon name="add" color="#FFF" />}
                color="#4ECB71"
                radius="lg"
                disabled={
                  calories.trim() === "" ||
                  name.trim() === "" ||
                  portion.trim() === ""
                }
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
  },
  content: {
    width: "75%",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 25,
    //For IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 5,
    //For Android
    elevation: 10,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default AddFoodModal;