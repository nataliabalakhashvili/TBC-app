export enum Genders {
  Female = 1,
  Male = 2,
}

export const GenderTitles = [
  { value: Genders.Female, label: "მდედრ." },
  { value: Genders.Male, label: "მამრ." },
];

export function getGender(gender: number): string {
  switch (gender) {
    case Genders.Female: {
      return "მდედრ.";
    }
    case Genders.Male: {
      return "მამრ.";
    }
    default:
      return "";
  }
}
