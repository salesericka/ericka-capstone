import React from 'react';
import './LocationItem.scss';
import axios from 'axios';
import close from '../../assets/close.svg';
import Modal from 'react-modal';

const API_URL = process.env.REACT_APP_API_URL;

Modal.setAppElement('#root')
class LocationItem extends React.Component {

  state={
    showModal:false,
    addStatus:"Add to List",
    comment:{}
  }

  addToList=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    axios
      .post(`${API_URL}/userBucketList`, this.props)
      .then(response=>{
        this.setState({
          addStatus:"Added"
        })
      })
  }

  callComments=()=>{
    const commentURL="/v1/quotes"
    axios.get(`${API_URL}/proxy${commentURL}`)
    .then(response=>{
      console.log("COmments",response.data.quotes[0])
      this.setState({
        comment:response.data.quotes[0]
      })
    })
    .catch(err=>console.log(err))
  }

  handleModal=()=>{
    this.setState({
      showModal:!this.state.showModal
    })
  }
  componentDidMount=()=>{
    this.callComments();
  }
  render(){
    return (
      <div className="location__item" id={this.props.id} onClick={this.handleModal}>
        <h3 className="location__name">
            {this.props.name}
        </h3> 

        <img className="location__image" src={this.props.image} alt="location"/>


          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleModal}
            className="modal"
            id="scroll"
          >
            <section className="modal__container">
              <img className="modal__icon-close" 
                src={close} 
                onClick={this.handleModal}
                alt="icon close"
                data-tip="Close"
              />
              <h2 className="modal__name">
                {this.props.name}
                
              </h2>

              <p className="modal__info">
                {this.props.province}, {this.props.country}
              </p>

              <div className="modal__image-wrapper">
                <img className="modal__image" 
                  src={this.props.image} 
                  alt="location" 
                />  
              </div>
              <p className="modal__description">
                {this.props.description}
              </p>
              
              <button className="modal__button-add" 
                onClick={this.addToList}
              >
                {this.state.addStatus}
              </button>

              <ul className="modal__comment-list">
                <h1>{this.state.comment.author}</h1>
                <p>{this.state.comment.quote} </p>
                {/* {this.props.comments.map(comment=>{
                  return <CommentItem key={comment.id}
                    author={comment.author}
                    comment={comment.comment}
                    
                    />
                })} */}
              </ul>
            </section>
          </Modal>
      </div>
    );
  }
}

export default LocationItem;
export {API_URL};