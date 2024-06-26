import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Paragraph} from "../atoms";
import {Link} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormFieldsLogin, schema} from "../../types";

export const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormFieldsLogin>({
    resolver: zodResolver(schema),
  });

  // const onSubmit = handleSubmit((data) => {
  //   try {
  //     alert("asdkj");
  //     console.log(data);
  //   } catch (error) {
  //     setError("root", {
  //       message: "There is something wrong",
  //     });
  //   }
  // });

  const hanldeSubmit: SubmitHandler<FormFieldsLogin> = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // mutation.mutate(data);
      // Swal.fire("Registration succesfully!").then(() => {
      //   navigate("/login");
      // });
      alert("asdkj");
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="border border-black rounded-lg w-[90%] md:w-[500px] p-5 flex flex-col justify-center items-center">
        <div className="w-32 flex justify-center overflow-hidden">
          <img src="../images/register.svg" alt="register" />
        </div>
        <div>
          <Paragraph variant="title">Login Form</Paragraph>
          <p className="text-[11px] text-center mt-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
            praesentium sunt neque atque unde omnis. Quia eum voluptates soluta
            nisi mollitia.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(hanldeSubmit)}
          className="mt-5 w-10/12 flex flex-col gap-2"
        >
          {/* {errors.root && (
            <span className="text-[10px] text-red-600">
              {errors.root?.message}
            </span>
          )} */}
          <div className="flex flex-col gap-1">
            <label htmlFor="emial" className="text-sm font-prociono">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="emial"
              className="border border-black h-10 pl-4 text-sm font-prociono"
              required
            />
            {errors.email && (
              <span className="text-[9px] text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-prociono">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="border border-black h-10 pl-4 text-sm font-prociono"
              required
            />
            {errors.password && (
              <span className="text-[9px] text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <span className="text-[10px]">
              Dont't have account{" "}
              <Link to="/register" className="text-red-600">
                register here
              </Link>
            </span>
            <Button
              disabled={isSubmitting}
              variant="secondary"
              className="w-full py-2 text-sm"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
