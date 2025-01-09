import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../ThemeContext";

const Lab3 = () => {
    const { isDarkTheme } = useTheme();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useMemoEnabled, setUseMemoEnabled] = useState(true);
    const [timerEnabled, setTimerEnabled] = useState(true);
    const [fetchTime, setFetchTime] = useState(null);
    const [memoTime, setMemoTime] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const startTime = timerEnabled ? performance.now() : null; 

        try {
            const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
            setError(null);
            if(timerEnabled && startTime){
                const endTime = performance.now();
                setFetchTime(endTime - startTime); 
            }
        } catch (err) {
            setError(err);
            setData(null);
            setFetchTime(null);
        } finally {
            setLoading(false);
        }
    }, [timerEnabled]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const processedData = useMemo(() => {
        const startTime = timerEnabled ? performance.now() : null; 
        let result;
        if (!data || !useMemoEnabled) {
            let processed = data ? { updated: data?.time?.updated, rates: data?.bpi } : null;
            if(processed) {
                for(let i = 0; i < 10000; i++) {
                    let _ = Math.random();
                }
            }
            result = processed;
        } else {
            result = {
                updated: data.time?.updated,
                rates: data.bpi,
            };
        }
        if(timerEnabled && startTime){
            const endTime = performance.now();                
            setMemoTime(endTime - startTime);  
        }
        return result;
    }, [data, useMemoEnabled, timerEnabled]); 

    const toggleUseMemo = () => {
        setUseMemoEnabled(!useMemoEnabled);
    };
    const toggleTimer = () => {
        setTimerEnabled(!timerEnabled);
    };

    if (loading)
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    if (error)
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error?.message}</Text>
            </View>
        );

    if (!processedData) {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, { color: isDarkTheme ? "#fff" : "#000" }]}>
                    Lab 3
                </Text>
                <Text style={[
                    styles.subtitle,
                    { color: isDarkTheme ? "#ccc" : "#666" },
                ]}>
                    Loading data...
                </Text>
            </View>
        );
    }

    return (
        <View style={[
            styles.container,
            { backgroundColor: isDarkTheme ? "#333" : "#F5FCFF" },
        ]}>
            <Text style={[
                styles.subtitle,
                { color: isDarkTheme ? "#fff" : "#000" },
            ]}>
                Текущие цены на Биткоин
            </Text>
            <Text style={[
                styles.updatedText,
                { color: isDarkTheme ? "#fff" : "#000" },
            ]}>
                Последнее обновление: {processedData?.updated}
            </Text>
            {timerEnabled && (
                <Text style={[styles.timerText, { color: isDarkTheme ? "#fff" : "#000" }]}>
                    Время выборки: {fetchTime !== null ? `${fetchTime.toFixed(2)} ms` : 'Loading...'}
                </Text>
            )}
            {timerEnabled && (
                <Text style={[styles.timerText, { color: isDarkTheme ? "#fff" : "#000" }]}>
                    Время Memo (UseMemo {useMemoEnabled ? "вкл" : "выкл"}): {memoTime !== null ? `${memoTime.toFixed(2)} ms` : 'Loading...'}
                </Text>
            )}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkTheme ? '#555' : 'blue' }]} onPress={fetchData}>
                    <Text style={styles.buttonText}>Обновить</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkTheme ? '#555' : 'blue' }]} onPress={toggleUseMemo}>
                    <Text style={styles.buttonText}>
                        {useMemoEnabled ? "Выключить useMemo" : "Включить useMemo"}
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={Object.entries(processedData.rates)}
                keyExtractor={([currency]) => currency}
                renderItem={({ item }) => {
                    const [currency, info] = item;
                    return (
                        <View style={[
                            styles.rateContainer, {
                                backgroundColor: isDarkTheme ? "#555" : "white",
                            },
                        ]}>
                            <Text style={[
                                styles.rateText,
                                { color: isDarkTheme ? "#fff" : "#000" },
                            ]}>
                                {info.code}: {info.rate}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    updatedText: {
        fontSize: 16,
        marginBottom: 20,
    },
    rateContainer: {
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        alignSelf: "stretch",
    },
    rateText: {
        fontSize: 18,
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    timerText: {
        fontSize: 12,
    }
});

export default Lab3;
