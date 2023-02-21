import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    maxWidth: "90vw",
  },
};

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
          <div className="text-end">
            <button
              className="rounded bg-red-400 px-2 duration-100 hover:bg-red-300"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-center text-lg font-semibold">{title}</h2>
          </div>
          <div>{children}</div>
        </div>
      </Modal>
    </div>
  );
}
