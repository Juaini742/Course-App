import { useForm } from "react-hook-form";
import { Button, Paragraph } from "../atoms";
import { NimType } from "../../types";
import { useMutation, useQuery } from "react-query";
import { getAllNims, verifyNim } from "../../utils";

function NimScreen() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<NimType>();
  const { data } = useQuery<NimType[]>("getAllNims", getAllNims);
  const mutation = useMutation((data: NimType) => verifyNim(data), {
    onError: () => {
      setError("root", {
        message: "Your nim is wrong, please try again",
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutation.mutate(data);
    if (mutation.isSuccess) {
      await verifyNim(data);
    }
  });
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="border border-black rounded-lg w-[90%] md:w-[500px] p-5 flex flex-col justify-center items-center">
        <div className="w-32 flex justify-center overflow-hidden">
          <img src="../images/register.svg" alt="register" />
        </div>

        <div>
          <Paragraph variant="title">Welcome to UkomUniversity</Paragraph>
          <div className="w-full mt-3">
            <select className="w-full border border-black px-3 py-2  outline-none">
              <option value="">Choose you nim</option>
              {data?.map((item) => (
                <option key={item.nim} value={item.nim}>
                  {item.nim} {item.User !== null && "Has been used"}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-center mt-3">
            Please inter your nim bellow this fill
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-5 w-10/12 flex flex-col gap-2">
          {errors.root && (
            <span className="text-[10px] text-red-600 text-center">
              {errors.root?.message}
            </span>
          )}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="emial"
              className="text-sm font-prociono text-center"
            >
              Nim
            </label>
            <input
              {...register("nim")}
              type="password"
              id="emial"
              className="border border-black h-10 pl-4 text-sm font-prociono"
              required
            />
            {errors.nim && (
              <span className="text-[9px] text-red-600">
                {errors.nim.message}
              </span>
            )}
          </div>
          <div>
            <Button
              disabled={mutation.isLoading}
              variant="secondary"
              className="w-full py-2 text-sm"
            >
              {mutation.isLoading ? "Loading.." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default NimScreen;
