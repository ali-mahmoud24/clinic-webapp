import { useState, useEffect, useContext } from 'react';

import AppointmentItem from './AppointmentItem';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

import AuthContext from '../../shared/context/auth-context';

import classes from './AppointmentList.module.css';

const AppointmentsList = () => {
  const [loadedAppointments, setLoadedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token, isAdmin } = useContext(AuthContext);

  const appointmentDeletedHandler = (deletedAppointmentId) => {
    setLoadedAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      )
    );
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      let url;
      if (isAdmin) {
        url = `${process.env.REACT_APP_BACKEND_URL}/admin/appointments`;
      } else {
        url = `${process.env.REACT_APP_BACKEND_URL}/appointments`;
      }

      try {
        setIsLoading(true);
        const response = await fetch(url, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();

        setIsLoading(false);

        // console.log(data.appointments);
        setLoadedAppointments(data.appointments);
      } catch (err) {
        setIsLoading(false);
        // console.log(err);
      }
    };
    fetchAppointments();
  }, [token, isAdmin]);

  const appointmentsList = loadedAppointments.map((appointment) => (
    <AppointmentItem
      key={appointment._id}
      id={appointment._id}
      doctorName={`${appointment.doctorId.firstname} ${appointment.doctorId?.secondname}`}
      speciality={appointment.doctorId.specialization}
      date={appointment.date}
      time={appointment.time}
      onDelete={appointmentDeletedHandler}
    />
  ));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (appointmentsList.length === 0) {
    return (
      <div className="center">
        <h1>No Appointemnts found!</h1>
      </div>
    );
  }

  return <ul className={classes.list}>{appointmentsList}</ul>;
};

export default AppointmentsList;
