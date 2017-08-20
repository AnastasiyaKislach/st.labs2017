import React, { Component } from 'react';

//const filePath = '../../Images/';

export default class Film extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        console.log(this.props.params)
      return (
             <div className='container film-container'>
                <div className='row'>
                    <div className='film-poster col-md-4'>
                        <div className='film-poster'>
                            <img src='Images/figure@2x.jpg' className='img-responsive' />
                        </div>
                        <div className='film-rate'>
                            <a><i className='glyphicon glyphicon-star-empty'></i></a> 
                            <a><i className='glyphicon glyphicon-star-empty'></i></a> 
                            <a><i className='glyphicon glyphicon-star-empty'></i></a> 
                            <a><i className='glyphicon glyphicon-star-empty'></i></a>  
                            <a><i className='glyphicon glyphicon-star-empty'></i></a> 
                        </div>
                    </div>
                    <div className='film-title col-md-8'>
                        <h3>Maecenas etos sit amet</h3>
                        <p>
                            Maecenas etos sit amet, consectetur adipis cing elit. Terminal volutpat rutrum metro amet sollicitudin
                            interdum.Ante tellus gravida mollis tellus neque vitae elit. Mauris adipiscing mauris...
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='slider-box' id='slider'>
                        <div className='col-md-1'>
                            <a className='left-control'>
                                <span className='glyphicon glyphicon-chevron-left'></span>
                            </a>
                        </div>
                        <div className='col-md-2'>
                            <img src='Images/single-image@2x.jpg' className='img-responsive' />
                        </div>
                        <div className='col-md-2'>
                            <img src='Images/figure@2x.jpg' className='img-responsive' />
                        </div>
                        <div className='col-md-2'>
                            <img src='Images/slide-3@2x.jpg' className='img-responsive' />
                        </div>
                        <div className='col-md-2'>
                            <img src='Images/single-image@2x.jpg' className='img-responsive' />
                        </div>
                        <div className='col-md-2'>
                            <img src='Images/figure@2x.jpg' className='img-responsive' />
                        </div>
                        <div className='col-md-1'>
                            <a className='right-control'>
                                <span className='glyphicon glyphicon-chevron-right'></span>
                            </a>
                        </div>
                    </div>
                    <div className='clearfix'></div>
                </div>
                <div className='row comment-container'>
                    <div className='comment-item'>
                        <div className='col-md-2'>
                            <p>User name</p>
                            <p>20/10/2016 10:12</p>
                        </div>
                        <div className='col-md-10'>
                            Maecenas etos sit amet, consectetur adipis cing elit. Terminal volutpat rutrum metro amet sollicitudin
                            interdum.Ante tellus gravida mollis tellus neque vitae elit. Mauris adipiscing mauris...
                        </div>
                    </div>
                    <div className='comment-item'>
                        <div className='col-md-2'>
                            <p>User name</p>
                            <p>20/10/2016 10:12</p>
                        </div>
                        <div className='col-md-10'>
                            Maecenas etos sit amet, consectetur adipis cing elit. Terminal volutpat rutrum metro amet sollicitudin
                            interdum.Ante tellus gravida mollis tellus neque vitae elit. Mauris adipiscing mauris...
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <form className='form'>
                        <div className='col-md-2 form-group button'>
                            <input type='submit' className='btn btn-success-own' value='Отправить' />
                        </div>
                        <div className='col-md-10'>
                            <div className='form-group text-center'>
                                <textarea className='form-control' cols='20' data-val='true' data-val-length='Значение Автор должно содержать не менее 2 символов.' data-val-length-max='100' data-val-length-min='2' data-val-required='Требуется ввести значение поля' id='inputArea' name='Text' placeholder='Сообщение' rows='2'></textarea>
                                <span className='field-validation-valid text-danger' data-valmsg-for='Author' data-valmsg-replace='true'></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}