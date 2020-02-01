import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, Platform, AsyncStorage } from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import GlobalStyles from '../shared/GlobalStyles';
import logo from '../assets/logo.png';

export default function List() {
    const [ techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(user_id => {
                const socket = socketio('http://192.168.0.10:3333', {
                    query: { user_id }
                });

                socket.on('booking_response', booking => {
                    const message = `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`;
                    Alert.alert(message);
                });
            });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs')
            .then(storageTechs => {
                const techsArray = storageTechs.split(',').map(tech => tech.trim());

                setTechs(techsArray);
            });
    }, []);
    
    return (
        // use only available area on screen
        <SafeAreaView sytles={GlobalStyles.androidSafeArea}>
            <Image style={style.logo} source={logo}/>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: Platform.OS === 'android' ? 50 : 10
    }
});