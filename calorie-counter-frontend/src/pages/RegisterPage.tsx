import { useState } from "react";
import "../styles/registerStyles.css";
import { convertHeight, convertWeight } from "../utils/unitConversions";
import { InputMask } from "@react-input/mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Path, useForm } from "react-hook-form";
import { userSchema, UserSchemaType } from "../utils/schema/userSchema";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: {
        firstName: "",
        lastName: "",
      },
      dob: "",
      gender: "male",
      height: "0",
      weight: 0,
    },
  });

  // Check units of height and weight
  const [isMetricWeight, setIsMetricWeight] = useState(true);
  const [isMetricHeight, setIsMetricHeight] = useState(true);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target;

    setValue(name as Path<UserSchemaType>, value);
  };

  const toggleHeightUnit = () => {
    const currentHeight = watch("height"); // Get the current height value

    // Determine the new format
    const newFormattedHeight = isMetricHeight
      ? convertHeight(currentHeight, true) // Metric to Imperial
      : Math.round(convertHeight(currentHeight, false) as number); // Imperial to Metric

    // Toggle the height unit
    setIsMetricHeight(!isMetricHeight);

    setValue("height", newFormattedHeight.toString());
  };

  const toggleWeightUnit = () => {
    setValue("weight", convertWeight(watch("weight"), isMetricWeight));
    setIsMetricWeight(!isMetricWeight);
  };

  const onSubmit = (data: FieldValues) => {
    console.log("Form Submitted", data);

    const newUser = {
      ...data,
      height: /^\d'\d{2}"$/.test(data.height)
        ? convertHeight(data.height, false)
        : parseFloat(data.height),
      weight: isMetricWeight ? data.weight : convertWeight(data.weight, false),
    };

    console.log("Adjusted", newUser);
  };

  return (
    <div className="px-2">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Names*/}
        <fieldset className="input-row">
          <div className="text-input">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              {...register("name.firstName")}
              onBlur={handleOnBlur}
            />
            {errors.name?.firstName && (
              <p className="text-red-500">{errors.name.firstName.message}</p>
            )}
          </div>
          <div className="text-input">
            <label htmlFor="LastName">Last Name</label>
            <input
              id="LastName"
              type="text"
              {...register("name.lastName")}
              onBlur={handleOnBlur}
            />
            {errors.name?.lastName && (
              <p className="text-red-500">{errors.name.lastName.message}</p>
            )}
          </div>
        </fieldset>

        {/* Birthday / Gender */}
        <div className="input-row">
          <div className="text-input">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              {...register("dob")}
              onBlur={handleOnBlur}
            />
            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
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
                  type="radio"
                  value="male"
                  {...register("gender")}
                  onBlur={handleOnBlur}
                />
              </div>
              <div>
                <label htmlFor="female" className="mr-2">
                  Female
                </label>
                <input
                  id="female"
                  type="radio"
                  value="female"
                  {...register("gender")}
                  onBlur={handleOnBlur}
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
            <InputMask
              id="height"
              type="text"
              mask={isMetricHeight ? "___" : "_'__\""}
              replacement={{ _: /\d/ }}
              showMask={true}
              placeholder={isMetricHeight ? "e.g., 170" : "e.g., 5'11\""}
              {...register("height")}
              onBlur={handleOnBlur}
            />
            {errors.height && (
              <p className="text-red-500">{errors.height.message}</p>
            )}
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
              type="number"
              placeholder={isMetricWeight ? "e.g., 36" : "e.g., 155"}
              {...register("weight", { valueAsNumber: true })}
              step={"0.01"} // Allow decimals for metric, integers for imperial
              min="0" // Ensure no negative values
              onBlur={handleOnBlur}
            />
            {errors.weight && (
              <p className="text-red-500">{errors.weight.message}</p>
            )}
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
