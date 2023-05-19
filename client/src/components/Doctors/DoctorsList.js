import { useState, useEffect, useContext } from 'react';

import DoctorItem from './DoctorItem';
import AppointmentForm from '../Appointment/AppointmentForm';
import AuthContext from '../../shared/context/auth-context';

import classes from './DoctorList.module.css';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const DoctorsList = () => {
  const [loadedDoctors, setLoadedDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDoctorId, setCurrentDoctorId] = useState(null);

  const { token } = useContext(AuthContext);

  const doctorDeletedHandler = (deletedDoctorId) => {
    setLoadedDoctors((prevDoctors) =>
      prevDoctors.filter((doctor) => doctor.id !== deletedDoctorId)
    );
  };

  const onBookHandler = (currentDoctorId) => {
    setCurrentDoctorId(currentDoctorId);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/doctors`,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      const data = await response.json();
      setLoadedDoctors(data.doctors);
      setIsLoading(false);
    };
    fetchDoctors();
  }, []);

  const doctorsList = loadedDoctors.map((doctor) => (
    <DoctorItem
      key={doctor._id}
      id={doctor._id}
      imageUrl={doctor.image}
      name={`${doctor.firstname} ${doctor.secondname}`}
      speciality={doctor.specialization}
      experience={doctor.experience}
      onDelete={doctorDeletedHandler}
      onBook={() => onBookHandler(doctor._id)}
    />
  ));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (doctorsList.length === 0) {
    return (
      <div className="center">
        <h1>No Doctors found!</h1>
      </div>
    );
  }

  return (
    <>
      {currentDoctorId && (
        <AppointmentForm
          doctorId={currentDoctorId}
          onClose={() => setCurrentDoctorId(null)}
        />
      )}

      <ul className={classes.list}>{doctorsList}</ul>
    </>
  );
};

export default DoctorsList;
