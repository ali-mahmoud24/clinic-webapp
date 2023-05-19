import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';

import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import LaodingSpinner from '../../shared/components/UI/LoadingSpinner';

import useForm from '../../shared/hooks/use-form';

import { specalizationOptions } from '../../shared/utils/specailzationList';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
} from '../../shared/utils/validators';

import classes from './DoctorForm.module.css';

const NewDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      firstname: {
        value: '',
        isValid: false,
      },
      secondname: {
        value: '',
        isValid: false,
      },
      specialization: {
        value: '',
        isValid: false,
      },
      experience: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formState.isValid) {
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append('firstname', formState.inputs.firstname.value);
      formData.append('secondname', formState.inputs.secondname.value);
      formData.append('specialization', formState.inputs.specialization.value);
      formData.append('experience', formState.inputs.experience.value);
      formData.append('image', formState.inputs.image.value);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/add-doctor`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        console.log('res is okayy');
        setIsLoading(false);
        navigate('/doctors', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        id="firstname"
        element="input"
        type="text"
        label="First Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Doctor's First name must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="secondname"
        element="input"
        type="text"
        label="Second Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Doctor's Second name must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="specialization"
        element="select"
        label="Doctor's Specialization"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Doctor's specialization must not be empty."
        onInput={inputHandler}
        options={specalizationOptions}
      />

      <Input
        id="experience"
        element="input"
        type="number"
        label="Doctor's years of Experience"
        validators={[VALIDATOR_MIN(1), VALIDATOR_MAX(50)]}
        errorMessage="Please enter a valid experience (between 1 - 50 years)."
        onInput={inputHandler}
      />

      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      />

      <div className={classes.actions}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LaodingSpinner /> : 'Add Doctor'}
        </Button>
      </div>
    </form>
  );
};

export default NewDoctor;
