export const yupDtoValidate = async <T, O>(
  schema: any,
  body: T
): Promise<T> => {
  await schema.validate(body);
  return schema.cast(body, { stripUnknown: true });
};
