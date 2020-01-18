import React from 'react';
import { WebView } from 'react-native-webview';
import {StyleSheet} from 'react-native';


function Profile({navigation}){
    const githubUsername = navigation.getParam('github_username');
    return <WebView style={styles.webview} source={{ uri: `https://github.com/${githubUsername}` }}/>
}

const styles = StyleSheet.create ({
    webview: {
        flex: 1,
    }
})


export default Profile;

