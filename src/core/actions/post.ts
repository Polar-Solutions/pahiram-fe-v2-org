import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

// Ensure this matches the expected shape
type PostRequestParams<T> = {
  endpoint: string;
  body: T;
  schema: z.ZodSchema<T>;
};

// Adjust the action implementation in your post request
export const postRequestAction = actionClient.action(
  async ({ parsedInput }: { parsedInput?: PostRequestParams<any> }) => {
    // Ensure the action function can handle parsedInput correctly
    if (!parsedInput) {
      throw new Error("Invalid input: expected PostRequestParams.");
    }

    const { endpoint, body, schema } = parsedInput;

    // Ensure schema validation
    const parsedBody = schema.parse(body);

    // Perform the POST request
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedBody),
    });

    if (!response.ok) {
      throw new Error("Failed to perform the post request.");
    }

    return await response.json();
  }
);
