import {signal} from "@preact/signals-react";

export const specificItemGroupDataIsFetching = signal(false);

export const requestFormIsSubmitting = signal(false);

export const endorserTransactionTab = signal('PENDING')