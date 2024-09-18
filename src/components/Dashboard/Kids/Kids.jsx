import { useState } from 'react';

import KidForm from '@components/KidsInfo/KidForm';

import AddFirstKid from './AddFirstKid';

const Kids = () => {
  const [kidForm, openKidForm] = useState(false);

  return (
    <>
      {
        kidForm ? <KidForm /> : <AddFirstKid openKidForm={openKidForm} />
      }
    </>
  );
};
export default Kids;
