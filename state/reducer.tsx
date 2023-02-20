type SortIdeas = {
  ideas: [];
  property: string | number;
  isDescending?: boolean;
};
type State = {
  ideas: [];
};
type Idea = {
  createdAt: number;
};
type Action = {
  type: string;
  newIdea: React.ReactNode;
  createdAt: number;
  payload: React.ReactNode;
};

export const initialState = { ideas: [] };

export const sortIdeas = ({ ideas, property, isDescending }: SortIdeas) => {
  if (!Array.isArray(ideas)) return [];

  return [...ideas].sort((a, b) => {
    if (a[property] > b[property]) return isDescending ? -1 : 1;
    if (a[property] < b[property]) return isDescending ? 1 : -1;

    return 0;
  });
};

export const addIdea = (ideas: [], newIdea: React.ReactNode) => {
  return [...ideas, newIdea];
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add":
      return { ideas: addIdea(state.ideas, action.newIdea) };

    case "delete":
      return {
        ...state,
        ideas: state.ideas.filter(
          (idea: Idea) => idea.createdAt !== action.createdAt
        ),
      };

    case "copyFromLocal": {
      return {
        ...state,
        ideas: action.payload,
      };
    }

    case "sortByDate":
      return {
        ...state,
        ideas: sortIdeas(state.ideas, "createdAt"),
      };

    case "sortByTitle":
      return {
        ...state,
        ideas: sortIdeas(state.ideas, "title"),
      };
  }
}
