import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

import classes from './DoctorItem.module.css';

const DoctorItem = (props) => {
  const { imageUrl, name, speciality, experience } = props;

  const { isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  const deleteDoctorHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/doctors/${props.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToEdit = () => {
    navigate(`/doctors/${props.id}`);
  };

  return (
    <li className={classes['list-item']}>
      <Card className={classes.card}>
        <div className={`${classes['image-container']} center`}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${imageUrl}`}
            alt={`Dr. ${name}`}
          />
        </div>

        <section className={classes['card-body']}>
          <article>
            <h3>Dr. {name}</h3>
          </article>

          <article>
            <h4>Speciality:</h4>
            <p>{speciality}</p>
          </article>

          <article>
            <p>{experience} years experience</p>
          </article>

          {!isAdmin && (
            <Button block onClick={props.onBook}>
              book now
            </Button>
          )}

          {isAdmin && (
            <div className={classes.action}>
              <Button inverse onClick={redirectToEdit}>
                edit
              </Button>
              <Button danger onClick={deleteDoctorHandler}>
                delete
              </Button>
            </div>
          )}
        </section>
      </Card>
    </li>
  );
};

export default DoctorItem;
