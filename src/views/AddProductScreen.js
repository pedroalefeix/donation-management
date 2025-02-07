import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { handleAddTransaction } from "../controllers/transactionController";
import styles from "../styles/styles";

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
        <View style={styles.addProductContainer}>
            <Picker style={styles.picker} selectedValue={category} onValueChange={itemValue => setCategory(itemValue)}>
                <Picker.Item label="Alimento" value="food" />
                <Picker.Item label="Limpeza" value="cleaning" />
            </Picker>
            <TextInput placeholder="Produto" value={product} onChangeText={setProduct} />
            <TextInput placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            <TextInput placeholder="Validade" value={validity} onChangeText={setValidity} keyboardType="numeric" />
            <Button style={styles.button} title='Adicionar Produto' onPress={handleAddProductPress} />
        </View>
    );
}

export default AddProductScreen;