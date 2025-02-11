import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { loadTransactions } from "../controllers/transactionController";
import { deleteTransaction } from "../models/transactionManager";
import styles from "../styles/styles";

const ProductDetailsScreen = ({ route }) => {
    const { productName, category: routeCategory } = route.params;
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const transactions = await loadTransactions();

            const filteredProducts = transactions.filter(item => item.product === productName && item.category === routeCategory);
            setProductDetails(filteredProducts);
        };

        fetchProductDetails();
    }, [productName, routeCategory]);

    const handleDelete = async (id) => {
        await deleteTransaction(id);

        const updatedTransactions = await loadTransactions();
        const filteredProducts = updatedTransactions.filter(item => item.product === productName);
        setProductDetails(filteredProducts);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{productName}</Text>
            <FlatList
                data={productDetails}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productDetailItem}>
                        <Text>Quantidade: {item.quantity}</Text>
                        {item.category !== 'cleaning' && (
                            <Text>Validade: {item.validity}</Text>
                        )}
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                            <Text style={styles.deleteButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default ProductDetailsScreen;
