import { soke } from "../lib/index";

describe("check soke", () => {
  test("check fn error", async () => {
    const schema = soke.object({
      name: soke.string().min(2, "to min").max(10, "to max"),
      email: soke.string().email("need a email"),
      phone: soke
        .string()
        .required("need input phone")
        .chinaPhone("phone formart error"),
      code: soke.string("need input code").required().matches(/^\d+$/).len(6),
      agree: soke.bool().required("need click agree"),
      password: soke
        .string()
        .required("need input password")
        .passwordStrong("password is too weak"),
      passwordAgain: soke
        .string("password again need equal to password")
        .required()
        .equalByKey("password"),
    });
    const errors = schema.validate({
      name: "a",
      phone: "133",
      code: "11",
      password: "123",
      passwordAgain: "456",
    });

    expect(errors).toEqual({
      name: "to min",
      email: "need a email",
      phone: "phone formart error",
      code: "need input code",
      agree: "need click agree",
      password: "password is too weak",
      passwordAgain: "password again need equal to password",
    });
    const err = schema.firstError(errors);
    expect(err).toEqual("to min");
  });
  test("check in key", async () => {
    const schema = soke.object({
      phone: soke
        .string()
        .required("need input phone")
        .chinaPhone("phone formart error"),
      code: soke.string("need input code").required().number().len(6),
      agree: soke.bool().required("need click agree"),
      password: soke
        .string()
        .required("need input password")
        .passwordStrong("password is too weak"),
      passwordAgain: soke
        .string("password again need equal to password")
        .required()
        .equalByKey("password"),
    });
    const errors = schema.validate(
      {
        phone: "133",
        code: "11",
        password: "123",
        passwordAgain: "456",
      },
      "password"
    );
    expect(errors).toEqual({
      password: "password is too weak",
    });

    const err = schema.firstError(errors);
    expect(err).toEqual("password is too weak");

    try {
      schema.throwFirstError(errors);
    } catch (err) {
      expect(err).toEqual(Error("password is too weak"));
    }
  });
  test("check array", async () => {
    const schema = soke.object({
      anime: soke
        .array("type need a array")
        .required("need input phone")
        .min(2, "to min")
        .pick(["dog", "fish", "cat"], "pick warn"),
    });
    {
      const errors = schema.validate({
        anime: "dog",
      });
      expect(errors).toEqual({
        anime: "type need a array",
      });
    }
    {
      const errors = schema.validate({
        anime: ["cat"],
      });
      expect(errors).toEqual({
        anime: "to min",
      });
    }
    {
      const errors = schema.validate({
        anime: ["cat", "fish2"],
      });
      expect(errors).toEqual({
        anime: "pick warn",
      });
    }
    {
      const errors = schema.validate({
        anime: ["cat", "fish"],
      });
      expect(errors).toEqual({
        anime: "",
      });
      // throw "aa";
    }
  });
  test("check fn dto", async () => {
    const schema = soke.object({
      name: soke.string().min(2, "to min").max(10, "to max"),
      email: soke.string().email("need a email"),
      phone: soke
        .string()
        .required("need input phone")
        .chinaPhone("phone formart error"),
      code: soke.string("need input code").required().matches(/^\d+$/).len(6),
      agree: soke.bool().required("need click agree"),
      password: soke
        .string()
        .required("need input password")
        .passwordStrong("password is too weak"),
      passwordAgain: soke
        .string("password again need equal to password")
        .required()
        .equalByKey("password"),
    });

    try {
      const errors = schema.dto({
        name: "a",
        phone: "133",
        code: "11",
        password: "123",
        passwordAgain: "456",
      });
    } catch (err) {
      expect(err).toEqual(new Error("to min"));
    }

    const value = {
      name: "aaa",
      phone: "13333333333",
      email: "mail@qqq.com",
      code: "666666",
      password: "123123Qwe",
      passwordAgain: "123123Qwe",
      agree: true,
      cat: "123123Qwe",
    };
    let v2 = schema.dto(value);
    expect(value).toEqual({
      name: "aaa",
      phone: "13333333333",
      email: "mail@qqq.com",
      code: "666666",
      password: "123123Qwe",
      passwordAgain: "123123Qwe",
      agree: true,
    });

    expect(v2).toEqual(value);
  });

  test("check min max", async () => {
    const schema = soke.object({
      name: soke.string().min(2, "to min").max(4, "to max"),
      age: soke.number("need number").min(4, "to min").max(6, "to max"),
    });

    {
      const errors = schema.validate({
        name: "a",
        age: 100,
      });

      expect(errors).toEqual({
        name: "to min",
        age: "to max",
      });
    }
    {
      const errors = schema.validate({
        name: "aa",
        age: 4,
      });

      expect(errors).toEqual({
        name: "",
        age: "",
      });
    }
    {
      const errors = schema.validate({
        name: "aaaa",
        age: 6,
      });

      expect(errors).toEqual({
        name: "",
        age: "",
      });
    }
    {
      const errors = schema.validate({
        name: "aaaaa",
        age: 7,
      });

      expect(errors).toEqual({
        name: "to max",
        age: "to max",
      });
    }
  });
});
