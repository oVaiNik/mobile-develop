import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen() {
	const [backgroundColor, setBackgroundColor] = useState('white');

	const changeBackgroundColor = () => {
		const newColor = getRandomColor();
		setBackgroundColor(newColor);
	};

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={styles.text}>Нажмите кнопку для смены цвета фона</Text>
			<TouchableOpacity style={styles.button} onPress={changeBackgroundColor}>
				<Text style={styles.buttonText}>Сменить цвет</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#007BFF',
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
});
