import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TypedColumn, Todo } from "./types";
import AddIcon from "@mui/icons-material/Add";
import TodoCard from "./TodoCard";
import { useSelector } from "react-redux";
import { selectSearchString } from "@/reducer/selector";
import { useDispatch } from "react-redux";
import { boardActions } from "@/reducer/boardReducer";

interface ColumnProps {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}

const idToColumnText: { [key in TypedColumn]: string } = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column: React.FC<ColumnProps> = ({ id, todos, index }) => {
  const dispatch = useDispatch();
  const searchString = useSelector(selectSearchString);

  const handleClick = () => {
    dispatch(boardActions.setNewTaskType(id));
    dispatch(boardActions.toggleModal());
  };
  return (
    <Draggable key={id} draggableId={id?.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided1, snapshot) => (
              <div
                {...provided1.droppableProps}
                ref={provided1.innerRef}
                className={`p-2 rounded-md shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}{" "}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLocaleLowerCase()
                            .includes(searchString.toLocaleLowerCase())
                        ).length}
                  </span>
                </h2>

                <div
                  className="space-y-2  custom-scrollbar"
                  style={{ maxHeight: "350px", overflowY: "auto" }}
                >
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLocaleLowerCase()
                        .includes(searchString.toLocaleLowerCase())
                    ) {
                      return null;
                    }
                    return (
                      <Draggable
                        key={todo?.$id}
                        draggableId={todo?.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided1.placeholder}
                  <div className="flex items-end justify-start p-2">
                    <button
                      className="text-green-500 hover:text-green-600 flex items-center"
                      onClick={handleClick}
                    >
                      <AddIcon className="h-10 w-10" /> Add Task
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
