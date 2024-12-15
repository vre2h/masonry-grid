export interface Photo {
  id: number;
  alt?: string;
  src: {
    medium: string;
    large: string;
  };
  photographer: string;
  date_taken?: string;
}
