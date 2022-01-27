import React from "react";
import { connect } from "react-redux";

interface Actions {
  showModal: (action: boolean, type: string) => void;
  Component: React.ReactNode;
  modalType: string;
}

const ModalWrapper = ({ Component, showModal, modalType }: Actions) => {
  return (
    <section onClick={() => showModal(false, "")} className={"modal-wrapper"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={"modal-backdrop " + `${modalType}_wrapper`}
      >
        {" "}
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal-box tracker-modal"
        >
          {Component}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any): { modalType: string } => ({
  modalType: state.layout.modalType,
});

export default connect(mapStateToProps, {})(ModalWrapper);
