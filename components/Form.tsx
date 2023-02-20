import React from "react";
import PropTypes from "prop-types";
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
      <div>
        <label htmlFor="title">Title</label>
        <input
          autoFocus
          id="title"
          {...register("title", { required: true, maxLength: 20 })}
        />
        {errors.title && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <p>
          {typeof count === "string" ? count.length : 0} / {maxLength}
        </p>
        <textarea
          id="description"
          rows={10}
          {...register("description", { required: true, maxLength: maxLength })}
        />
        {errors.description && <span>This field is required</span>}
      </div>

      <input type="submit" className="btn btn-primary" />
    </form>
  );
}

Form.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
