export interface Page<T> {
    items: T[];
    totalPages?: number;
    hasNextPage?: boolean;
}