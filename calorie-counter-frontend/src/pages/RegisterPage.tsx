import { useState } from "react";
import "../styles/registerStyles.css";
import { User } from "../utils/types";
import { handleOverflowHeight } from "../utils/handleOverflowHeight";
import { convertHeight, convertWeight } from "../utils/unitConversions";
import ReactInputMask from "react-input-mask";

const RegisterPage = () => {
  // State to store the user's information
  const [user, setUser] = useState<User>({
    name: {
      firstName: "",
      lastName: "",
    },
    dob: "",
    gender: "male",
    height: "",
    weight: "",
    exerciseLevel: "",
  });

  // Check units of height and weight
  const [isMetricWeight, setIsMetricWeight] = useState(true);
  const [isMetricHeight, setIsMetricHeight] = useState(true);

  const toggleHeightUnit = () => {
    setIsMetricHeight(!isMetricHeight);
    setUser({ ...user, height: convertHeight(user.height, isMetricHeight) });
  };

  const toggleWeightUnit = () => {
    setIsMetricWeight(!isMetricWeight);
    setUser({
      ...user,
      weight: convertWeight(user.weight, isMetricWeight),
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setUser({
        ...user,
        [parent]: {
          ...(user[parent as keyof User] as Record<string, string>),
          [child]: value,
        },
      });
    } else {
      setUser({ ...user, [name]: value });
      if (name === "height" && !isMetricHeight) {
        // Validate and reformat after user finishes typing
        if (/^\d+'?\d*"?$/.test(value)) {
          const [feet, inches] = handleOverflowHeight(value);

          // Prevent overflows
          if (feet > 9) {
            setUser({ ...user, [name]: "9'11\"" });
          } else {
            setUser({
              ...user,
              [name]: `${feet}'${inches < 10 ? `0${inches}` : inches}"`,
            });
          }
        }
      }
    }
  };

  return (
    <div className="px-2">
      <h1>Registration</h1>
      <form>
        {/* Names*/}
        <fieldset className="input-row">
          <div className="text-input">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="name.firstName"
              value={user.name.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className="text-input">
            <label htmlFor="LastName">Last Name</label>
            <input
              id="LastName"
              type="text"
              name="name.lastName"
              value={user.name.lastName}
              onChange={handleOnChange}
            />
          </div>
        </fieldset>

        {/* Birthday / Gender */}
        <div className="input-row">
          <div className="text-input">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleOnChange}
            />
          </div>
          <div className="text-input">
            <p>Gender</p>
            <fieldset className="flex items-center space-x-4">
              <div>
                <label htmlFor="male" className="mr-2">
                  Male
                </label>
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label htmlFor="female" className="mr-2">
                  Female
                </label>
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleOnChange}
                />
              </div>
            </fieldset>
          </div>
        </div>

        {/* Weight/ Height */}
        <fieldset className="input-row">
          <div className="text-input">
            <label htmlFor="height" className="pb-1">
              <span>Height in </span>
              <button
                type="button"
                onClick={toggleHeightUnit}
                className="bg-blue-500 text-white rounded-sm px-1"
              >
                {isMetricHeight ? "cm" : "ft'in\""}
              </button>
            </label>
            <ReactInputMask
              id="height"
              name="height"
              type="text"
              mask={isMetricHeight ? "999" : "9'99\""}
              placeholder={isMetricHeight ? "e.g., 170" : "e.g., 5'11\""}
              value={user.height}
              onChange={handleOnChange}
            />
          </div>
          <div className="text-input">
            <label htmlFor="weight" className="pb-1">
              <span>Weight in </span>
              <button
                type="button"
                onClick={toggleWeightUnit}
                className="bg-blue-500 text-white rounded-sm px-1"
              >
                {isMetricWeight ? "kg" : "lbs"}
              </button>
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              placeholder={isMetricWeight ? "e.g., 36" : "e.g., 155"}
              value={user.weight}
              onChange={handleOnChange}
            />
          </div>
        </fieldset>
        <button type="submit" className="bg-blue-500 text-white rounded-sm p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
