
import React, { Component, PropTypes } from 'react';

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            filmId: this.props.filmId,
            textIsEmpty: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            filmId: this.props.filmId
        });  
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({
            filmId: nextProps.filmId
        });  
    }

    handleSubmit(e) {
        e.preventDefault();

        let comment = {
            FilmId: this.state.filmId,
            Text: e.target.elements[1].value
        };
        
        this.props.addComment(comment);

        e.target.elements[1].value = '';
        this.setState({textIsEmpty: true});
    }

    onChange(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({ textIsEmpty: false });
        } else {
            this.setState({ textIsEmpty: true });
        }
    }


    render() {
        var textIsEmpty = this.state.textIsEmpty;

        return(
            <div className='row'>
                <form className='form' onSubmit={this.handleSubmit}>
                    <div className='col-md-2 form-group button'>
                        <input type='submit' className='btn btn-success-own' value='Отправить' disabled={textIsEmpty}/>
                    </div>
                    <div className='col-md-10'>
                        <div className='form-group text-center'>
                            <textarea className='form-control' cols='20' placeholder='Сообщение' rows='2' onChange={this.onChange.bind(this)}></textarea>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

CommentForm.propTypes = {
    user: PropTypes.string.isRequired,
    filmId: PropTypes.string,
    addComment: PropTypes.func.isRequired
};