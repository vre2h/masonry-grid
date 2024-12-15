import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhotoDetail from '../components/PhotoDetail';
import { Photo } from '../types/Photo';

const PhotoView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const photo = location.state?.photo as Photo;

  if (!photo) {
    navigate('/');
    return null;
  }

  return <PhotoDetail photo={photo} onBack={() => navigate('/')} />;
};

export default PhotoView;
