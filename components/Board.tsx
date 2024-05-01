"use client";

import { boardActions } from "@/reducer/boardReducer";
import { selectBordsData } from "@/reducer/selector";
import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Column from "./Column";
import { Todo, Column as columnType } from "./types";
import TransitionsModal from "./Modal";

const Board = () => {
  const dispatch = useDispatch();

  const board = useSelector(selectBordsData);

  useEffect(() => {
    dispatch(boardActions.addData());
  }, [dispatch]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === "column") {
      const entries = Array.from(board?.columns?.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const reArrangedColumns = new Map(entries);
      dispatch(
        boardActions.setBoardState({ ...board, columns: reArrangedColumns })
      );
    }

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: columnType = {
      id: startColIndex?.[0],
      todos: startColIndex?.[1].todos,
    };

    const finishCol: columnType = {
      id: finishColIndex?.[0],
      todos: finishColIndex?.[1].todos,
    };

    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;

    if (Array.isArray(startCol.todos)) {
      const newTodos = [...startCol.todos];

      const [todoMoved] = newTodos.splice(source.index, 1);

      if (startCol.id === finishCol.id) {
        newTodos.splice(destination.index, 0, todoMoved);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };

        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        dispatch(boardActions.setBoardState({ ...board, columns: newColumns }));
      } else {
        const todoMovedModifiedStatus: Todo = {
          ...todoMoved,
          status: finishColIndex[0],
        };
        const finishTodos = Array.from(finishCol.todos);
        finishTodos.splice(destination.index, 0, todoMovedModifiedStatus);

        const newColumns = new Map(board.columns);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };

        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });

        dispatch(
          boardActions.updateDB({ todo: todoMoved, columnId: finishCol.id })
        );
        dispatch(boardActions.setBoardState({ ...board, columns: newColumns }));
      }
    }
  };

  return (
    <>
      <TransitionsModal />
      <div className="p-5">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
              >
                {board?.columns &&
                  Array.from(board.columns.entries()).map(
                    ([id, column], index) => {
                      return (
                        <Column
                          key={id}
                          id={id}
                          todos={column.todos}
                          index={index}
                        />
                      );
                    }
                  )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
