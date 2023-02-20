import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// For testing
// if (process.env.NODE_ENV !== "test") Modal.setAppElement("#app");

type CardModal = {
  title: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export default function CardModal({
  title,
  modalIsOpen,
  closeModal,
  children,
}: CardModal) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div>
            <h2 className="text-blue">{title}</h2>
            <button className="btn btn-secondary" onClick={closeModal}>
              X
            </button>
          </div>
          <div>{children}</div>
        </div>
      </Modal>
    </div>
  );
}
