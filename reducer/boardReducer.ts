import { Board, Column, Todo, TypedColumn } from "@/components/types";
import { getTodosGroupByColumn } from "@/lib/getTodosGroupByColumn";
import { createSlice, current } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

interface EditTask {
  current: {
    id: TypedColumn;
    taskIndex: number;
    todo: Todo;
  };
  previous: {
    id: TypedColumn;
    taskIndex: number;
    todo: Todo;
  };
}

export interface documentType {
  $id: string;
  image?: string | null;
  status: TypedColumn;
  title: string;
  description: string;
}

interface intialType {
  documents: documentType[];
  board: Board;
  searchString: string;
  isModalOpen: boolean;
  newTaskInput: string;
  newTaskDescription: string;
  newTaskType: TypedColumn;
  editTask: EditTask | null;
}

const initialState: intialType = {
  documents: [
    {
      $id: "shdg762vs26t3",
      image: null,
      status: "todo",
      title: "Implement dark mode feature",
      description:
        "Design UI elements for dark mode compatibility. Write CSS styles for dark theme support. Test and adjust contrast ratios for readability",
    },
    {
      $id: "35687gyh78",
      image: null,
      status: "todo",
      title: "Enhance user profile settings",
      description:
        "Redesign profile page layout for improved usability. Add new settings options for customization. Validate input fields and provide error feedback.",
    },
    {
      $id: "shdg762vs26t4",
      image: null,
      status: "inprogress",
      title: "Optimize page load performance",
      description:
        "Analyze current performance metrics using Lighthouse. Minify and compress CSS and JavaScript files. Implement lazy loading for images and resources.",
    },
    {
      $id: "shdg762vs26t5",
      image: null,
      status: "inprogress",
      title: "Develop RESTful API endpoints",
      description:
        "Design API routes for user authentication and authorization. Implement token-based authentication using JWT. Write middleware for request validation and error handling.",
    },
    {
      $id: "hgt7934re87yu345",
      status: "inprogress",
      title: "Revamp user dashboard interface",
      description:
        "Redesign the user dashboard interface to improve user experience and accessibility. Implement intuitive navigation and organize information for better readability. Incorporate interactive elements for enhanced user engagement.",
    },
    {
      $id: "98bhukg57678bv",
      status: "done",
      title: "Implement local storage in UI",
      description:
        "Implement local storage in the user interface to ensure that user data is securely stored and remains accessible even after the page is refreshed. This feature will enhance user experience by preventing data loss and providing a seamless browsing experience.",
    },
    {
      $id: "8978y867f5g78",
      status: "done",
      title: "Design landing page layout",
      description:
        "Create wireframes for desktop and mobile views. Incorporate user-friendly navigation. Ensure responsive design for various screen sizes",
    },
  ],
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  isModalOpen: false,
  newTaskInput: "",
  newTaskDescription: "",
  newTaskType: "todo",
  editTask: null,
};

