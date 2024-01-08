import { api } from "@/lib/axios";

export async function useEditTransaction(transactionId: number) {
  const response = await api.get(`/transactions/${transactionId}`);
  return response.data;
}

export async function tetste() {
  const bla = "blaasd";
}
