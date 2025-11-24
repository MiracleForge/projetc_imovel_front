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

export type TurnstileContract = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  ["error-codes"]: string[];
  action: string;
  cdata: string;
  metadata?: {
    ephemeral_id: string;
  };
};

