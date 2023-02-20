import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import useLocalStorage from "../utils/useLocalStorage";
import CardModal from "../components/CardModal";
import Form from "../components/Form";

type Card = {
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  deleteCard: () => void;
};

type Idea = {
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
};

export default function Card({
  title,
  description,
  createdAt,
  deleteCard,
  updatedAt,
}: Card) {
  const [storedIdeas, setStoredIdeas] = useLocalStorage("ideaList", []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUpdatedAt, setNewUpdatedAt] = useState<null | number>(null);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const submitForm = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    setNewTitle(title);
    setNewDescription(description);
    setNewUpdatedAt(Date.now());
    setModalIsOpen(false);
    toast("Idea Updated!");

    // Update idea in local storage and save
    const newLocalState = storedIdeas.map((idea: Idea) => {
      if (idea.createdAt === createdAt) {
        return {
          ...idea,
          title,
          description,
          updatedAt: Date.now(),
        };
      }
      return idea;
    });
    setStoredIdeas(newLocalState);
  };

  return (
    <div>
      <CardModal
        title="Edit idea"
        modalIsOpen={modalIsOpen}
        closeModal={handleModalClose}
      >
        <Form submitForm={submitForm} />
      </CardModal>
      <h2>{newTitle || title}</h2>
      <div>
        <p>Created on: {new Date(createdAt).toLocaleString("en-GB")}</p>
        {updatedAt ? (
          <p>Updated on: {new Date(updatedAt).toLocaleString("en-GB")}</p>
        ) : (
          newUpdatedAt && (
            <p>Updated on: {new Date(newUpdatedAt).toLocaleString("en-GB")}</p>
          )
        )}
      </div>
      <div>
        <div>
          <p>{newDescription || description}</p>
          <div onClick={handleModalOpen}>
            <FaEdit />
          </div>
        </div>
      </div>

      <div>
        <button className={"btn btn-secondary"} onClick={deleteCard}>
          Delete
        </button>
      </div>
    </div>
  );
}
