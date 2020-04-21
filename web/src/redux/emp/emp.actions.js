import { toast } from 'react-toastify';
import Axios from 'axios';
import actionTypes from './emp.types';

export const getEmployeeList = () => async (dispatch) => {
  // options which are to be used to authorize and containing all the data
  // for this request
  const options = {
    url: 'http://localhost:3002/employee',
    method: 'get',
  };

  dispatch({
    type: actionTypes.START_GET_EMP,
  });

  try {
    const { data: { message: { empList, surveys } } } = await Axios(options);
    dispatch({ type: actionTypes.DONE_GET_EMP, empList, surveys });
  } catch (e) {
    console.log(e);
    toast.error('Unable to get employee list');
    dispatch({ type: actionTypes.STOP_GET_EMP });
  }
};

export const updateSurverys = (empId, assignedSurveys) => async (dispatch) => {
  // options which are to be used to authorize and containing all the data
  // for this request
  const options = {
    url: `http://localhost:3002/survey/save/${empId}`,
    method: 'post',
    data: { assignedSurveys },
  };

  dispatch({
    type: actionTypes.START_POST_SURVEY,
  });

  try {
    await Axios(options);
    dispatch({ type: actionTypes.DONE_POST_SURVEY });
  } catch (e) {
    console.log(e);
    toast.error('Unable to update employees');
    dispatch({ type: actionTypes.STOP_POST_SURVEY });
  }
};

export const surveyAction = (sid, flag) => (dispatch) => {
  if (flag) dispatch({ type: actionTypes.ADD_SURVEY, sid });
  else dispatch({ type: actionTypes.REMOVE_SURVEY, sid });
};
