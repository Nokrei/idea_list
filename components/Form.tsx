import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  description: string;
};
type Form = {
  submitForm: SubmitHandler<Inputs>;
};

export default function Form({ submitForm }: Form) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const maxLength = 140;
  const count = watch("description");

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="pb-5">
        <label htmlFor="title">Title</label>
        <br />
        <input
          className="w-full rounded bg-slate-100 p-1 focus:bg-slate-200 focus:outline-none"
          autoFocus
          id="title"
          {...register("title", { required: true, maxLength: 20 })}
        />
        {errors.title && <p className="text-red-700">This field is required</p>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <p className="text-end">
          {typeof count === "string" ? count.length : 0} / {maxLength}
        </p>
        <textarea
          className="w-full rounded bg-slate-100 p-1 focus:bg-slate-200 focus:outline-none"
          id="description"
          rows={10}
          {...register("description", { required: true, maxLength: maxLength })}
        />
        {errors.description && (
          <p className="text-red-700">This field is required</p>
        )}
      </div>

      <button
        type="submit"
        className="float-right rounded bg-slate-400 p-1 duration-100 hover:bg-slate-300"
      >
        Submit{" "}
      </button>
    </form>
  );
}
