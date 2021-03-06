import React from 'react';
import {
    View,
    Text
}from 'react-native';

import { Camera } from 'expo';
import * as Permissions from 'expo-permissions'

import styles from './styles';

export default class CameraPage extends React.Component{
    
    camera = null;

    state={
        hasCameraPermission: null,
    };

    async componentDidMount(){
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    render(){
        const { hasCameraPermission } = this.state;

        if(hasCameraPermission === null){
            return <View />;
        } else if (hasCameraPermission === false){
            return <Text>Acceso a la camara denegado</Text>;
        }

        return (
            <View>
                <Camera
                    style={styles.preview}
                    ref = {camera => this.camera = camera}
                />
            </View>
        );
    }
}