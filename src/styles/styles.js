import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({    
    // Estilos para a tela inicial (HomeScreen)
    homeContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    titleContainer: {
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    flatList: {
        flex: 1,
        marginBottom: 16,
    },
    listItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 8,
    },
    listText: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 16,
    },
    addButton: {
        marginTop: 16,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    clearButton: {
        marginTop: 8,
        backgroundColor: '#FF5733',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // Estilos para a tela de adicionar produto (AddProductScreen)
    addProductContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#333',
        width: 100,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 8,
        flex: 1,
    },
    picker: {
        flex: 1,
        height: 50,
        marginLeft: 8,
    },
    dateInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
    },

    // Estilos para a tela de detalhes do produto (ProductDetailsScreen)
    detailsContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    productDetailItem: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    productDetailText: {
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginTop: 5, // Add some margin
        alignSelf: 'flex-start' // Align to the start of the parent
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 12,
    },

    // Estilo para o seletor de data
    dateInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: '#f9f9f9',
    },
});

export default styles;
