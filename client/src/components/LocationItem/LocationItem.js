import React from 'react';
import './LocationItem.scss';
import axios from 'axios';
import close from '../../assets/close.svg';
import Modal from 'react-modal';
import firebase from 'firebase';
const API_URL = process.env.REACT_APP_API_URL;

Modal.setAppElement('#root')

const modalStyle={
  overlay:{zIndex:1000}
}
class LocationItem extends React.Component {

  state={
    showModal:false,
    addStatus:"Add to List",
    comment:{}
  }

  addToList=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    const userId = firebase.auth().currentUser.uid
    axios
      .post(`${API_URL}/userBucketList/user/${userId}`, this.props)
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
        <div className="location__overlay">
          Click for more details
        </div>
        <img className="location__image" src={this.props.image} alt="location"/>
        <h3 className="location__name">
            {this.props.name}
        </h3> 
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleModal}
            className="modal"
            id="scroll"
            style={modalStyle}
            overlayClassName = "overlay"
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
              <div className="modal__info-container">
                <div className="modal__image-wrapper">
                  <img className="modal__image" 
                    src={this.props.image} 
                    alt="location" 
                  />
                </div>
                <div className="modal__d-b-wrapper">
                  <p className="modal__description">
                    {this.props.description}
                  </p>
                  <button className="modal__button-add" 
                    onClick={this.addToList}
                  >
                    {this.state.addStatus}
                  </button>
                  <ul className="modal__comment-list">
                    <h3 className="modal__comment-label">
                        Comments
                    </h3>
                    <li className="modal__comment-item comment-item">
                    <div className="comment-item__user-wrapper">
                    </div>
                      <div className="comment-item__info-wrapper">
                        <h4 className="comment-item__user">
                          {this.state.comment.author}
                        </h4>
                        <p className="comment-item__comment">
                          {this.state.comment.quote}
                        </p>
                      </div>
                    </li>
                    {this.props.comments.map(input=>{
                      return <li className="modal__comment-item comment-item" 
                        key={input.id}
                        > 
                          <div className="comment-item__user-wrapper">
                            <img className="comment-item__user-photo" src={input.authorImg} alt="profile"/>
                          </div>
                          <div className="comment-item__info-wrapper">
                            <h4 className="comment-item__user">
                              {input.author}
                            </h4>
                            <p className="comment-item__comment">
                              {input.comment}
                            </p>
                          </div>
                        </li>
                    })}
                  </ul>
                </div>
              </div>
            </section>
          </Modal>
      </div>
    );
  }
}

export default LocationItem;
export {API_URL};