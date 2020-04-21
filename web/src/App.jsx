/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { withStyles } from '@material-ui/styles';

import {
  getEmployeeList as getEmployeeListAction, updateSurverys as updateSurveysAction,
} from './redux/emp/emp.actions';

import 'react-toastify/dist/ReactToastify.css';

const style = () => ({
  header: { flexDirection: 'column' },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount = () => {
    const { getEmployeeList } = this.props;

    getEmployeeList();
  }

  handleChange = (e) => {
    const { target: { name, value } } = e;
    const { empList } = this.props;

    this.setState({ [name]: value });

    if (value) {
      const emp = empList.find((d) => d.id === parseInt(value, 10));
      this.setState({ assignedSurveys: JSON.parse(emp.assigned_surveys) });
    }
  }

  toggle = (flag) => (e) => {
    const { assignedSurveys } = this.state;
    try {
      const sid = parseInt(e.target.getAttribute('name'), 10);

      if (flag) this.setState({ assignedSurveys: assignedSurveys.concat({ id: sid }) });
      else this.setState({ assignedSurveys: assignedSurveys.filter((d) => d.id !== sid) });
    } catch (err) {
      console.log(err);
    }
  }

  getSurveys = () => {
    const { surveys } = this.props;
    const { assignedSurveys } = this.state;
    const notAssignedSurveys = [];


    if (!assignedSurveys) return notAssignedSurveys;

    surveys.forEach((d) => {
      const survey = assignedSurveys.find((s) => s.id === d.id);

      if (survey) return;

      notAssignedSurveys.push(d);
    });

    return notAssignedSurveys;
  }

  submit = () => {
    const { empName, assignedSurveys } = this.state;
    const { updateSurveys } = this.props;

    updateSurveys(empName, assignedSurveys);
  }

  render = () => {
    const {
      classes, loading, empList,
    } = this.props;
    const { empName, assignedSurveys } = this.state;
    const notAssignedSurveys = this.getSurveys();

    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className={`column is-full ${classes.header}`}>
              <h1 className="content is-medium">Select Employee</h1>
              <div className="control">
                <div className={`select ${loading ? 'is-loading' : ''}`}>
                  <select onChange={this.handleChange} name="empName" value={empName}>
                    <option>Select an employee</option>
                    {empList.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <nav className="panel">
                <p className="panel-heading">
                  Survey List
                </p>
                {notAssignedSurveys.map((d) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <label className="panel-block" key={d.id} onClick={this.toggle(true)} name={d.id}>
                    {`Survey ${d.id}`}
                  </label>
                ))}
              </nav>
            </div>
            <div className="column is-half">
              <nav className="panel">
                <p className="panel-heading">
                  Assigned Surveys
                </p>
                {(assignedSurveys || []).map((d) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <label className="panel-block" key={d.id} onClick={this.toggle(false)} name={d.id}>
                    {`Survey ${d.id}`}
                  </label>
                ))}
              </nav>
            </div>
          </div>
          <div className="columns">
            <div className="column is-full">
              <button className="button is-black" type="button" onClick={this.submit}>Done</button>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-right" hideProgressBar />
      </section>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  empList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  surveys: PropTypes.arrayOf(PropTypes.shape({})),
  getEmployeeList: PropTypes.func.isRequired,
  updateSurveys: PropTypes.func.isRequired,
};

App.defaultProps = {
  loading: false,
  empList: [],
  surveys: [],
};

const mapStateToProps = (state) => {
  const {
    emp: {
      loading, empList, assignedSurveys, surveys,
    },
  } = state;

  return {
    loading, empList, assignedSurveys, surveys,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEmployeeList: () => dispatch(getEmployeeListAction()),
  updateSurveys: (empId, assignedSurveys) => dispatch(updateSurveysAction(empId, assignedSurveys)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(App));
