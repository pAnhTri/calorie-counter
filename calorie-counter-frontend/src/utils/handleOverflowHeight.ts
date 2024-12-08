export const handleOverflowHeight = (height: string) => {
  if (height == "") return [0, 0];
  const match = height.match(/^(\d+)'(\d+)"$|^(\d+)'$|^(\d+)"$/); // Match valid formats
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

  return [feet + Math.floor(inches / 12), inches % 12];
};
