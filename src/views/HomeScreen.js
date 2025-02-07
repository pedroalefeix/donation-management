import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { loadTransactions, handleClearTransactions } from "../controllers/transactionController";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            const fetchData = async () => {
                const transactions = await loadTransactions();

                const uniqueProducts = [...new Map(transactions.map(item => [item.product, item])).values()];
                setTransactions(uniqueProducts);
            };

            fetchData();
        });

        return refresh;
    }, [navigation]);

    const handleClear = async () => {
        const success = await handleClearTransactions();
        if (success) {
            setTransactions([]);
        }
    };

    return (
        <View style={styles.homeContainer}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.listItem} 
                        onPress={() => navigation.navigate('ProductDetails', { productName: item.product })}
                    >
                        <Text style={styles.listText}>Produto: {item.product}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button style={styles.homeButton} title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct')} />
            <Button style={styles.clearButton} title="Limpar Produtos" onPress={handleClear} />
        </View>
    );
};

export default HomeScreen;
