import * as yup from "yup";

describe("check yup", () => {
  test("check fn error", async () => {
    expect(2).toEqual(2);
  });
  test("check fn error", async () => {
    let schema = yup.object().shape({
      name: yup.string().label("dog"),
    });
  });
});
