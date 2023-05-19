import { useContext, useState } from 'react';

import Modal from '../../shared/components/UI/Modal';
import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

import DateTimePicker from 'react-datetime-picker';

import classes from './AppointmentForm.module.css';

const AppointmentForm = ({ doctorId, onClose }) => {
  const [time, setTime] = useState(new Date());
  const { userId, token } = useContext(AuthContext);

  const addAppointmetHandler = async (event) => {
    event.preventDefault();

    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-appointment`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ time, userId, doctorId }),
      });

      onClose();
    } catch (err) {}
  };

  return (
    <Modal onClose={onClose}>
      <Card className={classes.card}>
        <h2>Select date and time: </h2>
        <form onSubmit={addAppointmetHandler}>
          <div className="center">
            <DateTimePicker
              onChange={setTime}
              value={time}
              required
              minDate={new Date()}
              dayPlaceholder="dd"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              disableClock
            />
          </div>

          <div className={classes.actions}>
            <Button onClick={onClose}>Close</Button>
            <Button type="submit">Book Appointment</Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};

export default AppointmentForm;
