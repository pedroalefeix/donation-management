import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { loadTransactions, handleClearTransactions } from "../controllers/transactionController";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            const fetchData = async () => {
                const transactions = await loadTransactions();

                const groupedProducts = transactions.reduce((acc, item) => {
                    const productName = item.product.trim().toLowerCase();
                    const category = item.category.trim().toLowerCase();

                    const key = `${productName}_${category}`;

                    if (acc[key]) {
                        acc[key].quantity += Number(item.quantity);
                    } else {
                        acc[key] = { product: item.product, category: item.category, quantity: Number(item.quantity) };
                    }
                    return acc;
                }, {});

                const productList = Object.values(groupedProducts);
                setProducts(productList);
            };

            fetchData();
        });

        return refresh;
    }, [navigation]);

    const handleClear = async () => {
        const success = await handleClearTransactions();
        if (success) {
            setProducts([]);
        }
    };

    const formatProductName = (productName) => {
        return productName.trim().charAt(0).toUpperCase() + productName.trim().slice(1).toLowerCase();
    };

    const formatCategory = (category) => {
        switch (category) {
            case 'food':
                return 'Alimento';
            case 'cleaning':
                return 'Limpeza';
            default:
                return category.trim().charAt(0).toUpperCase() + category.trim().slice(1).toLowerCase();
        }
    };

    return (
        <View style={styles.homeContainer}>
            <FlatList
                data={products}
                keyExtractor={(item) => `${item.product}_${item.category}`}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.listItem} 
                        onPress={() => navigation.navigate('ProductDetails', { productName: item.product, category: item.category })}
                    >
                        <Text style={styles.listText}>
                            Produto: {formatProductName(item.product)} --- Categoria: {formatCategory(item.category)} --- Quantidade Total: {item.quantity}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('AddProduct')}
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
    );
};

export default HomeScreen;
