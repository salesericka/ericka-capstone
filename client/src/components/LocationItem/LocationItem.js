import React from 'react';
import './LocationItem.scss';
import axios from 'axios';
import plus from '../../assets/plus.svg';
import close from '../../assets/close.svg';
import check from '../../assets/check.svg';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip'

const API_URL = process.env.REACT_APP_API_URL;

Modal.setAppElement('#root')
class LocationItem extends React.Component {

  state={
    showModal:false,
    icon:plus
  }

  addToList=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    axios
      .post(`${API_URL}/userBucketList`, this.props)
      .then(response=>{
        this.setState({
          icon:check
        })
      })
  }

  handleModal=()=>{
    this.setState({
      showModal:!this.state.showModal
    })
  }

  render(){
    return (
      <div className="location__item" id={this.props.id} onClick={this.handleModal}>
        <h3 className="location__name">
            {this.props.name}
        </h3> 

        <img className="location__image" src={this.props.image} alt="image"/>


          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleModal}
            className="modal"
          >
            <section className="modal__container">
              <img className="modal__icon-close" 
                src={close} 
                onClick={this.handleModal}
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
                  alt="image" 
                />  
              </div>
              <p className="modal__description">
                {this.props.description}
              </p>
              
              <button className="modal__button-add" 
                onClick={this.addToList}
                data-tip="Add to list"
              >
                <img className="modal__icon-plus" 
                  src={this.state.icon} 
                  alt="plus icon" 
                />
              </button>
            </section>
            <ReactTooltip/>
          </Modal>
      </div>
    );
  }
}

export default LocationItem;
export {API_URL};