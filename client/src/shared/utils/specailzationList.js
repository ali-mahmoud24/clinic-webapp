import React from 'react';

const OPTIONS_LIST = [
  'Obstetrics and gynecology',
  'Cardiothoracic surgery',
  'Surgery',
  'Allergy and immunology',
  'Anesthesiology',
  'Dermatology',
  'Diagnostic radiology',
  'Emergency medicine',
  'Family medicine',
  'Internal medicine',
  'Medical genetics',
  'Neurology',
  'Nuclear medicine',
  'Ophthalmology',
  'Pathology',
  'Pediatrics',
  'Physical medicine and rehabilitation',
  'Preventive medicine',
  'Psychiatry',
  'Radiation oncology',
  'Urology',
];

export const specalizationOptions = OPTIONS_LIST.map(option => (
  <option key={Math.random()} value={option}>
    {option}
  </option>
));
