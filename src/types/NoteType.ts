export default interface NoteType {
  id: string;
  address: string | null;
  rooms: number | null;
  level: number | null;
  outOfLevels: number | null;
  square: number | null;
  price: number | null;
  status: string;
  title: string | null;
  description: string | null;
  source: string;
  image: string | null;
  url: string;
  contactPrimary: string | null;
  phoneNumberPrimary: string | null;
  contactSecondary: string | null;
  phoneNumberSecondary: string | null;
  comments: string | null;
  // createdAt: string;
  // updatedAt: string;
}
