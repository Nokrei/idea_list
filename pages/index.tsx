import React, { useState, useReducer, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "../utils/useLocalStorage";
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
  const [storedIdeas, setStoredIdeas] = useLocalStorage("ideaList", []);

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
      type: "add",
      newIdea,
    });
    setStoredIdeas([...storedIdeas, newIdea]);
    setModalIsOpen(false);
  };

  //   Delete by exact time of creation from state and from local storage
  const handleDeleteCard = (timeOfCreation: number) => {
    dispatch({
      type: "delete",
      createdAt: timeOfCreation,
    });
    setStoredIdeas(
      storedIdeas.filter((idea: Idea) => idea.createdAt !== timeOfCreation)
    );
  };

  // Sorting.
  const sortByDate = () => {
    dispatch({
      type: "sortByDate",
    });
  };
  const sortByTitle = () => {
    dispatch({
      type: "sortByTitle",
    });
  };

  //  Handle modal open and close

  const handleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  // On initial render copy ideas from local storage
  useEffect(() => {
    dispatch({
      type: "copyFromLocal",
      payload: storedIdeas,
    });
  }, []);

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
        <h1 className="text-blue">Idea Board</h1>
      </header>
      <div>
        <button className="btn btn-primary" onClick={handleModal}>
          +
        </button>
      </div>
      <div>
        <button onClick={sortByDate} className="btn btn-primary">
          Sort by date
        </button>
        <button onClick={sortByTitle} className="btn btn-primary">
          Sort by title
        </button>
      </div>
      <div>
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

// To do:
// caryying
// local storage
//
