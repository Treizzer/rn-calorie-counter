export type RootStackParams = {
  Home: undefined;
  AddFood: undefined;
};

export type Meal = {
  calories: string;
  name: string;
  portion: string;
  date?: string; //Is an optional parameter
};

export type TodayCaloriesProps = {
  total?: number | string;
  consumed?: number | string;
  remaining?: number | string;
  percentage?: number;
};

export type TodayMealsProps = {
  foods: Meal[];
  onCompleteRemove?: () => void;
};

//This does an union of "Meal" with others parameters
export type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteRemove?: () => void;
  itemPosition?: number;
};