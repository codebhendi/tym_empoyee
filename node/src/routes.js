const express = require('express');
const knex = require('./db/connection');

const router = express.Router();

router.get('/employee', async (req, res) => {
  const query = 'select id, name, assigned_surveys from employee where is_activated=1';
  const querySurvey = 'select id from survey';

  try {
    const data = await knex.raw(query);
    const surveys = await knex.raw(querySurvey);
    return res.status(200).json({ message: { empList: data, surveys } });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ messge: 'Error in getting employees' });
  }
});

router.post('/survey/save/:eid', async (req, res) => {
  const { eid } = req.params;
  const { assignedSurveys } = req.body;

  try {
    await knex('employee').update({ assigned_surveys: JSON.stringify(assignedSurveys) }).where({ id: eid });
    return res.status(200).json({ message: 'updated' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Unable to update employee' });
  }
});

router.use('/*', (req, res) => res.status(404).send('not a valid route'));

module.exports = router;
