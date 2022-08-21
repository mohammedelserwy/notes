import { createSlice } from '@reduxjs/toolkit';
import { hasMatchFunction } from '@reduxjs/toolkit/dist/tsHelpers';
import { act } from 'react-test-renderer';

const initialState = {
  taskText: '',
  inputText: '',
  listOfTasks: [],
  listOfFinishedTasks: [],
  listOfShopTasks: [],
  listOfPersonalTasks: [],
  listOfWorkTasks: [],
  isLongPressed: false,
  selectedNotesIndexsList: [],
  search: false,
  filteredList: [],

  nameOfTask: '',
  id: null,
  textInputString: '',
  dateString: '',
  checkBoxValue: false,
  fromFAB: false,
  fromView: false,
  fromFinishedScreen: false,
  fromShopScreen: false,
  fromPersonalScreen: false,
  fromWorkScreen: false,
  fromDrawer: false,
  dropDownValue: '',

  inputTextFromRootOrMain: "",
  inputTextFromRootOrShop: "",
  inputTextFromRootOrPersonal: "",
  inputTextFromRootOrWork: "",
  inputTextFromRootOrFinished: "",

};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateForFirstTime: (state, action) => {
      state.taskText = action.payload;
      state.inputText = action.payload;
    },

    updateForSecondTime: (state, action) => {
      state.inputText = action.payload.inputText;
      state.listOfTasks = action.payload.listOfTasks;
    },
    updateForSecondTimeForShopTask: (state, action) => {
      state.inputText = action.payload.inputText;
      state.listOfShopTasks = action.payload.listOfShopTasks;
      state.listOfTasks = action.payload.listOfTasks;
    },
    updateForSecondTimeForPersonalTask: (state, action) => {
      state.inputText = action.payload.inputText;
      state.listOfPersonalTasks = action.payload.listOfPersonalTasks;
      state.listOfTasks = action.payload.listOfTasks;
    },
    updateForSecondTimeForWorkTask: (state, action) => {
      state.inputText = action.payload.inputText;
      state.listOfWorkTasks = action.payload.listOfWorkTasks;
      state.listOfTasks = action.payload.listOfTasks;
    },
    updateForSecondTimeOnFinishedTaskScreen: (state, action) => {
      state.inputText = action.payload.inputText;
      state.listOfFinishedTasks = action.payload.listOfFinishedTasks;
    },

    updateForThirdTime: (state, action) => {
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
    },

    updateForFourthTime: (state, action) => {
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
    },

    updateForFifthTime: (state, action) => {
      state.isLongPressed = action.payload;
    },

    updateForSixTime: (state, action) => {
      state.isLongPressed = action.payload;
    },

    updateForSevenTime: (state, action) => {
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
    },

    updateForEightTime: (state, action) => {
      state.selectedNotesIndexsList = action.payload;
    },

    changeTaskType: (state, action) => {
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      for (let i = 0; i < state.selectedNotesIndexsList.length; i++) {
        state.listOfTasks[
          state.selectedNotesIndexsList[i]
        ].checkBoxValue = true;
        state.listOfFinishedTasks.push(
          state.listOfTasks[state.selectedNotesIndexsList[i]],
        );
      }
      state.listOfShopTasks = state.listOfTasks.filter(element => {
        return (
          element.typeOfTask !== 'finished' && element.nameOfTask === 'التسوق'
        );
      });
      state.listOfWorkTasks = state.listOfTasks.filter(element => {
        return (
          element.typeOfTask !== 'finished' && element.nameOfTask === 'العمل'
        );
      });
      state.listOfPersonalTasks = state.listOfTasks.filter(element => {
        return (
          element.typeOfTask !== 'finished' && element.nameOfTask === 'الشخصيه'
        );
      });
      state.listOfTasks = state.listOfTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });

      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = [];
    },

    changeTaskTypeForShopTask: (state, action) => {
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      for (let i = 0; i < state.selectedNotesIndexsList.length; i++) {
        state.listOfShopTasks[
          state.selectedNotesIndexsList[i]
        ].checkBoxValue = true;

        state.listOfFinishedTasks.push(
          state.listOfShopTasks[state.selectedNotesIndexsList[i]],
        );
      }

      state.listOfShopTasks = state.listOfShopTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
      state.listOfTasks = action.payload.listOfTasks;
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = [];
    },

    changeTaskTypeForPersonalTask: (state, action) => {
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      for (let i = 0; i < state.selectedNotesIndexsList.length; i++) {
        state.listOfPersonalTasks[
          state.selectedNotesIndexsList[i]
        ].checkBoxValue = true;

        state.listOfFinishedTasks.push(
          state.listOfPersonalTasks[state.selectedNotesIndexsList[i]],
        );
      }

      state.listOfPersonalTasks = state.listOfPersonalTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
      state.listOfTasks = action.payload.listOfTasks;
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = [];
    },
    changeTaskTypeForWorkTask: (state, action) => {
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      for (let i = 0; i < state.selectedNotesIndexsList.length; i++) {
        state.listOfWorkTasks[
          state.selectedNotesIndexsList[i]
        ].checkBoxValue = true;

        state.listOfFinishedTasks.push(
          state.listOfWorkTasks[state.selectedNotesIndexsList[i]],
        );
      }

      state.listOfWorkTasks = state.listOfWorkTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
      state.listOfTasks = action.payload.listOfTasks;
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = [];
    },

    changeTaskTypeOnFinishedTaskScreen: (state, action) => {
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      for (let i = 0; i < state.selectedNotesIndexsList.length; i++) {
        if (
          state.listOfFinishedTasks[state.selectedNotesIndexsList[i]]
            .nameOfTask === ''
        ) {
          state.listOfFinishedTasks[
            state.selectedNotesIndexsList[i]
          ].checkBoxValue = false;
          state.listOfTasks.push(
            state.listOfFinishedTasks[state.selectedNotesIndexsList[i]],
          );
        } else if (
          state.listOfFinishedTasks[state.selectedNotesIndexsList[i]]
            .nameOfTask === 'التسوق'
        ) {
          state.listOfFinishedTasks[
            state.selectedNotesIndexsList[i]
          ].checkBoxValue = false;
          state.listOfTasks.push(
            state.listOfFinishedTasks[state.selectedNotesIndexsList[i]],
          );
          state.listOfShopTasks.push(
            state.listOfFinishedTasks[state.selectedNotesIndexsList[i]],
          );
        } else if (
          state.listOfFinishedTasks[state.selectedNotesIndexsList[i]]
            .nameOfTask === 'الشخصيه'
        ) {
          state.listOfFinishedTasks[
            state.selectedNotesIndexsList[i]
          ].checkBoxValue = false;
          state.listOfTasks.push(
            state.listOfFinishedTasks[state.selectedNotesIndexsList[i]],
          );
          state.listOfPersonalTasks.push(
            state.listOfFinishedTasks[state.selectedNotesIndexsList[i]],
          );
        }
        else if (
          state.listOfFinishedTasks[state.selectedNotesIndexsList[i]]
            .nameOfTask === 'العمل'
        ) {
          state.listOfFinishedTasks[
            state.selectedNotesIndexsList[i]
          ].checkBoxValue = false;
          state.listOfTasks.push(
            state.listOfFinishedTasks[state.selectedNotesIndexsList[i]],
          );
          state.listOfWorkTasks.push(
            state.listOfFinishedTasks[state.selectedNotesIndexsList[i]],
          );
        }
      }

      state.listOfFinishedTasks = state.listOfFinishedTasks.filter(element => {
        return element.typeOfTask !== 'all';
      });
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = [];
    },

    changeTaskTypeOnLongPress: (state, action) => {
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
    },
    changeTaskTypeOnLongPressForShopTask: (state, action) => {
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
    },

    changeTaskTypeOnLongPressForPersonalTask: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
    },
    changeTaskTypeOnLongPressForWorkTask: (state, action) => {
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
    },

    changeTaskTypeOnLongPressOnFinishedTaskScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
    },

    changeTaskTypeOnPress: (state, action) => {
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
    },

    changeTaskTypeOnPressOnFinishedTaskScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
    },

    /*-------------------------------------------------- */
    changeCheckBoxValue: (state, action) => {
      state.listOfTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
      state.listOfFinishedTasks.push(state.listOfTasks[action.payload.id]);
    },
    changeCheckBoxValueOnLongPress: (state, action) => {
      state.listOfTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
      state.listOfFinishedTasks.push(state.listOfTasks[action.payload.id]);
    },

    /*------------------------------------------------------------------ */
    changeCheckBoxOnLongPressForShopTask: (state, action) => {
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });
      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].typeOfTask === state.listOfShopTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfShopTasks = state.listOfShopTasks.filter(element => {
        return element.typeOfTask !== 'five';
      });

      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
    },
    changeCheckBoxOnLongPressForPersonalTask: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });
      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfPersonalTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfPersonalTasks = state.listOfPersonalTasks.filter(element => {
        return element.typeOfTask !== 'seven';
      });

      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
    },
    changeCheckBoxOnLongPressForWorkTask: (state, action) => {
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });
      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfWorkTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfWorkTasks = state.listOfWorkTasks.filter(element => {
        return element.typeOfTask !== 'nine';
      });

      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
    },

    changeCheckBoxValueOnLongPressForShopTask: (state, action) => {
      state.listOfShopTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks.push(state.listOfShopTasks[action.payload.id]);
    },
    changeCheckBoxValueOnLongPressForPersonalTask: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks.push(
        state.listOfPersonalTasks[action.payload.id],
      );
    },

    changeCheckBoxValueOnLongPressForWorkTask: (state, action) => {
      state.listOfWorkTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks.push(
        state.listOfWorkTasks[action.payload.id],
      );
    },
    changeCheckBoxForShopTask: (state, action) => {
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });
      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].typeOfTask === state.listOfShopTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfShopTasks = state.listOfShopTasks.filter(element => {
        return element.typeOfTask !== 'six';
      });
    },
    changeCheckBoxForPersonalTask: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });
      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfPersonalTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfPersonalTasks = state.listOfPersonalTasks.filter(element => {
        return element.typeOfTask !== 'eight';
      });
    },

    changeCheckBoxForWorkTask: (state, action) => {
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });
      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfWorkTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfWorkTasks = state.listOfWorkTasks.filter(element => {
        return element.typeOfTask !== 'ten';
      });
    },
    changeCheckBox: (state, action) => {
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;

      state.listOfTasks = state.listOfTasks.filter(element => {
        return element.typeOfTask !== 'two';
      });

      let copiedTaskList = [...state.listOfTasks];

      let listOfFilteredTasks = copiedTaskList.filter(element => {
        return element.nameOfTask === 'التسوق' && element.typeOfTask !== 'two';
      });

      state.listOfShopTasks = listOfFilteredTasks;
      let listOfFilteredPersonalTasks = copiedTaskList.filter(element => {
        return element.nameOfTask === 'الشخصيه' && element.typeOfTask !== 'two';
      });

      state.listOfPersonalTasks = listOfFilteredPersonalTasks;
      let listOfFilteredWorkTasks = copiedTaskList.filter(element => {
        return element.nameOfTask === 'العمل' && element.typeOfTask !== 'two';
      });

      state.listOfWorkTasks = listOfFilteredWorkTasks;
    },
    changeCheckBoxOnLongPress: (state, action) => {
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;

      state.listOfTasks = state.listOfTasks.filter(element => {
        return element.typeOfTask !== 'one';
      });
      let copiedTaskList = [...state.listOfTasks];

      let listOfFilteredTasks = copiedTaskList.filter(element => {
        return element.nameOfTask === 'التسوق' && element.typeOfTask !== 'one';
      });

      state.listOfShopTasks = listOfFilteredTasks;

      let listOfFilteredPersonalTasks = copiedTaskList.filter(element => {
        return element.nameOfTask === 'الشخصيه' && element.typeOfTask !== 'one';
      });

      state.listOfPersonalTasks = listOfFilteredPersonalTasks;
      let listOfFilteredWorkTasks = copiedTaskList.filter(element => {
        return element.nameOfTask === 'العمل' && element.typeOfTask !== 'one';
      });

      state.listOfWorkTasks = listOfFilteredWorkTasks;
      state.isLongPressed = action.payload.isLongPressed;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
    },

    changeCheckBoxValueForShopTask: (state, action) => {
      state.listOfShopTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks.push(state.listOfShopTasks[action.payload.id]);
    },
    changeCheckBoxValueForPersonalTask: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks.push(
        state.listOfPersonalTasks[action.payload.id],
      );
    },
    changeCheckBoxValueForWorkTask: (state, action) => {
      state.listOfWorkTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks.push(
        state.listOfWorkTasks[action.payload.id],
      );
    },

    changeTaskBoxValue: (state, action) => {
      state.checkBoxValue = action.payload;
    },

    pushTaskToFinishedTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(state.listOfTasks[action.payload.id]);
      state.listOfTasks = state.listOfTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    pushShopTaskToFinishedTasksScreen: (state, action) => {
      state.listOfShopTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfShopTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfShopTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfShopTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(state.listOfShopTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].typeOfTask === state.listOfShopTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfShopTasks = state.listOfShopTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    pushPersonalTaskToFinishedTasksScreen: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfPersonalTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfPersonalTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfPersonalTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(
        state.listOfPersonalTasks[action.payload.id],
      );

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfPersonalTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfPersonalTasks = state.listOfPersonalTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    pushWorkTaskToFinishedTasksScreen: (state, action) => {
      state.listOfWorkTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfWorkTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfWorkTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfWorkTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(
        state.listOfWorkTasks[action.payload.id],
      );

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfWorkTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfWorkTasks = state.listOfWorkTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },

    editShopTaskToPersonalAndPushItToFinishesTasksScreen: (state, action) => {
      state.listOfShopTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfShopTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfShopTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfShopTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(state.listOfShopTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].typeOfTask === state.listOfShopTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfShopTasks = state.listOfShopTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    editShopTaskToWorkAndPushItToFinishesTasksScreen: (state, action) => {
      state.listOfShopTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfShopTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfShopTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfShopTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfShopTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(state.listOfShopTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].typeOfTask === state.listOfShopTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfShopTasks = state.listOfShopTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    editPersonalTaskToShopAndPushItToFinishesTasksScreen: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfPersonalTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfPersonalTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfPersonalTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(
        state.listOfPersonalTasks[action.payload.id],
      );

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfPersonalTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfPersonalTasks = state.listOfPersonalTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    editPersonalTaskToWorkAndPushItToFinishesTasksScreen: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfPersonalTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfPersonalTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfPersonalTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfPersonalTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(
        state.listOfPersonalTasks[action.payload.id],
      );

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfPersonalTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfPersonalTasks = state.listOfPersonalTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    editWorkTaskToShopAndPushItToFinishesTasksScreen: (state, action) => {
      state.listOfWorkTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfWorkTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfWorkTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfWorkTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(
        state.listOfWorkTasks[action.payload.id],
      );

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfWorkTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfWorkTasks = state.listOfWorkTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    editWorkTaskToPersonalAndPushItToFinishesTasksScreen: (state, action) => {
      state.listOfWorkTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfWorkTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfWorkTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfWorkTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfWorkTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(
        state.listOfWorkTasks[action.payload.id],
      );

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].typeOfTask ===
              state.listOfWorkTasks[j].typeOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;

      state.listOfWorkTasks = state.listOfWorkTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    editShopTaskToPersonalAndPushItToTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;

      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfPersonalTasks.push(state.listOfTasks[action.payload.id]);

      state.listOfShopTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });
    },
    editWorkTaskToPersonalAndPushItToTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;

      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfPersonalTasks.push(state.listOfTasks[action.payload.id]);

      state.listOfWorkTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });
    },


    editPersonalTaskToShopAndPushItToTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;

      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfShopTasks.push(state.listOfTasks[action.payload.id]);

      state.listOfPersonalTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });
    },
    editPersonalTaskToWorkAndPushItToTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;

      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfWorkTasks.push(state.listOfTasks[action.payload.id]);

      state.listOfPersonalTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });
    },


    editWorkTaskToShopAndPushItToTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;

      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfShopTasks.push(state.listOfTasks[action.payload.id]);

      state.listOfWorkTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });
    },
    editShopTaskToWorkAndPushItToTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;

      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfWorkTasks.push(state.listOfTasks[action.payload.id]);

      state.listOfShopTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });
    },

    pushTaskToFinishedTasksScreenFromAllTaskScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(state.listOfTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return (
          element.nameOfTask === 'التسوق' && element.typeOfTask !== 'finished'
        );
      });

      state.listOfShopTasks = filteredList;
      state.listOfTasks = state.listOfTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },


    pushWorkTaskToFinishedTasksScreenFromAllTaskScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(state.listOfTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return (
          element.nameOfTask === 'العمل' && element.typeOfTask !== 'finished'
        );
      });

      state.listOfWorkTasks = filteredList;
      state.listOfTasks = state.listOfTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    pushPersonalTaskToFinishedTasksScreenFromAllTaskScreen: (state, action) => {
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfFinishedTasks.push(state.listOfTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return (
          element.nameOfTask === 'الشخصيه' && element.typeOfTask !== 'finished'
        );
      });

      state.listOfPersonalTasks = filteredList;
      state.listOfTasks = state.listOfTasks.filter(element => {
        return element.typeOfTask !== 'finished';
      });
    },
    pushTaskToTasksScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfFinishedTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfFinishedTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
      state.listOfFinishedTasks = state.listOfFinishedTasks.filter(element => {
        return element.typeOfTask !== 'all';
      });
    },
    pushTaskToTasksScreenAndShopScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfFinishedTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfFinishedTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
      state.listOfShopTasks.push(state.listOfFinishedTasks[action.payload.id]);
      state.listOfFinishedTasks = state.listOfFinishedTasks.filter(element => {
        return element.typeOfTask !== 'all';
      });
    },
    pushTaskToTasksScreenAndPersonalScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfFinishedTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfFinishedTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
      state.listOfPersonalTasks.push(
        state.listOfFinishedTasks[action.payload.id],
      );
      state.listOfFinishedTasks = state.listOfFinishedTasks.filter(element => {
        return element.typeOfTask !== 'all';
      });
    },
    pushTaskToTasksScreenAndWorkScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfFinishedTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfFinishedTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;
      state.listOfFinishedTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
      state.listOfWorkTasks.push(
        state.listOfFinishedTasks[action.payload.id],
      );
      state.listOfFinishedTasks = state.listOfFinishedTasks.filter(element => {
        return element.typeOfTask !== 'all';
      });
    },

    changeCheckBoxOnFinishedTaskScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;

      state.listOfFinishedTasks = state.listOfFinishedTasks.filter(element => {
        return element.typeOfTask !== 'four';
      });
    },

    changeCheckBoxValueOnFinishedTaskScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;

      state.listOfFinishedTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfFinishedTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
      if (state.listOfFinishedTasks[action.payload.id].nameOfTask === '') {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
      } else if (
        state.listOfFinishedTasks[action.payload.id].nameOfTask === 'التسوق'
      ) {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
        state.listOfShopTasks.push(
          state.listOfFinishedTasks[action.payload.id],
        );
      } else if (
        state.listOfFinishedTasks[action.payload.id].nameOfTask === 'الشخصيه'
      ) {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
        state.listOfPersonalTasks.push(
          state.listOfFinishedTasks[action.payload.id],
        );
      } else if (
        state.listOfFinishedTasks[action.payload.id].nameOfTask === 'العمل'
      ) {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
        state.listOfWorkTasks.push(
          state.listOfFinishedTasks[action.payload.id],
        );
      }
    },
    /*-------------------------------------------------*/
    changeCheckBoxOnFinishedTaskScreenOnLongPress: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;

      state.listOfFinishedTasks = state.listOfFinishedTasks.filter(element => {
        return element.typeOfTask !== 'three';
      });
    },

    changeCheckBoxValueOnFinishedTaskScreenOnLongPress: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].typeOfTask =
        action.payload.typeOfTask;

      state.listOfFinishedTasks[action.payload.id].checkBoxValue =
        action.payload.checkBoxValue;
      state.listOfFinishedTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
      if (state.listOfFinishedTasks[action.payload.id].nameOfTask === '') {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
      } else if (
        state.listOfFinishedTasks[action.payload.id].nameOfTask === 'التسوق'
      ) {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
        state.listOfShopTasks.push(
          state.listOfFinishedTasks[action.payload.id],
        );
      } else if (
        state.listOfFinishedTasks[action.payload.id].nameOfTask === 'الشخصيه'
      ) {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
        state.listOfPersonalTasks.push(
          state.listOfFinishedTasks[action.payload.id],
        );
      } else if (
        state.listOfFinishedTasks[action.payload.id].nameOfTask === 'العمل'
      ) {
        state.listOfTasks.push(state.listOfFinishedTasks[action.payload.id]);
        state.listOfWorkTasks.push(
          state.listOfFinishedTasks[action.payload.id],
        );
      }
    },
    changeListOfTasks: (state, action) => {
      state.filteredList = action.payload.filteredList;
      state.search = action.payload.search;
    },


    changeSearchMode: (state, action) => {
      state.search = action.payload;
    },
    deleteTasks: (state, action) => {
      state.listOfWorkTasks = action.payload.listOfWorkTasks;
      state.listOfTasks = action.payload.listOfTasks;
      state.listOfShopTasks = action.payload.listOfShopTasks;
      state.listOfPersonalTasks = action.payload.listOfPersonalTasks;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      state.isLongPressed = action.payload.isLongPressed;
    },
    deleteTasksForShopTask: (state, action) => {
      state.listOfTasks = action.payload.listOfTasks;
      state.listOfShopTasks = action.payload.listOfShopTasks;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      state.isLongPressed = action.payload.isLongPressed;
    },
    deleteTasksForPersonalTask: (state, action) => {
      state.listOfTasks = action.payload.listOfTasks;
      state.listOfPersonalTasks = action.payload.listOfPersonalTasks;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      state.isLongPressed = action.payload.isLongPressed;
    },
    deleteTasksForWorkTask: (state, action) => {
      state.listOfTasks = action.payload.listOfTasks;
      state.listOfWorkTasks = action.payload.listOfWorkTasks;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      state.isLongPressed = action.payload.isLongPressed;
    },

    deleteTasksOnFinishedTaskScreen: (state, action) => {
      state.listOfFinishedTasks = action.payload.listOfFinishedTasks;
      state.selectedNotesIndexsList = action.payload.selectedNotesIndexsList;
      state.isLongPressed = action.payload.isLongPressed;
    },

    changeTaskPressCondition: (state, action) => {
      state.listOfTasks[action.payload.id].pressTheTaskForFirstTime =
        action.payload.condition;
    },
    changeTaskPressConditionForShopTask: (state, action) => {
      state.listOfShopTasks[action.payload.id].pressTheTaskForFirstTime =
        action.payload.condition;
    },
    changeTaskPressConditionForPersonalTask: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].pressTheTaskForFirstTime =
        action.payload.condition;
    },
    changeTaskPressConditionForWorkTask: (state, action) => {
      state.listOfWorkTasks[action.payload.id].pressTheTaskForFirstTime =
        action.payload.condition;
    },

    changeTaskPressConditionOnFinishedTaskScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].pressTheTaskForFirstTime =
        action.payload.condition;
    },

    changeNameOfTask: (state, action) => {
      state.fromShopScreen = action.payload.fromShopScreen;
      state.fromFAB = action.payload.fromFAB;
      state.fromView = action.payload.fromView;
      state.fromFinishedScreen = action.payload.fromFinishedScreen;
      state.fromPersonalScreen = action.payload.fromPersonalScreen;
      state.fromWorkScreen = action.payload.fromWorkScreen;
      state.dateString = action.payload.dateString;
      state.checkBoxValue = action.payload.checkBoxValue;
      state.textInputString = action.payload.textInputString;
      state.dropDownValue = action.payload.dropDownValue;
      state.fromDrawer = action.payload.fromDrawer;

    },
    changeViewConditionOnPress: (state, action) => {
      state.id = action.payload.id;
      state.fromFAB = action.payload.fromFAB;
      state.dateString = action.payload.dateString;
      state.fromView = action.payload.fromView;
      state.fromFinishedScreen = action.payload.fromFinishedScreen;
      state.fromShopScreen = action.payload.fromShopScreen;

      state.fromWorkScreen = action.payload.fromWorkScreen;
      state.fromPersonalScreen = action.payload.fromPersonalScreen;
      state.fromDrawer = action.payload.fromDrawer;
      state.checkBoxValue = action.payload.checkBoxValue;
    },
    changeViewConditionOnPressForShopTask: (state, action) => {
      state.id = action.payload.id;
      state.fromFAB = action.payload.fromFAB;
      state.dateString = action.payload.dateString;
      state.fromView = action.payload.fromView;
      state.fromFinishedScreen = action.payload.fromFinishedScreen;
      state.checkBoxValue = action.payload.checkBoxValue;
      state.fromShopScreen = action.payload.fromShopScreen;
      state.fromDrawer = action.payload.fromDrawer;
      state.fromWorkScreen = action.payload.fromWorkScreen;

      state.fromPersonalScreen = action.payload.fromPersonalScreen;
    },
    changeViewConditionOnPressForPersonalTask: (state, action) => {
      state.id = action.payload.id;
      state.fromFAB = action.payload.fromFAB;
      state.dateString = action.payload.dateString;
      state.fromView = action.payload.fromView;
      state.fromFinishedScreen = action.payload.fromFinishedScreen;
      state.checkBoxValue = action.payload.checkBoxValue;
      state.fromShopScreen = action.payload.fromShopScreen;

      state.fromWorkScreen = action.payload.fromWorkScreen;
      state.fromDrawer = action.payload.fromDrawer;
      state.fromPersonalScreen = action.payload.fromPersonalScreen;
    },
    changeViewConditionOnPressForWorkTask: (state, action) => {
      state.id = action.payload.id;
      state.fromFAB = action.payload.fromFAB;
      state.dateString = action.payload.dateString;
      state.fromView = action.payload.fromView;
      state.fromFinishedScreen = action.payload.fromFinishedScreen;
      state.checkBoxValue = action.payload.checkBoxValue;
      state.fromShopScreen = action.payload.fromShopScreen;
      state.fromDrawer = action.payload.fromDrawer;
      state.fromWorkScreen = action.payload.fromWorkScreen;

      state.fromPersonalScreen = action.payload.fromPersonalScreen;
    },

    changeViewConditionOnPressOnFinishedTaskScreen: (state, action) => {
      state.id = action.payload.id;
      state.fromFAB = action.payload.fromFAB;
      state.dateString = action.payload.dateString;
      state.fromView = action.payload.fromView;
      state.fromFinishedScreen = action.payload.fromFinishedScreen;
      state.fromShopScreen = action.payload.fromShopScreen;

      state.fromWorkScreen = action.payload.fromWorkScreen;
      state.fromPersonalScreen = action.payload.fromPersonalScreen;

      state.checkBoxValue = action.payload.checkBoxValue;
      state.fromDrawer = action.payload.fromDrawer;
    },

    changeTextInputString: (state, action) => {
      state.textInputString = action.payload.textInput;
    },
    clearTextInputAndDateString: (state, action) => {
      state.textInputString = action.payload.textInputString;
      state.dateString = action.payload.dateString;
      state.dropDownValue = action.payload.dropDownValue;
      state.checkBoxValue = action.payload.checkBoxValue;
    },
    changeDate: (state, action) => {
      state.dateString = action.payload;
    },

    changeTaskTextOfListOfTasks: (state, action) => {
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;
    },


    changeTaskTextOfListOfTasksForEditing: (state, action) => {
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfShopTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });
    },
    changeTaskTextOfListOfWorkTasksForEditing: (state, action) => {
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfWorkTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });
    },
    changeTaskTextOfListOfPersonalTasksForEditing: (state, action) => {
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfPersonalTasks = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });
    },
    editListOfShopTasksAndPushItToPersonalAndAllTaskScreens: (state, action) => {
      state.listOfShopTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfShopTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfShopTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfPersonalTasks.push(state.listOfShopTasks[action.payload.id]);
      state.listOfTasks.push(state.listOfShopTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].nameOfTask === state.listOfShopTasks[j].nameOfTask
            ) {

              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;
      state.listOfShopTasks = state.listOfShopTasks.filter((element) => {
        return element.nameOfTask === "التسوق";
      });
    },
    editListOfPersonalTasksAndPushItToShopAndAllTaskScreens: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfPersonalTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfPersonalTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfShopTasks.push(state.listOfPersonalTasks[action.payload.id]);
      state.listOfTasks.push(state.listOfPersonalTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].nameOfTask === state.listOfPersonalTasks[j].nameOfTask
            ) {

              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;
      state.listOfPersonalTasks = state.listOfPersonalTasks.filter((element) => {
        return element.nameOfTask === "الشخصيه";
      });
    },
    editListOfWorkTasksAndPushItToShopAndAllTaskScreens: (state, action) => {
      state.listOfWorkTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfWorkTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfWorkTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfShopTasks.push(state.listOfWorkTasks[action.payload.id]);
      state.listOfTasks.push(state.listOfWorkTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].nameOfTask === state.listOfWorkTasks[j].nameOfTask
            ) {

              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;
      state.listOfWorkTasks = state.listOfWorkTasks.filter((element) => {
        return element.nameOfTask === "العمل";
      });
    },
    editListOfShopTasksAndPushItToWorkAndAllTaskScreens: (state, action) => {
      state.listOfShopTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfShopTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfShopTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfWorkTasks.push(state.listOfShopTasks[action.payload.id]);
      state.listOfTasks.push(state.listOfShopTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].nameOfTask === state.listOfShopTasks[j].nameOfTask
            ) {

              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;
      state.listOfShopTasks = state.listOfShopTasks.filter((element) => {
        return element.nameOfTask === "التسوق";
      });
    },
    editListOfPersonalTasksAndPushItToWorkAndAllTaskScreens: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfPersonalTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfPersonalTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfWorkTasks.push(state.listOfPersonalTasks[action.payload.id]);
      state.listOfTasks.push(state.listOfPersonalTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].nameOfTask === state.listOfPersonalTasks[j].nameOfTask
            ) {

              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;
      state.listOfPersonalTasks = state.listOfPersonalTasks.filter((element) => {
        return element.nameOfTask === "الشخصيه";
      });
    },
    editListOfWorkTasksAndPushItToPersonalAndAllTaskScreens: (state, action) => {
      state.listOfWorkTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfWorkTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfWorkTasks[action.payload.id].dateString =
        action.payload.dateString;
      state.listOfPersonalTasks.push(state.listOfWorkTasks[action.payload.id]);
      state.listOfTasks.push(state.listOfWorkTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].nameOfTask === state.listOfWorkTasks[j].nameOfTask
            ) {

              finalList.push(state.listOfTasks[i]);
            }
          }

          j++;
        }
      }
      state.listOfTasks = finalList;
      state.listOfWorkTasks = state.listOfWorkTasks.filter((element) => {
        return element.nameOfTask === "العمل";
      });
    },
    editListOfShopTasks: (state, action) => {
      state.listOfShopTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfShopTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfShopTasks[action.payload.id].dateString =
        action.payload.dateString;


      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].taskText !== state.listOfShopTasks[j].taskText || filteredList[j].dateString !== state.listOfShopTasks[j].dateString
            ) {
              filteredList[j].taskText = state.listOfShopTasks[j].taskText;
              filteredList[j].dateString = state.listOfShopTasks[j].dateString;
              finalList.push(filteredList[j]);
            } else if (
              filteredList[j].taskText === state.listOfShopTasks[j].taskText && filteredList[j].dateString === state.listOfShopTasks[j].dateString
            ) {

              finalList.push(filteredList[j]);
            }







          }

          j++;
        }
      }
      state.listOfTasks = finalList;

    },
    editTaskTextOfListOfPersonalTasks: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfPersonalTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfPersonalTasks[action.payload.id].dateString =
        action.payload.dateString;

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].taskText !== state.listOfPersonalTasks[j].taskText || filteredList[j].dateString !==
              state.listOfPersonalTasks[j].dateString
            ) {
              filteredList[j].taskText = state.listOfPersonalTasks[j].taskText;
              filteredList[j].dateString = state.listOfPersonalTasks[j].dateString;

              finalList.push(filteredList[j]);
            } else if (
              filteredList[j].taskText === state.listOfPersonalTasks[j].taskText && filteredList[j].dateString === state.listOfPersonalTasks[j].dateString
            ) {

              finalList.push(filteredList[j]);
            }

          }

          j++;
        }
      }
      state.listOfTasks = finalList;
    },
    editTaskTextOfListOfWorkTasks: (state, action) => {
      state.listOfWorkTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfWorkTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfWorkTasks[action.payload.id].dateString =
        action.payload.dateString;

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'العمل';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'العمل') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfWorkTasks.length) {
            if (
              filteredList[j].taskText !== state.listOfWorkTasks[j].taskText || filteredList[j].dateString !== state.listOfWorkTasks[j].dateString
            ) {
              filteredList[j].taskText = state.listOfWorkTasks[j].taskText;
              filteredList[j].dateString = state.listOfWorkTasks[j].dateString;
              finalList.push(filteredList[j]);
            } else if (
              filteredList[j].taskText === state.listOfWorkTasks[j].taskText && filteredList[j].dateString === state.listOfWorkTasks[j].dateString
            ) {

              finalList.push(filteredList[j]);
            }

          }

          j++;
        }
      }
      state.listOfTasks = finalList;
    },
    changeTaskTextOfListOfShopTasksForEditingForPersonalScreen: (
      state,
      action,
    ) => {
      state.listOfShopTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfShopTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfShopTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfTasks.push(state.listOfShopTasks[action.payload.id]);
      state.listOfPersonalTasks.push(state.listOfShopTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'التسوق') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfShopTasks.length) {
            if (
              filteredList[j].nameOfTask === state.listOfShopTasks[j].nameOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }

            j++;
          }
        }
      }
      state.listOfTasks = finalList;

      state.listOfShopTasks = state.listOfShopTasks.filter(element => {
        return element.nameOfTask === 'التسوق';
      });
    },
    changeTaskTextOfListOfPersonalTasksForEditingForShopScreen: (
      state,
      action,
    ) => {
      state.listOfPersonalTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfPersonalTasks[action.payload.id].taskText =
        action.payload.taskText;
      state.listOfPersonalTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfTasks.push(state.listOfPersonalTasks[action.payload.id]);
      state.listOfShopTasks.push(state.listOfPersonalTasks[action.payload.id]);

      let filteredList = state.listOfTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });

      let finalList = [];

      for (let i = 0, j = 0; i < state.listOfTasks.length; i++) {
        if (state.listOfTasks[i].nameOfTask !== 'الشخصيه') {
          finalList.push(state.listOfTasks[i]);
        } else {
          if (j < state.listOfPersonalTasks.length) {
            if (
              filteredList[j].nameOfTask ===
              state.listOfPersonalTasks[j].nameOfTask
            ) {
              finalList.push(state.listOfTasks[i]);
            }

            j++;
          }
        }
      }
      state.listOfTasks = finalList;

      state.listOfPersonalTasks = state.listOfPersonalTasks.filter(element => {
        return element.nameOfTask === 'الشخصيه';
      });
    },

    changeTaskTextOfListOfShopTasks: (state, action) => {
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfShopTasks.push(state.listOfTasks[action.payload.id]);
    },
    changeTaskTextOfListOfWorkTasks: (state, action) => {
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfWorkTasks.push(state.listOfTasks[action.payload.id]);
    },
    changeTaskTextOfListOfPersonalTasks: (state, action) => {
      state.listOfTasks[action.payload.id].nameOfTask =
        action.payload.nameOfTask;
      state.listOfTasks[action.payload.id].taskText = action.payload.taskText;
      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;

      state.listOfPersonalTasks.push(state.listOfTasks[action.payload.id]);
    },

    changeTaskTextOfListOfFinishedTasks: (state, action) => {
      state.listOfFinishedTasks[state.id].taskText = action.payload.taskText;
      state.listOfFinishedTasks[state.id].dateString =
        action.payload.dateString;
      state.listOfFinishedTasks[state.id].nameOfTask =
        action.payload.nameOfTask;
    },

    changeDateInputString: (state, action) => {
      state.dateString = action.payload.dateString;

      state.listOfTasks[action.payload.id].dateString =
        action.payload.dateString;
    },

    changeDateInputStringForFinishedTasks: (state, action) => {
      state.dateString = action.payload.dateString;
      state.listOfFinishedTasks[action.payload.id].dateString =
        action.payload.dateString;
    },
    changeDropDownValue: (state, action) => {
      state.dropDownValue = action.payload.dropDownValue;
      state.nameOfTask = action.payload.nameOfTask;
    },
    changeNameOfTaskFromDropDownMenu: (state, action) => {
      if (state.fromView && state.fromFAB === false) {
        state.listOfTasks[action.payload.id].nameOfTask =
          action.payload.nameOfTask;
      } else if (state.fromFinishedScreen && state.fromFAB === false) {
        state.listOfFinishedTasks[action.payload.id].nameOfTask =
          action.payload.nameOfTask;
      }
    },

    changeIsLongPressForTasksScreen: (state, action) => {
      state.listOfTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
    },

    changeIsLongPressForShopScreen: (state, action) => {
      state.listOfShopTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
    },
    changeIsLongPressForPersonalScreen: (state, action) => {
      state.listOfPersonalTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
    },
    changeIsLongPressForWorkScreen: (state, action) => {
      state.listOfWorkTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
    },
    changeIsLongPressForFinishedScreen: (state, action) => {
      state.listOfFinishedTasks[action.payload.id].isLongPressed =
        action.payload.isLongPressed;
    },
    addTaskToListOfTasks: (state, action) => {
      state.listOfTasks.push({
        taskText: action.payload.taskText,
        typeOfTask: 'all',
        checkBoxValue: false,
        pressTheTaskForFirstTime: false,
        fromView: false,
        fromFAB: false,
        fromShopScreen: false,
        fromFinishedScreen: false,
        fromWorkScreen: false,
        fromPersonalScreen: false,

        nameOfTask: '',
        id: null,
        dateString: action.payload.dateString === '' ? '' : action.payload.dateString,

        isLongPressed: false,
      });
    },
    addTaskToListOfTasksAndListOfShopTasks: (state, action) => {
      state.listOfTasks.push({
        taskText: action.payload.taskText,
        typeOfTask: 'all',
        checkBoxValue: false,
        pressTheTaskForFirstTime: false,
        fromView: false,
        fromFAB: false,
        fromShopScreen: false,
        fromFinishedScreen: false,
        fromWorkScreen: false,
        fromPersonalScreen: false,

        nameOfTask: 'التسوق',
        id: null,
        dateString: action.payload.dateString === '' ? '' : action.payload.dateString,

        isLongPressed: false,
      });
      state.listOfShopTasks.push({
        taskText: action.payload.taskText,
        typeOfTask: 'all',
        checkBoxValue: false,
        pressTheTaskForFirstTime: false,
        fromView: false,
        fromFAB: false,
        fromShopScreen: false,
        fromFinishedScreen: false,
        fromWorkScreen: false,
        fromPersonalScreen: false,
        nameOfTask: 'التسوق',
        id: null,
        dateString: action.payload.dateString === '' ? '' : action.payload.dateString,
        isLongPressed: false,
      });
    },
    addTaskToListOfTasksAndListOfPersonalTasks: (state, action) => {
      state.listOfTasks.push({
        taskText: action.payload.taskText,
        typeOfTask: 'all',
        checkBoxValue: false,
        pressTheTaskForFirstTime: false,
        fromView: false,
        fromFAB: false,
        fromShopScreen: false,
        fromFinishedScreen: false,
        fromWorkScreen: false,
        fromPersonalScreen: false,

        nameOfTask: 'الشخصيه',
        id: null,
        dateString: action.payload.dateString === '' ? '' : action.payload.dateString,

        isLongPressed: false,
      });
      state.listOfPersonalTasks.push({
        taskText: action.payload.taskText,
        typeOfTask: 'all',
        checkBoxValue: false,
        pressTheTaskForFirstTime: false,
        fromView: false,
        fromFAB: false,
        fromShopScreen: false,
        fromFinishedScreen: false,
        fromWorkScreen: false,
        fromPersonalScreen: false,
        nameOfTask: 'الشخصيه',
        id: null,
        dateString: action.payload.dateString === '' ? '' : action.payload.dateString,
        isLongPressed: false,
      });
    },
    addTaskToListOfTasksAndListOfWorkTasks: (state, action) => {
      state.listOfTasks.push({
        taskText: action.payload.taskText,
        typeOfTask: 'all',
        checkBoxValue: false,
        pressTheTaskForFirstTime: false,
        fromView: false,
        fromFAB: false,
        fromShopScreen: false,
        fromFinishedScreen: false,
        fromWorkScreen: false,
        fromPersonalScreen: false,

        nameOfTask: 'العمل',
        id: null,
        dateString: action.payload.dateString === '' ? '' : action.payload.dateString,

        isLongPressed: false,
      });
      state.listOfWorkTasks.push({
        taskText: action.payload.taskText,
        typeOfTask: 'all',
        checkBoxValue: false,
        pressTheTaskForFirstTime: false,
        fromView: false,
        fromFAB: false,
        fromShopScreen: false,
        fromFinishedScreen: false,
        fromWorkScreen: false,
        fromPersonalScreen: false,
        nameOfTask: 'العمل',
        id: null,
        dateString: action.payload.dateString === '' ? '' : action.payload.dateString,
        isLongPressed: false,
      });
    },
    changeDrawerCondition: (state, action) => {
      state.fromDrawer = action.payload.fromDrawer;
    },
    changeTextInSearchCaseForMainScreen: (state, action) => {
      state.inputTextFromRootOrMain = action.payload.inputTextFromRootOrMain;
    },
    changeTextInSearchCaseForShopScreen: (state, action) => {
      state.inputTextFromRootOrShop = action.payload.inputTextFromRootOrShop;
    },
    changeTextInSearchCaseForPersonalScreen: (state, action) => {
      state.inputTextFromRootOrPersonal = action.payload.inputTextFromRootOrPersonal;
    },
    changeTextInSearchCaseForWorkScreen: (state, action) => {
      state.inputTextFromRootOrWork = action.payload.inputTextFromRootOrWork;
    },
    changeTextInSearchCaseForFinishedScreen: (state, action) => {
      state.inputTextFromRootOrFinished = action.payload.inputTextFromRootOrFinished;
    },

  },
});

