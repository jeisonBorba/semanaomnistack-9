import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    if (spots.length === 0) {
        return null;
    }

    function handleNavigation(id) {
        navigation.navigate('Book',  { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews
                renderItem={({ item }) => (
                    
                    <View style={styles.listItem}>
                        {/* the image is not rendering on android */}
                        {/* <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} /> */}
                        <Image style={styles.thumbnail} source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>

                        <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20,
        marginEnd: 20
    },

    listItem: {
        marginRight: 15
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#F05A5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default withNavigation(SpotList);