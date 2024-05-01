import React, { useState } from "react";
import { Todo, TypedColumn } from "./types";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { boardActions } from "@/reducer/boardReducer";
import Avatar from "react-avatar";

interface TodoProps {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard: React.FC<TodoProps> = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(boardActions.taskEdit({ taskIndex: index, todo, id }));
    dispatch(
      boardActions.setNewTask({
        newTaskInput: todo.title,
        newTaskDescription: todo.description,
      })
    );
    dispatch(boardActions.setNewTaskType(todo.status));
    dispatch(boardActions.toggleModal());
  };

  const handleDelete = (taskIndex: number, todo: Todo, id: TypedColumn) => {
    dispatch(boardActions.deleteTask({ taskIndex, todo, id }));
  };

  const colors = ["#ffbe0b", "#0055D1", "#76c893", "#415a77", "#a41623"];
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) + 1;
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getRandomLetters = () => {
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    return `${letter1} ${letter2}`;
  };

  const [avatarCount] = useState(getRandomInt(4));

  const avatars = [];
  for (let i = 0; i < avatarCount; i++) {
    avatars.push(
      <Avatar
        key={i}
        name={getRandomLetters()}
        round
        size="30"
        color={getRandomColor()}
        className="mt-2 ml-1"
      />
    );
  }

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md min-h-[150px] overflow-hidden"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div
        className="flex flex-col justify-center items-start"
        onClick={handleEdit}
        style={{ overflowWrap: "break-word" }}
      >
        <div className="font-medium text-gray-900 text-md font-medium p-5">
          <p>{todo?.title}</p>
        </div>
        <div className="font-medium text-gray-500 w-full text-sm font-normal p-5 pt-0">
          <p>{todo?.description}</p>
          <div className="flex justify-end">{avatars}</div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
