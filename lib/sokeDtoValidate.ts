export const sokeDtoValidate = async <T, O>(
  schema: any,
  body: T
): Promise<T> => {
  return schema.dto(body);
};
