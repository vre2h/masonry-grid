import React from "react";
import styled from "styled-components";
import { Photo } from "../types/Photo";

interface PhotoDetailProps {
  photo: Photo;
  onBack: () => void; // Callback for back button
}

const PhotoDetail: React.FC<PhotoDetailProps> = ({ photo, onBack }) => {
  return (
    <DetailContainer>
      <BackButton onClick={onBack}>Back</BackButton>
      <PhotoImage src={photo.src.large} alt={photo.alt || "Photo"} />
      <PhotoInfo>
        <h2>{photo.alt || "Untitled"}</h2>
        <p>
          <strong>Photographer:</strong> {photo.photographer}
        </p>
        <p>
          <strong>Date Taken:</strong> {photo.date_taken || "Unknown"}
        </p>
      </PhotoInfo>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const BackButton = styled.button`
  align-self: flex-start;
  margin-bottom: 16px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PhotoImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PhotoInfo = styled.div`
  text-align: center;

  h2 {
    margin: 8px 0;
  }

  p {
    margin: 4px 0;
  }
`;

export default PhotoDetail;
