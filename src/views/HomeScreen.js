import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import {
	loadTransactions,
	handleClearTransactions,
	isNearExpiration,
} from "../controllers/transactionController";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }) => {
	const [products, setProducts] = useState([]);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const loadedTransactions = await loadTransactions();
			setTransactions(loadedTransactions);
			updateProductList(loadedTransactions);
		};

		const refresh = navigation.addListener("focus", fetchData);
		return refresh;
	}, [navigation]);

	const updateProductList = useCallback((transactions) => {
		const groupedProducts = transactions.reduce((acc, item) => {
			const productName = item.product.trim().toLowerCase();
			const category = item.category.trim().toLowerCase();
			const key = `${productName}_${category}`;

			if (acc[key]) {
				acc[key].quantity += Number(item.quantity);
			} else {
				acc[key] = {
					product: item.product,
					category: item.category,
					quantity: Number(item.quantity),
				};
			}
			return acc;
		}, {});

		setProducts(Object.values(groupedProducts));
	}, []);

	const nearExpirationProducts = useMemo(() => {
		return transactions.filter(isNearExpiration);
	}, [transactions]);

	const handleClear = async () => {
		const success = await handleClearTransactions();
		if (success) {
			setProducts([]);
			setTransactions([]);
		}
	};

	const formatProductName = (productName) => productName.trim();

	const formatCategory = (category) => {
		switch (category) {
			case "food":
				return "Alimento";
			case "cleaning":
				return "Limpeza";
			default:
				return (
					category.trim().charAt(0).toUpperCase() +
					category.trim().slice(1).toLowerCase()
				);
		}
	};

	const renderProductItem = ({ item }) => (
		<TouchableOpacity
			style={styles.listItem}
			onPress={() =>
				navigation.navigate("ProductDetails", {
					productName: item.product,
					category: item.category,
				})
			}
		>
			<Text style={styles.listText}>
				Produto: {formatProductName(item.product)} --- Categoria:{" "}
				{formatCategory(item.category)} --- Quantidade Total (kg, ml):{" "}
				{item.quantity}
			</Text>
		</TouchableOpacity>
	);

	const renderNearExpirationItem = ({ item }) => (
		<View style={styles.nearExpirationItem}>
			<Text>
				Produto: {formatProductName(item.product)} --- Categoria:{" "}
				{formatCategory(item.category)} --- Quantidade: {item.quantity}{" "}
				--- Validade: {item.validity.toLocaleDateString()}
			</Text>
		</View>
	);

	return (
		<View style={styles.homeContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Produtos</Text>
			</View>

			<FlatList
				data={products}
				keyExtractor={(item) => `${item.product}_${item.category}`}
				renderItem={renderProductItem}
				style={styles.flatList}
			/>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Produtos Vencendo</Text>
			</View>

			<FlatList
				data={nearExpirationProducts}
				keyExtractor={(item) => item.id}
				renderItem={renderNearExpirationItem}
				style={styles.flatList}
			/>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => navigation.navigate("AddProduct")}
				>
					<Text style={styles.addButtonText}>Adicionar Produto</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.clearButton}
					onPress={handleClear}
				>
					<Text style={styles.clearButtonText}>Limpar Produtos</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HomeScreen;
