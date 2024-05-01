import { Board, Column, Todo, TypedColumn } from "@/components/types";

export const getTodosGroupByColumn = () => {
  const todos = JSON.parse(localStorage.getItem("documents") || "");

  const columns = todos.reduce((acc: any, todo: any) => {
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
      description: todo.description
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

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
