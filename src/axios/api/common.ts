export interface Response<Type> {
    data: Type;
    errorMsg: string | null;
    success: boolean;
}
