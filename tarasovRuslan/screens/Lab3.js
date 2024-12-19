import React, { useState, useMemo, useEffect } from 'react';
import { Button, SafeAreaView, View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSortOrder } from '../store';

const Lab3 = () => {
    const dispatch = useDispatch();
    const sortOrder = useSelector((state) => state.app.sortOrder);
    const [items, setItems] = useState([
        'Яблоко',
        'Банан',
        'Апельсин',
        'Персик',
        'Ананас',
        'Клубника',
    ]);

    const [key, setKey] = useState(0);

    const sortedItems = useMemo(() => {
        console.log('Сортируем список...');
        return [...items].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });
    }, [sortOrder, items]);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [sortOrder]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }} key={key}>
            <View>
                <Text>Сортировка:</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Button title="По возрастанию" onPress={() => dispatch(setSortOrder('asc'))} />
                    <Button title="По убыванию" onPress={() => dispatch(setSortOrder('desc'))} />
                </View>
                <FlatList
                    data={sortedItems}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => <Text>{item}</Text>}
                />
            </View>
        </SafeAreaView>
    );
};

export default Lab3;
