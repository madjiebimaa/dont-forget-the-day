import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function httpClient(input: RequestInfo | URL, init?: RequestInit) {
  const promise = new Promise<Response>(async (resolve, reject) => {
    try {
      const response = await fetch(input, init);
      if (!response.ok) {
        reject(response);
      }

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  return promise;
}