import Transaction from "../models/transaction";
import { addTransaction, getTransactions, clearTransactions } from "../models/transactionManager";

export const handleAddTransaction = async (transactionData) => {
    try {
        const newTransaction = new Transaction(
            Date.now(),
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
        return transactions;
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