import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardActions } from "@/reducer/boardReducer";
import {
  selectEditTask,
  selectIsModalOpen,
  selectNewTaskDescription,
  selectNewTaskInput,
  selectNewTaskType,
} from "@/reducer/selector";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid white",
  boxShadow: 24,
  p: 2,
  outline: "none",
  borderRadius: "20px",
};

type Inputs = {
  title: string;
  description: string;
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .matches(/^[A-Za-z\s]+$/, "Title should contain only alphabets"),
  description: yup
    .string()
    .required("Description is required")
    .min(25, "Description should be at least 25 characters"),
});

const TransitionsModal = () => {
  const dispatch = useDispatch();

  const editTask = useSelector(selectEditTask);
  const isOpen = useSelector(selectIsModalOpen);
  const {
    register,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<Inputs>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      title: editTask?.previous?.todo || "",
      description: editTask?.previous?.todo?.description || "",
    },
  });

  React.useEffect(() => {
    reset({
      title: editTask?.previous?.todo?.title || "",
      description: editTask?.previous?.todo?.description || "",
    });
  }, [reset, editTask?.previous, isOpen]);

  const newTaskInput = useSelector(selectNewTaskInput);
  const newTaskDescription = useSelector(selectNewTaskDescription);

  const newTaskType = useSelector(selectNewTaskType);

  const editPrevData = editTask?.previous;

  const [formValues, setFormValues] = React.useState({
    newTaskInput: editTask?.previous?.todo?.title,
    newTaskDescription: editTask?.previous?.todo?.description,
  });

  React.useEffect(() => {
    if (editTask) {
      dispatch(
        boardActions.updateEditCurrentData({
          taskIndex: editPrevData?.taskIndex,
          todo: {
            $id: newTaskType,
            status: editPrevData?.todo?.status,
            title: newTaskInput,
            description: newTaskDescription,
          },
          id: newTaskType,
        })
      );
    }
  }, [dispatch, editPrevData, newTaskType, newTaskInput]);

  React.useEffect(() => {
    setFormValues({
      newTaskInput: getValues("title"),
      newTaskDescription: getValues("description"),
    });
  }, [getValues("title"), getValues("description")]);

  React.useEffect(() => {
    setFormValues({
      newTaskInput: editTask?.previous?.todo?.title,
      newTaskDescription: editTask?.previous?.todo?.description,
    });
  }, [editTask?.previous]);

  React.useEffect(() => {
    dispatch(boardActions.setNewTask(formValues));
  }, [dispatch, formValues]);

  const handleClose = () => {
    dispatch(
      boardActions.setNewTask({ newTaskInput: "", newTaskDescription: "" })
    );
    dispatch(boardActions.toggleModal());
  };

  const handleAddTask = () => {
    if (!newTaskInput) return;
    dispatch(
      boardActions.addTask({
        todo: newTaskInput,
        description: newTaskDescription,
        columnId: newTaskType,
      })
    );
  };

  const handleUpdateTask = () => {
    dispatch(
      boardActions.taskEdit({
        taskIndex: editTask?.previous?.taskIndex,
        todo: {
          $id: editTask?.previous?.todo?.$id,
          status: editTask?.previous?.todo?.status,
          title: newTaskInput,
          description: newTaskDescription,
        },
        id: newTaskType,
      })
    );
    dispatch(boardActions.toggleModal());
  };

  const handleDelete = () => {
    dispatch(
      boardActions.deleteTask({
        taskIndex: editTask?.previous?.taskIndex,
        todo: editTask?.previous?.todo,
        id: editTask?.previous?.id,
      })
    );
  };

  const isDisabled = () => {
    if (editTask)
      return !(isValid && isDirty) && !(newTaskType !== editTask?.previous?.id);
    else return !(isValid && isDirty);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <div
              id="transition-modal-title"
              className="text-lg font-medium leading-6 text-gray-900 pb-2"
            >
              {editTask ? "Update" : "Add"} a Task
            </div>
            <div className="mt-2">
              <label
                htmlFor="title"
                className="font-medium text-gray-900 text-sm font-normal"
              >
                Title:
              </label>
              <input
                {...register("title")}
                placeholder="Enter title here..."
                autoComplete="off"
                className="w-full border border-gray-300 rounded-md outline-none p-3"
              />
              {errors.title && (
                <div className="text-red-500 hover:text-red-600  px-4 py-2 text-sm font-normal">
                  {errors.title.message}
                </div>
              )}
            </div>
            <div className="mt-2">
              <label
                htmlFor="description"
                className="font-medium text-gray-900 text-sm font-normal"
              >
                Description:
              </label>
              <input
                {...register("description")}
                placeholder="Enter description here..."
                autoComplete="off"
                className="w-full border border-gray-300 rounded-md outline-none p-3"
              />
              {errors.description && (
                <div className="text-red-500 hover:text-red-600  px-4 py-2 text-sm font-normal">
                  {errors.description.message}
                </div>
              )}
            </div>
            <TaskTypeRadioGroup />
            <div className="flex justify-between items-center">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                onClick={handleDelete}
                disabled={!editTask}
              >
                Delete
              </button>
              <button
                disabled={isDisabled()}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                onClick={editTask ? handleUpdateTask : handleAddTask}
              >
                {editTask ? "Update" : "Add"} Task
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
