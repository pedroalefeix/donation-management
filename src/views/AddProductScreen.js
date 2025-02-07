import React, { useState } from "react";
import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { handleAddTransaction } from "../controllers/transactionController";
import styles from "../styles/styles";

const AddProductScreen = ({ navigation }) => {
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [validity, setValidity] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddProductPress = async () => {
        if (!category || !product || !quantity || !validity) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        const formattedDate = validity.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
        const productData = { category, product, quantity, validity: formattedDate };
        const success = await handleAddTransaction(productData);
        if (success) {
            navigation.goBack();
        } else {
            console.error('Erro ao adicionar produto');
        }
    };

    return (
        <View style={styles.addProductContainer}>
            {/* Category */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Categoria</Text>
                <Picker style={styles.picker} selectedValue={category} onValueChange={setCategory}>
                    <Picker.Item label="Alimento" value="food" />
                    <Picker.Item label="Limpeza" value="cleaning" />
                </Picker>
            </View>

            {/* Product */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Produto</Text>
                <TextInput style={styles.input} placeholder="Produto" value={product} onChangeText={setProduct} />
            </View>

            {/* Quantity */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Quantidade</Text>
                <TextInput style={styles.input} placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            </View>

            {/* Validity */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Validade</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                    <Text>
                        {validity.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={validity}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setValidity(selectedDate);
                    }}
                />
            )}

            <Button style={styles.button} title='Adicionar Produto' onPress={handleAddProductPress} />
        </View>
    );
}

export default AddProductScreen;
