import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Transaction from "../models/transaction";
import { addTransaction, getTransactions, clearTransactions } from "../models/transactionManager";

export const handleAddTransaction = async (transactionData) => {
    try {
        const newTransaction = new Transaction(
            uuidv4(),
            transactionData.category,
            transactionData.product,
            transactionData.quantity,
            transactionData.date,
            transactionData.validity
        );
        await addTransaction(newTransaction);
        return true;
    } catch (error) {
        console.error('Error handling transaction addition: ', error);
        return false;
    }
}

export const loadTransactions = async () => {
    try {
        const transactions = await getTransactions();
        return transactions.map(transaction => ({
            ...transaction,
            validity: transaction.validity ? new Date(transaction.validity) : null,
        }));
    } catch (error) {
        console.error('Error loading transactions: ', error);
        return [];
    }
}

export const handleClearTransactions = async () => {
    try {
        await clearTransactions();
        return true;
    } catch (error) {
        console.error('Error handling transaction clearing: ', error);
        return false;
    }
}

export const isNearExpiration = (transaction) => {
    if (!transaction.validity) {
        return false;
    }
    const today = new Date();
    const diffInDays = Math.ceil((transaction.validity - today) / (1000 * 60 * 60 * 24));
    return diffInDays <= 3;
}