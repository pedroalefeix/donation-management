import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { loadTransactions, handleClearTransactions } from "../controllers/transactionController";

const HomeScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            const fetchData = async () => {
                const transactions = await loadTransactions();
                setTransactions(transactions);
            }

            fetchData();
        });

        return refresh;
    }, [navigation]);

    const handleClear = async () => {
        const success = await handleClearTransactions();
        if (success) {
            setTransactions([]);
        }
    }

    return (
        <View>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>
                            {item.product} - {item.quantity} - {item.validity}                            
                        </Text>
                    </View>
                )}
            />
            <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct')} />
            <Button title="Limpar Produtos" onPress={handleClear} />
        </View>
    );
}

export default HomeScreen;