export const {
  changeDropDownValue,
  changeViewConditionOnPressForPersonalTask,
  changeListOfTasks,
  changeTaskTypeOnPress,

  changeListOfFinishedTasks,
  changeTextInSearchCaseForMainScreen,
  changeTextInSearchCaseForShopScreen,
  changeTextInSearchCaseForPersonalScreen,
  changeTextInSearchCaseForWorkScreen,
  changeTextInSearchCaseForFinishedScreen,
  clearTextInputAndDateString,
  changeViewConditionOnPressOnFinishedTaskScreen,
  changeTaskTextOfListOfFinishedTasks,
  changeIsLongPressForTasksScreen,
  changeDrawerCondition,
  changeViewConditionOnPressForWorkTask,
  changeViewConditionOnPressForShopTask,

  changeNameOfTask,
  changeViewConditionOnPress,
  addTaskToListOfTasks,
  addTaskToListOfTasksAndListOfShopTasks,
  addTaskToListOfTasksAndListOfPersonalTasks,
  addTaskToListOfTasksAndListOfWorkTasks,
  changeTaskTextOfListOfTasks,
  changeCheckBoxValueOnFinishedTaskScreen,
  changeTaskTypeOnFinishedTaskScreen,
  pushTaskToTasksScreenAndWorkScreen,
  pushTaskToTasksScreenAndPersonalScreen,
  editTaskTextOfListOfWorkTasks,
  editTaskTextOfListOfPersonalTasks,
  editPersonalTaskToWorkAndPushItToFinishesTasksScreen,
  editPersonalTaskToShopAndPushItToFinishesTasksScreen,
  editShopTaskToWorkAndPushItToFinishesTasksScreen,
  editShopTaskToPersonalAndPushItToFinishesTasksScreen,
  changeCheckBoxValue,
  changeTaskType,
  deleteTasks,
  pushWorkTaskToFinishedTasksScreenFromAllTaskScreen,
  editWorkTaskToPersonalAndPushItToFinishesTasksScreen,
  editWorkTaskToShopAndPushItToFinishesTasksScreen,
  pushWorkTaskToFinishedTasksScreen,
  pushPersonalTaskToFinishedTasksScreen,
  editListOfWorkTasksAndPushItToPersonalAndAllTaskScreens,
  editListOfPersonalTasksAndPushItToWorkAndAllTaskScreens,
  editListOfWorkTasksAndPushItToShopAndAllTaskScreens,
  editListOfPersonalTasksAndPushItToShopAndAllTaskScreens,
  editListOfShopTasksAndPushItToWorkAndAllTaskScreens,
  editListOfShopTasksAndPushItToPersonalAndAllTaskScreens,
  editListOfShopTasks,
  editPersonalTaskToWorkAndPushItToTasksScreen,
  pushTaskToFinishedTasksScreenFromAllTaskScreen,
  editShopTaskToWorkAndPushItToTasksScreen,
  editWorkTaskToShopAndPushItToTasksScreen,
  editPersonalTaskToShopAndPushItToTasksScreen,
  changeTaskTextOfListOfWorkTasks,
  changeTaskTextOfListOfShopTasks,
  changeTaskTextOfListOfWorkTasksForEditing,
  changeTaskTextOfListOfTasksForEditing,
  editWorkTaskToPersonalAndPushItToTasksScreen,
  editShopTaskToPersonalAndPushItToTasksScreen,
  deleteTasksForWorkTask,
  deleteTasksForPersonalTask,
  changeTaskTypeForWorkTask,
  changeTaskTypeForPersonalTask,
  updateForSecondTimeForWorkTask,
  updateForSecondTimeForPersonalTask,
  changeCheckBoxForWorkTask,
  changeCheckBoxForPersonalTask,
  changeCheckBoxValueForWorkTask,
  changeCheckBoxValueForPersonalTask,
  changeCheckBoxOnLongPressForPersonalTask,
  changeCheckBoxValueOnLongPressForWorkTask,
  changeCheckBoxValueOnLongPressForPersonalTask,
  changeTaskTypeOnLongPressForWorkTask,
  changeTaskTypeOnLongPressForPersonalTask,
  changeTaskPressConditionForWorkTask,
  changeTaskPressConditionForPersonalTask,
  changeIsLongPressForWorkScreen,
  changeIsLongPressForPersonalScreen,
  changeTaskTextOfListOfPersonalTasks,
  changeTaskTextOfListOfShopTasksForEditingForPersonalScreen,
  changeTaskTextOfListOfPersonalTasksForEditingForShopScreen,
  pushShopTaskToFinishedTasksScreen,
  pushTaskToTasksScreenAndShopScreen,
  pushPersonalTaskToFinishedTasksScreenFromAllTaskScreen,
  changeTaskTextOfListOfPersonalTasksForEditing,
  changeCheckBox,
  changeCheckBoxOnLongPress,
  changeCheckBoxValueOnLongPress,
  deleteTasksOnFinishedTaskScreen,
  changeCheckBoxOnFinishedTaskScreen,
  changeCheckBoxOnFinishedTaskScreenOnLongPress,
  changeCheckBoxValueOnFinishedTaskScreenOnLongPress,
  deleteTasksForShopTask,
  changeTaskTypeForShopTask,
  updateForSecondTimeForShopTask,
  changeCheckBoxForShopTask,
  changeCheckBoxValueForShopTask,
  changeCheckBoxOnLongPressForShopTask,
  changeCheckBoxValueOnLongPressForShopTask,
  changeTaskTypeOnLongPressForShopTask,
  changeTaskPressConditionForShopTask,
  changeIsLongPressForShopScreen,

  changeNameOfTaskFromDropDownMenu,
  pushTaskToFinishedTasksScreen,
  changeTextInputString,
  pushTaskToTasksScreen,
  changeIsLongPressForFinishedScreen,
  pushToShopScreen,
  changeDate,
  changeDateInputStringForFinishedTasks,
  changeTaskBoxValue,
  changeDateInputString,
  changeTaskPressConditionOnFinishedTaskScreen,
  changeTaskPressCondition,
  changeSearchMode,
  updateForFirstTime,
  updateForSecondTime,
  updateForSecondTimeOnFinishedTaskScreen,
  updateForThirdTime,
  updateForFourthTime,
  updateForFifthTime,
  updateForSixTime,
  updateForSevenTime,
  updateForEightTime,
  changeTaskTypeOnLongPressOnFinishedTaskScreen,
  changeTaskTypeOnPressOnFinishedTaskScreen,
  changeTaskTypeOnLongPress,

} = taskSlice.actions;

export default taskSlice.reducer;
