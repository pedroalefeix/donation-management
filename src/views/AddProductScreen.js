import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { handleAddTransaction } from "../controllers/transactionController";
import styles from "../styles/styles";

const AddProductScreen = ({ navigation }) => {
	const [category, setCategory] = useState("food");
	const [product, setProduct] = useState("");
	const [quantity, setQuantity] = useState("");
	const [validity, setValidity] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	useEffect(() => {
		const defaultValidity = new Date();
		defaultValidity.setDate(defaultValidity.getDate() + 7);
		setValidity(defaultValidity);
	}, []);

	const validateInputs = useCallback(() => {
		if (!product || !quantity) {
			Alert.alert("Erro", "Preencha todos os campos.");
			return false;
		}

		if (category !== "cleaning") {
			const currentDate = new Date();
			currentDate.setHours(0, 0, 0, 0);
			const minValidDate = new Date(currentDate);
			minValidDate.setDate(currentDate.getDate() + 7);
			minValidDate.setHours(0, 0, 0, 0);

			const selectedDate = new Date(validity);
			selectedDate.setHours(0, 0, 0, 0);

			if (selectedDate < minValidDate) {
				Alert.alert(
					"Erro",
					"Prazo de validade inválido! Mínimo de 7 dias necessário."
				);
				return false;
			}
		}
		return true;
	}, [product, quantity, category, validity]);

	const handleAddProductPress = async () => {
		if (!validateInputs()) return;

		const formattedDate =
			category === "cleaning"
				? null
				: validity.toISOString().split("T")[0];
		const productData = {
			category,
			product,
			quantity,
			validity: formattedDate,
		};
		const success = await handleAddTransaction(productData);

		if (success) {
			navigation.goBack();
		} else {
			console.error("Erro ao adicionar produto.");
		}
	};

	return (
		<View style={styles.addProductContainer}>
			{/* Category */}
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Categoria</Text>
				<Picker
					style={styles.picker}
					selectedValue={category}
					onValueChange={setCategory}
				>
					<Picker.Item label="Alimento" value="food" />
					<Picker.Item label="Limpeza" value="cleaning" />
				</Picker>
			</View>

			{/* Product */}
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Produto</Text>
				<TextInput
					style={styles.input}
					placeholder="Produto"
					value={product}
					onChangeText={setProduct}
				/>
			</View>

			{/* Quantity */}
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Quantidade (kg, ml)</Text>
				<TextInput
					style={styles.input}
					placeholder="Quantidade"
					value={quantity}
					onChangeText={setQuantity}
					keyboardType="numeric"
				/>
			</View>

			{/* Conditionally render Validity input */}
			{category !== "cleaning" && (
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Validade</Text>
					<TouchableOpacity
						onPress={() => setShowDatePicker(true)}
						style={styles.dateInput}
					>
						<Text>{validity.toLocaleDateString()}</Text>
					</TouchableOpacity>
				</View>
			)}

			{/* Date Picker */}
			{showDatePicker && category !== "cleaning" && (
				<DateTimePicker
					value={validity}
					mode="date"
					display="default"
					onChange={(event, selectedDate) => {
						setShowDatePicker(false);
						if (selectedDate) setValidity(selectedDate);
					}}
				/>
			)}

			<TouchableOpacity
				style={styles.addButton}
				onPress={handleAddProductPress}
			>
				<Text style={styles.addButtonText}>Adicionar Produto</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddProductScreen;
