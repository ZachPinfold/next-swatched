import React from "react";

interface Actions {
  showModal: (action: boolean) => void;
  Component: React.ReactNode;
}

const ModalWrapper = ({ Component, showModal }: Actions) => {
  return (
    <section className='modal-wrapper'>
      <div onClick={() => showModal(false)} className='modal-backdrop'>
        {" "}
        <div
          onClick={(e) => e.stopPropagation()}
          className='modal-box tracker-modal'
        >
          {Component}
        </div>
      </div>
    </section>
  );
};

export default ModalWrapper;
