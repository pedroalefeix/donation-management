import AsyncStorage from '@react-native-async-storage/async-storage';

const TRANSACTION_KEY = 'transactions';

export const addTransaction = async (transaction) => {
    try {
        const transactions = await getTransactions() || [];
        transactions.push(transaction);
        await AsyncStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error adding transaction: ', error);
    }
}

export const updateTransaction = async (transactions) => {
    try {
        await AsyncStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error updating transaction: ', error);
    }
}

export const getTransactions = async () => {
    try {
        const transactions = await AsyncStorage.getItem(TRANSACTION_KEY);
        return transactions ? JSON.parse(transactions) : [];
    } catch (error) {
        console.error('Error getting transactions: ', error);
        return [];
    }
}

export const clearTransactions = async () => {
    try {
        await AsyncStorage.removeItem(TRANSACTION_KEY);
    } catch (error) {
        console.error('Error clearing transactions: ', error);
    }
}