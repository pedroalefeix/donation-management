import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { loadTransactions } from "../controllers/transactionController";
import { deleteTransaction } from "../models/transactionManager";
import styles from "../styles/styles";

const ProductDetailsScreen = ({ route, navigation }) => {
	const { productName, category } = route.params;
	const [productDetails, setProductDetails] = useState([]);

	useEffect(() => {
		const fetchProductDetails = async () => {
			const transactions = await loadTransactions();
			const filteredProducts = transactions.filter(
				(item) =>
					item.product === productName && item.category === category
			);
			setProductDetails(filteredProducts);
		};

		fetchProductDetails();
	}, [productName, category]);

	const handleDelete = useCallback(
		async (id) => {
			await deleteTransaction(id);
			setProductDetails((prevDetails) =>
				prevDetails.filter((item) => item.id !== id)
			);

			if (productDetails.length === 1) {
				navigation.navigate("Home");
			}
		},
		[navigation, productDetails]
	);

	const renderProductDetail = ({ item }) => (
		<View style={styles.productDetailItem}>
			<Text>Quantidade (kg, ml): {item.quantity}</Text>
			{item.category !== "cleaning" && (
				<Text>
					Validade:{" "}
					{item.validity ? formatDate(item.validity) : "N/A"}
				</Text>
			)}
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={() => handleDelete(item.id)}
			>
				<Text style={styles.deleteButtonText}>Excluir</Text>
			</TouchableOpacity>
		</View>
	);

	const formatDate = (date) => {
		return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{productName}</Text>
			<FlatList
				data={productDetails}
				keyExtractor={(item) => item.id.toString()} // Ensure id is a string
				renderItem={renderProductDetail}
			/>
		</View>
	);
};

export default ProductDetailsScreen;
