import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { handleAddTransaction } from "../controllers/transactionController";

const AddProductScreen = ({ navigation }) => {
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [validity, setValidity] = useState('');

    const handleAddProductPress = async () => {
        if (!category || !product || !quantity || !validity) {
            Alert.alert('Error', 'Fill in all fields');
            return;
        }

        const productData = { category, product, quantity, validity };
        const success = await handleAddTransaction(productData);
        if (success) {
            navigation.goBack();
        } else {
            console.error('Error adding product');
        }
    }

    return (
        <View>
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
            <TextInput placeholder="Product" value={product} onChangeText={setProduct} />
            <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            <TextInput placeholder="Validity" value={validity} onChangeText={setValidity} keyboardType="numeric" />
            <Button title='Adicionar Produto' onPress={handleAddProductPress} />
        </View>
    );
}

export default AddProductScreen;