import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onHideModal}></div>;
};

const ModalWindow = (props) => {
  return (
    <div className={`${styles.modal} ${props.style}`} style={props.modalStyle}>
      <div className={styles.content}>{props.children}</div> 
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalWindow style={props.style} modalStyle={props.modalStyle}>{props.children}</ModalWindow>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
