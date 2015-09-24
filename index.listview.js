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
} = React;

var REQUEST_URL = 'api/getHomeArticle';

var ajaxConfig = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
    },
    body: JSON.stringify({
        'PageIndex': 1,
        'PageSize': 10
    }),
};

var reactnative = React.createClass({

    getInitialState: function () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false
        };
    },

    componentDidMount: function () {
        this.fetchData();
    },

    fetchData: function () {
        fetch(REQUEST_URL, ajaxConfig)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.ArticleList),
                    loaded: true
                });
            })
            .done();
    },

    render: function () {

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        // var res = this.state.datas[0];

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderView}
                style={styles.listView} />
        );
    },

    renderLoadingView: function () {
        return (
            <View style={styles.container}>
                <Text>
                    Loading ...
                </Text>
            </View>
        );
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
});

var styles = StyleSheet.create({
  	container: {
  	  	flex: 1,
        flexDirection: 'row',
  	  	justifyContent: 'center',
  	  	alignItems: 'center',
  	  	backgroundColor: '#FFF',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#EEE',
        borderStyle: 'solid',
  	},
    ListView: {
        paddingTop: 20,
        backgroundColor: '#F00',
    },
  	instructions: {
  	  	textAlign: 'center',
  	  	color: '#333333',
  	  	marginBottom: 5,
  	},
    image: {
        // flex: 1,
        width: 100,
        height: 100,
        marginRight: 10
    },
    rightContainer: {
        flex: 1,
        // lineClamp: 3,
        // flexWrap: 'wrap',
        height: 100,
        // boxOrient: 'vertical',
        overflow: 'hidden',
    },
    text: {
        // lineHeight: 30,
    },
});

AppRegistry.registerComponent('reactnative', () => reactnative);
