import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getKidById } from '@api';

import KidForm from '../KidsInfo/KidForm';

const EditKidForm = () => {
  const { kidId } = useParams();
  const [kidData, setKidData] = useState(null);
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const response = await getKidById(kidId);
        setKidData(response.data.kid);
        console.log('Existing kid data is: ' + JSON.stringify(response.data.kid));
      } catch (error) {
        console.error('Error fetching kid data:', error);
      }
    };
    fetchKidData();
  }, [kidId]);
  if (!kidData) return <p>Loading...</p>;
  return <KidForm kidData={kidData} />;
};
export default EditKidForm;
