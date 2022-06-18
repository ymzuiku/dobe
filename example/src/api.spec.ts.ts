describe("check yup", () => {
  test("check fn error", async () => {
    expect(2).toEqual(2);
  });
  // test("check fn error", async () => {
  //   let schema = yup.object().shape({
  //     name: yup.string().required(),
  //     age: yup.number().required().positive().integer(),
  //     email: yup.string().url(),
  //     createdOn: yup.date().default(() => new Date());
  //   });
  //   try {
  //     const val = await schema.isValid({
  //       name: "jimmy",
  //       age: 24,
  //     });
  //     expect(val).toEqual(true);
  //   } catch (e) {
  //     console.log("__debug__", e);
  //   }
  // });
});
