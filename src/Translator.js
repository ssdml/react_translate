import React, { Component } from 'react';
import YaTranslator from './YaTranslator.js';
import './Translator.css';

class Translator extends Component {
    constructor(props) {
        super(props);

        const apiKey = localStorage.getItem("apiKey")
        this.state = { text: "", translated: "", key: apiKey};

        this.yatranslator = new YaTranslator(apiKey);

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearText = this.clearText.bind(this);
        this.translateText = this.translateText.bind(this);
        this.handlerChangeApiKey = this.handlerChangeApiKey.bind(this);
    }

    handleTextInput(event) {
        this.setState({text: event.target.value})
    }

    handlerChangeApiKey(event) {
        this.yatranslator.setKey(event.target.value);
        localStorage.setItem("apiKey", event.target.value);
        this.setState({key: event.target.value});
    }

    clearText() {
        this.setState({ text: "" , translated: ""});
    }

    translateText() {
        const text = this.state.text;
        if (text === "") {
            this.setState({translated: ""});
            return;
        }

        let self = this;

        this.yatranslator.getPromise(text).then(
            function (response) {
                if (response && response.data && response.data.text) {
                    self.setState({ translated: response.data.text.shift() });
                }
                
            }
        );
    }

    render() {
        return (
            <div className="translator">
                <Title className="translator__title" />
                <ApiKeyInput type="text" changeHandler={this.handlerChangeApiKey} value={this.state.key} />
                <div className="translator__workarea">
                    <Textarea className="translator__textarea translator__half" value={this.state.text} changeHandler={this.handleTextInput} />
                    <Textarea className="translator__textarea translator__half" value={this.state.translated}/>
                </div>
                <div className="translator__buttonarea">
                    <Button className="translator__button" clickHandler={this.translateText} buttonValue="Перевести" />
                    <Button className="translator__button" clickHandler={this.clearText} buttonValue="Очистить" />
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}

function Title(props) {
    return <div className={props.className}>Перевести текст</div>
}

function Button(props) {
    return <button className={props.className + " button-1"} onClick={props.clickHandler}>{props.buttonValue}</button>
}

function Textarea(props) {
    return (
        <div className={props.className}>
            <textarea className="textarea-1" onChange={props.changeHandler} value={props.value}></textarea>    
        </div>
    );
}

function IconButton(props) {
    return <button className={props.className + " gearbutton"}></button>
}

function ApiKeyInput(props) {
    return (
        <div className="textfield-row">
            <label className="textfield-row__label">API ключ Яндекса:</label>
            <input
                placeholder="trnsl.1.1.<xxx>.<xxx>.<xxx>"
                className="textfield-row__input"
                type="text"
                onChange={props.changeHandler}
                value={props.value}
            />
        </div>
    );
}

export default Translator;