import React, { useState, useReducer, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "usehooks-ts";
import reducer, { initialState } from "../state/reducer";
import CardModal from "../components/CardModal";
import Card from "../components/Card";
import Form from "../components/Form";
import Layout from "@/components/Layout";

type Idea = {
  title: string;
  description: string;
  deleteCard: () => void;
  createdAt: number;
  updatedAt: number;
};

type Inputs = {
  title: string;
  description: string;
};

export default function MainPage() {
  const [storedIdeas, setStoredIdeas] = useLocalStorage<any[]>("ideaList", []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const submitForm = (data: Inputs) => {
    // Add new idea both to state and local storage
    const newIdea = {
      title: data.title,
      description: data.description,
      createdAt: Date.now(),
    };
    dispatch({
      type: "ADD_IDEA",
      newIdea,
    });
    setStoredIdeas([...storedIdeas, newIdea]);
    setModalIsOpen(false);
    toast("Idea Created!");
  };

  //   Delete by exact time of creation from state and from local storage
  const handleDeleteCard = (timeOfCreation: number) => {
    dispatch({
      type: "DELETE_IDEA",
      createdAt: timeOfCreation,
    });
    setStoredIdeas(
      storedIdeas.filter((idea: Idea) => idea.createdAt !== timeOfCreation)
    );
    toast("Idea Deleted!");
  };

  // Sorting.
  const sortByDate = () => {
    dispatch({
      type: "SORT_IDEAS_DATE",
    });
  };
  const sortByTitle = () => {
    dispatch({
      type: "SORT_IDEAS_TITLE",
    });
  };

  //  Handle modal open and close

  const handleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  // On initial render copy ideas from local storage
  useEffect(() => {
    dispatch({
      type: "COPY_IDEAS_FROM_LOCAL_STORAGE",
      payload: storedIdeas,
    });
  }, [storedIdeas]);

  return (
    <Layout title="Idea board" description="Create new ideas">
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <CardModal
        title="Add new"
        modalIsOpen={modalIsOpen}
        closeModal={handleModal}
      >
        <Form submitForm={submitForm} />
      </CardModal>
      <header>
        <h1 className="text-center text-3xl font-bold">Idea Board</h1>
      </header>
      <div className="mt-5 text-center">
        <button
          className="my-2 rounded bg-slate-600 py-2 px-4 text-lg font-bold text-white shadow-lg duration-100 hover:bg-slate-500"
          onClick={handleModal}
        >
          +
        </button>
      </div>
      <div className="mb-5 flex justify-center gap-5">
        <button
          onClick={sortByDate}
          className="my-2 rounded bg-slate-500 py-2 px-4 text-lg font-bold text-white shadow-lg duration-100 hover:bg-slate-400"
        >
          Sort by date
        </button>
        <button
          onClick={sortByTitle}
          className="my-2 rounded bg-slate-500 py-2 px-4 text-lg font-bold text-white shadow-lg duration-100 hover:bg-slate-400"
        >
          Sort by title
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {state.ideas.map((card: Idea) => {
          return (
            <Card
              key={card.createdAt}
              title={card.title}
              description={card.description}
              deleteCard={() => handleDeleteCard(card.createdAt)}
              createdAt={card.createdAt}
              updatedAt={card.updatedAt}
            />
          );
        })}
      </div>
    </Layout>
  );
}
