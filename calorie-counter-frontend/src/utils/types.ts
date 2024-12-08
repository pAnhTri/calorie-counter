export interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  dob: string;
  gender: "male" | "female";
  height: string;
  weight: string;
  exerciseLevel: string;
}
