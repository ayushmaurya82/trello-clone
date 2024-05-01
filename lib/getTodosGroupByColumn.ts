import { Board, Column, Todo, TypedColumn } from "@/components/types";
import { documentType } from "@/reducer/boardReducer";

export const getTodosGroupByColumn = (documents: documentType[]) => {
  if (!localStorage.getItem("documents"))
    localStorage.setItem("documents", JSON.stringify(documents));
  const todos = JSON.parse(localStorage.getItem("documents") || "");

  let document = todos === "" ? documents : todos;

  const columns = document.reduce((acc: any, todo: any) => {
    const todoStatus = todo.status as TypedColumn;
    if (!acc.get(todoStatus)) {
      acc.set(todoStatus, {
        id: todoStatus,
        todos: [],
      });
    }

    const todoToAdd: Todo = {
      $id: todo.$id,
      title: todo.title,
      status: todoStatus,
      description: todo.description,
    };

    if (todo.image) {
      todoToAdd.image = JSON.parse(todo.image);
    }

    acc.get(todoStatus)!.todos.push(todoToAdd);

    return acc;
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map<TypedColumn, Column>(
    Array.from(columns.entries()).sort(
      (a: any, b: any) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    ) as [TypedColumn, Column][]
  );

  let board: Board = {
    columns: sortedColumns,
  };

  if (!localStorage.getItem("mapData")) {
    const objectData = Object.fromEntries(board.columns);
    const stringData = JSON.stringify(objectData);
    localStorage.setItem("mapData", stringData);
  } else {
    const rawData = localStorage.getItem("mapData") || "[]";
    const parsedData: [string, Column][] = JSON.parse(rawData);
    const columnsMap = new Map<TypedColumn, Column>();

    for (const key in parsedData) {
      if (Object.hasOwnProperty.call(parsedData, key)) {
        const typedColumn = key as unknown as TypedColumn;
        const value = parsedData[key] as unknown as Column;
        columnsMap.set(typedColumn, value);
      }
    }
    board = { columns: columnsMap };
  }

  return board;
};
