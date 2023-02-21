type State = {
  ideas: [];
};

type Idea = {
  createdAt: number;
};

type AddIdeaAction = {
  type: "ADD_IDEA";
  newIdea: Idea;
};

type DeleteIdeaAction = {
  type: "DELETE_IDEA";
  createdAt: number;
};

type CopyFromLocalAction = {
  type: "COPY_IDEAS_FROM_LOCAL_STORAGE";
  payload: any;
};

type SortByDateAction = {
  type: "SORT_IDEAS_DATE";
};

type SortByTitleAction = {
  type: "SORT_IDEAS_TITLE";
};

type Action =
  | AddIdeaAction
  | DeleteIdeaAction
  | CopyFromLocalAction
  | SortByDateAction
  | SortByTitleAction;

export const initialState = { ideas: [] };

export const sortIdeas = (
  ideas: [],
  property: string | number,
  isDescending?: boolean
) => {
  if (!Array.isArray(ideas)) return [];

  return [...ideas].sort((a, b) => {
    if (a[property] > b[property]) return isDescending ? -1 : 1;
    if (a[property] < b[property]) return isDescending ? 1 : -1;

    return 0;
  });
};

export const addIdea = (ideas: [], newIdea: Idea) => {
  return [...ideas, newIdea];
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_IDEA":
      return { ideas: addIdea(state.ideas, action.newIdea) };

    case "DELETE_IDEA":
      return {
        ...state,
        ideas: state.ideas.filter(
          (idea: Idea) => idea.createdAt !== action.createdAt
        ),
      };

    case "COPY_IDEAS_FROM_LOCAL_STORAGE": {
      return {
        ...state,
        ideas: action.payload,
      };
    }

    case "SORT_IDEAS_DATE":
      return {
        ...state,
        ideas: sortIdeas(state.ideas, "createdAt"),
      };

    case "SORT_IDEAS_TITLE":
      return {
        ...state,
        ideas: sortIdeas(state.ideas, "title"),
      };
  }
}
