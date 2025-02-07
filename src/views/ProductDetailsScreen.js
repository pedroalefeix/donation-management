import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { loadTransactions } from "../controllers/transactionController";
import styles from "../styles/styles";

const ProductDetailsScreen = ({ route }) => {
    const { productName } = route.params;
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const transactions = await loadTransactions();

            const filteredProducts = transactions.filter(item => item.product === productName);
            setProductDetails(filteredProducts);
        };

        fetchProductDetails();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{productName}</Text>
            <FlatList
                data={productDetails}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productDetailItem}>
                        <Text>Quantidade: {item.quantity}</Text>
                        <Text>Validade: {item.validity}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ProductDetailsScreen;
