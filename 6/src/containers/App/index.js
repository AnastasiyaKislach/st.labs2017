import React, { Component } from 'react'
import NavigationBar from '../../components/NavigationBar'

import '../../styles/styles.scss';

export default class App extends Component {
    render() {
        return (
            <div className='body-content'>
               <NavigationBar/>
               {this.props.children}
            </div>
        );
    }
}