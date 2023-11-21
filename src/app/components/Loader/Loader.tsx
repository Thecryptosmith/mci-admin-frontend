import classes from "@src/app/components/Loader/Loader.module.scss";

type LoaderProps = {
  className?: string;
  size?: number;
  variant?: "primary" | "inverted";
};

export const Loader = (props: LoaderProps) => {
  const { className, size = 50, variant = "primary" } = props;

  return (
    <div
      className={`${classes.spinner} ${classes[variant]} ${className}`}
      style={{
        width: size,
        height: size,
      }}
    ></div>
  );
};
