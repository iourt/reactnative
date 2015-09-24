/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    WebView,
    TouchableOpacity,
    TextInput,
} = React;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';

var reactnative = React.createClass({

    getInitialState: function () {
        return {
            url: 'http://m.163.com',
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    },

    inputText: '',

    handleTextInputChange: function(event) {
        this.inputText = event.nativeEvent.text;
    },

    render: function () {

        // var res = this.state.datas[0];

        return (
            <View style={[styles.container]}>
                <View style={[styles.addressBarRow]}>
                	<TouchableOpacity
                	    onPress={this.goBack}
                	    style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                	    <Text>{'<'}</Text>
                	</TouchableOpacity>
                	<TouchableOpacity
                	    onPress={this.goForward}
                	    style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                	    <Text>{'>'}</Text>
                	</TouchableOpacity>
          			<TextInput
            			ref={TEXT_INPUT_REF}
            			autoCapitalize="none"
            			defaultValue={this.state.url}
            			onSubmitEditing={this.onSubmitEditing}
            			onChange={this.handleTextInputChange}
            			clearButtonMode="while-editing"
            			style={styles.addressBarTextInput} />
          			<TouchableOpacity onPress={this.pressGoButton}>
            			<View style={styles.goButton}>
              				<Text>Go!</Text>
            			</View>
          			</TouchableOpacity>
        		</View>
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    url={this.state.url}
                    onNavigationStateChange={this.onNavigationStateChange}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit} />
            </View>
        );
    },

    goBack: function() {
        this.refs[WEBVIEW_REF].goBack();
    },

    goForward: function() {
        this.refs[WEBVIEW_REF].goForward();
    },

    reload: function() {
        this.refs[WEBVIEW_REF].reload();
    },

    renderView: function (res) {
        return (
            <View style={styles.container}>
                <Image source={{uri: res.Images[0].ImageUrl}} style={styles.image} />
                <View style={styles.rightContainer}>
                    <Text style={styles.text}>{res.Images[0].Description}</Text>
                </View>
            </View>
        );
    },

    onSubmitEditing: function(event) {
        this.pressGoButton();
    },

    pressGoButton: function() {
        var url = this.inputText.toLowerCase();
        
        if (url === this.state.url) {
            this.reload();
        } else {
            this.setState({
                url: url,
            });
        }
        // dismiss keyoard
        this.refs[TEXT_INPUT_REF].blur();
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HEADER,
        paddingTop: 20,
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
    },
    webView: {
        backgroundColor: BGWASH,
        height: 10,
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
    spinner: {
        width: 20,
        marginRight: 6,
    },
});

AppRegistry.registerComponent('reactnative', () => reactnative);
