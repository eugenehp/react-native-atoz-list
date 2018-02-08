import React, { Component } from 'react';
import { View, Text, PanResponder, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class LetterPicker extends Component {

    render() {
        const {letter} = this.props;

        return (
            <TouchableOpacity onPress={ () => this.props.onPress(letter)}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', ...this.props.textPickerStyle }}>
                    {letter}
                </Text>
            </TouchableOpacity>
        );///
    }
}

const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export default class AlphabetPicker extends Component {
    constructor(props, context) {
        super(props, context);
        if(props.alphabet){
            Alphabet = props.alphabet;
        }
        this.state = {
            alphabet: Alphabet,
          };
    }

    // componentWillMount() {
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: () => true,
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderGrant: (e, gestureState) => {
    //             this.props.onTouchStart && this.props.onTouchStart();

    //             this.tapTimeout = setTimeout(() => {
    //                 this._onTouchLetter(this._findTouchedLetter(gestureState.y0));
    //             }, 100);
    //         },
    //         onPanResponderMove: (evt, gestureState) => {
    //             clearTimeout(this.tapTimeout);
    //             this._onTouchLetter(this._findTouchedLetter(gestureState.moveY));
    //         },
    //         onPanResponderTerminate: this._onPanResponderEnd.bind(this),
    //         onPanResponderRelease: this._onPanResponderEnd.bind(this),
    //     });
    // }
    componentWillReceiveProps(nextProps) {
        if(this.props.alphabet !== nextProps.alphabet){
            this.setState({alphabet:nextProps.alphabet})
          }
      }

    _onTouchLetter(letter) {
        console.warn('_onTouchLetter', letter)
        letter && this.props.onTouchLetter && this.props.onTouchLetter(letter);
    }

    _onPanResponderEnd() {
        requestAnimationFrame(() => {
            this.props.onTouchEnd && this.props.onTouchEnd();
        });
    }

    _findTouchedLetter(y) {
        let top = y - (this.absContainerTop || 0);
        const {alphabet} = this.state

        if (top >= 1 && top <= this.containerHeight) {
            return alphabet[Math.round((top / this.containerHeight) * alphabet.length)]
        }
    }

    _onLayout(event) {
        this.refs.alphabetContainer.measure((x1, y1, width, height, px, py) => {
            this.absContainerTop = py;
            this.containerHeight = height;
        });
    }

    render() {
        const {alphabet} = this.state
        this._letters = textPickerStyle => (
            alphabet.map((letter) => (
                <LetterPicker
                    key={letter}
                    letter={letter}
                    textPickerStyle={textPickerStyle}
                    onPress={this._onTouchLetter.bind(this)}
                />
            ))
        );///

        return (
            <View
                ref='alphabetContainer'
                
                onLayout={this._onLayout.bind(this)}
                style={{ paddingHorizontal: 5, backgroundColor: '#fff', borderRadius: 1, justifyContent: 'center', ...this.props.alphabetPickerStyle }}>
                <View>
                    {this._letters(this.props.textPickerStyle)}
                </View>
            </View>
        );
    }

}
