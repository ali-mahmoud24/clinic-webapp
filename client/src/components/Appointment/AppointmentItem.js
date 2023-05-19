import { useContext } from 'react';

import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

import classes from './AppointmentItem.module.css';

const AppointmentItem = (props) => {
  const { id: appointmentId, doctorName, speciality, date, time } = props;

  const { isAdmin } = useContext(AuthContext);

  const deleteAppointmentHandler = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/delete-appointment/${appointmentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      console.log(res);
      const data = res.json();
      console.log(data);
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li>
      <Card className={classes.card}>
        <h3>Dr. {doctorName}</h3>

        <article>
          <h4>Speciality:</h4>
          <p>{speciality}</p>
        </article>

        <article className={classes.time}>
          <div>
            <h3>Date: </h3>
            <h4>{date}</h4>
          </div>
          <div>
            <h3>Time: </h3>
            <h4>{time}</h4>
          </div>
        </article>

        {isAdmin && (
          <Button block danger onClick={deleteAppointmentHandler}>
            Delete
          </Button>
        )}
      </Card>
    </li>
  );
};

export default AppointmentItem;
