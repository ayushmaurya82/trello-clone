import { Board, Column, TypedColumn } from "@/components/types";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

const getBoardsConfig = (state: any) => {
  return state?.boardReducer;
};

export const selectBordsData = createSelector(
  getBoardsConfig,
  (data): Board => data.board
);

// export const selectBordsData = createSelector(
//   getBoardsConfig,
//   (data): Board =>
//     !localStorage.getItem("mapData")
//       ? data.board
//       : {
//           columns: new Map(
//             Object.entries(JSON.parse(localStorage.getItem("mapData") || "[]"))
//           ),
//         }
// );

export const selectSearchString = createSelector(
  getBoardsConfig,
  (data) => data.searchString
);

export const selectIsModalOpen = createSelector(
  getBoardsConfig,
  (data) => data.isModalOpen
);

export const selectNewTaskInput = createSelector(
  getBoardsConfig,
  (data) => data.newTaskInput
);

export const selectNewTaskDescription = createSelector(
  getBoardsConfig,
  (data) => data.newTaskDescription
);

export const selectNewTaskType = createSelector(
  getBoardsConfig,
  (data) => data.newTaskType
);

export const selectEditTask = createSelector(
  getBoardsConfig,
  (data) => data.editTask
);