const { actions, reducer } = createSlice({
  name: "board",
  initialState,
  reducers: {
    addData: (draftState) => {
      const todoData = getTodosGroupByColumn(current(draftState.documents));

      draftState.board = todoData;
    },
    setBoardState: (draftState, action) => {
      draftState.board = action.payload;
      const objectData = Object.fromEntries(action.payload.columns);
      const stringData = JSON.stringify(objectData);
      localStorage.setItem("mapData", stringData);
    },
    updateDB: (draftState, action) => {
      const { todo, columnId } = action.payload;
      const prevData = JSON.parse(localStorage.getItem("documents") || "[]");
      const newData = prevData.map((data: Todo) => {
        if (data.$id === todo.$id) {
          return { ...data, status: columnId };
        }
        return data;
      });
      localStorage.setItem("documents", JSON.stringify(newData));

      const todoData = getTodosGroupByColumn(current(draftState.documents));

      draftState.board = todoData;
    },
    searchTask: (draftState, action) => {
      draftState.searchString = action.payload;
    },
    deleteTask: (
      draftState,
      action: { payload: { taskIndex: number; todo: Todo; id: TypedColumn } }
    ) => {
      const { taskIndex, todo, id } = action.payload;
      const newColumns = draftState.board.columns;
      newColumns.get(id)?.todos.splice(taskIndex, 1);
      draftState.board.columns = newColumns;

      const objectData = Object.fromEntries(newColumns);
      const stringData = JSON.stringify(objectData);
      localStorage.setItem("mapData", stringData);

      const todos = JSON.parse(localStorage.getItem("documents") || "[]");

      const indexToDelete = todos.findIndex(
        (todo: Todo) => todo.$id === todo.$id
      );

      if (indexToDelete !== -1) {
        todos.splice(indexToDelete, 1);
      }
      localStorage.setItem("documents", JSON.stringify(todos));

      draftState.editTask = null;
      draftState.isModalOpen = false;
    },
    toggleModal: (draftState) => {
      draftState.isModalOpen = !draftState.isModalOpen;
      if (!draftState.isModalOpen) draftState.editTask = null;
    },
    setNewTask: (draftState, action) => {
      draftState.newTaskInput = action.payload.newTaskInput;
      draftState.newTaskDescription = action.payload.newTaskDescription;
    },
    setNewTaskType: (draftState, action) => {
      draftState.newTaskType = action.payload;
    },
    addTask: (
      draftState,
      action: {
        payload: { todo: string; description: string; columnId: TypedColumn };
      }
    ) => {
      const { todo, description, columnId } = action.payload;
      draftState.newTaskInput = "";

      const newColumns = new Map(draftState.board.columns);
      const newTodo: Todo = {
        $id: nanoid(),
        title: todo,
        status: columnId,
        description: description,
      };
      const column = newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      draftState.board.columns = newColumns;

      const objectData = Object.fromEntries(newColumns);
      const stringData = JSON.stringify(objectData);
      localStorage.setItem("mapData", stringData);

      draftState.isModalOpen = false;
    },
    updateEditCurrentData: (
      draftState,
      action: { payload: { taskIndex: number; todo: Todo; id: TypedColumn } }
    ) => {
      const { taskIndex, todo, id } = action.payload;
      draftState.editTask = {
        current: {
          id: id,
          taskIndex: taskIndex,
          todo: todo,
        },
        previous: draftState.editTask
          ? draftState.editTask.previous
          : {
              id: "todo",
              taskIndex: -1,
              todo: {
                $id: "",
                image: "",
                status: "",
                title: "",
                description: "",
              },
            },
      };
    },
    taskEdit: (
      draftState,
      action: { payload: { taskIndex: number; todo: Todo; id: TypedColumn } }
    ) => {
      const { taskIndex, todo, id } = action.payload;
      if (!draftState.editTask) {
        draftState.editTask = {
          current: { id, taskIndex, todo },
          previous: { id, taskIndex, todo },
        };
      } else {
        draftState.editTask.current = { id, taskIndex, todo };
        const newColumns = draftState.board.columns;
        if (id === draftState.editTask.previous.id) {
          newColumns.get(id)?.todos.splice(taskIndex, 1, todo);
        } else {
          newColumns
            .get(draftState.editTask.previous.id)
            ?.todos.splice(taskIndex, 1);
          const newTodo: Todo = {
            $id: draftState.editTask.previous.todo.$id,
            title: todo.title,
            status: id,
            description: todo.description,
          };

          newColumns.get(id)?.todos.push(newTodo);
        }

        draftState.board.columns = newColumns;

        const objectData = Object.fromEntries(newColumns);
        const stringData = JSON.stringify(objectData);
        localStorage.setItem("mapData", stringData);
      }
    },
  },
});

const boardActions = {
  ...actions,
};

export { boardActions, reducer };
