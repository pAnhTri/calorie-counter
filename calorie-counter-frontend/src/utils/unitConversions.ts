export const convertWeight = (weight: number, isMetric: boolean) => {
  // If the weight is in metric units (i.e. grams) return weight in lbs
  // Formula: lbs = kg / 0.45359237 <=> kg = lbs * 453.59237
  if (isMetric) {
    return parseFloat((weight / 0.45359237).toFixed(2));
  } else {
    return parseFloat((weight * 0.45359237).toFixed(2));
  }
};

export const convertHeight = (height: string, isMetric: boolean) => {
  if (isMetric) {
    // Metric to Imperial
    const cm = parseFloat(height); // Convert string to number
    if (cm < 0) throw new Error("Invalid height input");
    const totalInches = cm / 2.54; // 1 inch = 2.54 cm
    const feet = Math.floor(totalInches / 12); // Extract feet
    const inches = Math.round(totalInches % 12); // Remainder as inches
    return inches < 10 ? `${feet}'0${inches}"` : `${feet}'${inches}"`; // Return formatted height
  } else {
    // Imperial to Metric
    if (height == "") return 0;
    const match = (height as string).match(/^(\d+)'(\d+)"$|^(\d+)'$|^(\d+)"$/); // Match valid formats
    if (!match) throw new Error("Invalid height input");

    const feet = match[1]
      ? parseInt(match[1])
      : match[3]
      ? parseInt(match[3])
      : 0; // Extract feet if present

    const inches = match[2]
      ? parseInt(match[2])
      : match[4]
      ? parseInt(match[4])
      : 0; // Extract inches

    const cm = (feet * 12 + inches) * 2.54; // Convert to cm
    return cm;
  }
};
