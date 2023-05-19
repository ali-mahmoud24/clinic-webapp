import Button from '../../../shared/components/FormElements/Button';

import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <>
      <section className={classes.hero}>
        <div className={classes['hero-banner']}>
          <h1>welcome to okdac clinic</h1>
          <p>
            Book in-person or video consultations with your doctor now and Find
            out why 100s of healthcare providers choose Okadoc to help them
            provide better health outcomes.
          </p>
          <Button to="/doctors">book now</Button>
        </div>
      </section>
    </>
  );
};

export default StartingPageContent;
