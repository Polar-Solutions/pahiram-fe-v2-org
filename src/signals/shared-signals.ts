import {Signal, signal} from "@preact/signals-react";
import {ITransactionRequest} from "@/lib/interfaces/get-office-transaction-interface";

export const specificItemGroupDataIsFetching = signal(false);

export const requestFormIsSubmitting = signal(false);

export const endorserTransactionTab = signal('PENDING')

export const selectedTransaction: Signal<ITransactionRequest | any> = signal()