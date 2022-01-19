import React from "react";

interface Actions {
  showModal: (action: boolean, type: string) => void;
  Component: React.ReactNode;
}

const ModalWrapper = ({ Component, showModal }: Actions) => {
  return (
    <section onClick={() => showModal(false, "")} className="modal-wrapper">
      <div onClick={(e) => e.stopPropagation()} className="modal-backdrop">
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

export default ModalWrapper;
