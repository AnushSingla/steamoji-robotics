export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncDataState<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	state: LoadingState;
}

export function createAsyncState<T>(initialData: T | null = null): AsyncDataState<T> {
	return {
		data: initialData,
		loading: false,
		error: null,
		state: 'idle'
	};
}

export async function fetchWithRetry<T>(
	url: string,
	options: RequestInit = {},
	retries: number = 3
): Promise<T> {
	for (let i = 0; i < retries; i++) {
		try {
			const response = await fetch(url, options);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			return data;
		} catch (error) {
			if (i === retries - 1) {
				throw error;
			}
			// Wait before retrying (exponential backoff)
			await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
		}
	}
	
	throw new Error('Max retries exceeded');
}

export function handleAsyncOperation<T>(
	operation: () => Promise<T>,
	state: AsyncDataState<T>,
	onSuccess?: (data: T) => void,
	onError?: (error: string) => void
): Promise<void> {
	state.loading = true;
	state.error = null;
	state.state = 'loading';
	
	return operation()
		.then((data) => {
			state.data = data;
			state.loading = false;
			state.error = null;
			state.state = 'success';
			onSuccess?.(data);
		})
		.catch((error) => {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			state.data = null;
			state.loading = false;
			state.error = errorMessage;
			state.state = 'error';
			onError?.(errorMessage);
		});
}
