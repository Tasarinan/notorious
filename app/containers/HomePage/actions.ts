import { GetState, Dispatch } from '../../reducers/types';

export const RESIZE_SIDEBAR = 'RESIZE_SIDEBAR';
export const RESIZE_MAIN_MENU = 'RESIZE_MAIN_MENU';
export const RESIZE_MIDDLE_MENU = 'RESIZE_MIDDLE_MENU';


export function resizeSidebarAction(currentSize: number, size: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    if( currentSize !== size) {
      console.log("Action: ", size)
      dispatch(
        {
          type: RESIZE_SIDEBAR,
          size
        }
      );

    }

}
}
export function resizeMainMenuAction(currentSize: number, size: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    if( currentSize !== size) {
      console.log("Action: ", size)
      dispatch(
        {
          type: RESIZE_MAIN_MENU,
          size
        }
      );

    }
  };
}
export function resizeMiddleMenuAction(currentSize: number, size: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    if( currentSize !== size) {
      console.log("Action: ", size)
      dispatch(
        {
          type: RESIZE_MIDDLE_MENU,
          size
        }
      );

    }
  };
}