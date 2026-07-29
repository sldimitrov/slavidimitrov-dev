import { apiClient } from "./client";
import type { ContactPayload } from "../types";

export async function postContactMessage(
  payload: ContactPayload,
): Promise<void> {
  await apiClient.post("/contact/", payload);
}
