import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    colorBlock: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginBottom: 20,
    },
    weatherItem: {
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
    },
    weatherText: {
        fontSize: 16,
    },
});

export default styles;
