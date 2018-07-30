import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableHighlight,
    TextInput,
    StyleSheet,
} from 'react-native';
import {formatDateTime} from './api';
import DateTimePicker from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    fieldContainer: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    text: {
        height: 40,
        margin: 0,
        marginRight: 7,
        paddingLeft: 10,
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#0066cc',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    borderTop: {
        borderColor: '#eff5fb',
        borderTopWidth: 0,
    }
});

class EventForm extends Component{

    state = {
        title: null,
        date: '',
    }

    handleAddPress = () => {
       this.props.navigation.navigate('list');
    }

    handleChangeTitle = (title) => {
        this.setState({title: title});
    }

    handleDatePress = () => {
        this.setState({showDatePicker: true})
    }

    handleDatePicked = (date) => {
        this.setState({
            date,
        });

        this.handleDatePickerHide();
    }

    handleDatePickerHide = () => {
        this.setState({showDatePicker: false});
    }


    render(){
        return(
            <View
                style={{
                    flex: 1
                }}
            >
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.text}
                        placeholder="Put your event here"
                        spellCheck={false}
                        onChangeText={this.handleChangeTitle}
                        value={this.state.title}
                    />
                    <TextInput
                        style={[styles.text , styles.borderTop]}
                        placeholder="Event date"
                        spellCheck={false}
                        value={formatDateTime(this.state.date.toString())}
                        editable={! this.state.showDatePicker}
                        onFocus={this.handleDatePress}
                    />
                    <DateTimePicker
                        isVisible={this.state.showDatePicker}
                        mode="datetime"
                        onConfirm={this.handleDatePicked}
                    />
                </View>
                <View>
                    <TouchableHighlight
                        onPress ={this.handleAddPress}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>ADD</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default EventForm;