import React, { Component } from 'react'
import NavigationBar from '../../components/NavigationBar'

import '../../styles/styles.scss'

export default class App extends Component {
    render() {
        return (
            <div className='body-content'>
               <NavigationBar film={this.props.params.film}/>
               {this.props.children}
            </div>
        );
    }
}