export type actionResponse<Data = unknown> = {
  message: string;
  error?: string;
  data?: Data;
}

export const initialState: actionResponse = {
  message: "",
  error: undefined,
  data: undefined,
};



