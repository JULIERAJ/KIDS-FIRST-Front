import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getKidById } from '@api';

import KidForm from '../KidsInfo/KidForm';

const EditKidForm = () => {
  const { kidId } = useParams();
  const navigate = useNavigate();
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

  return <KidForm 
    kidData={kidData} 
    openKidForm={() => navigate('/dashboard/kids')} // Close the form and navigate back
    fetchKidsCount={0}
    setFetchKidsCount={() => {}}
  />;
};
export default EditKidForm;
