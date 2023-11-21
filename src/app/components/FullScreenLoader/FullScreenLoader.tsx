import classes from "@src/app/components/FullScreenLoader/FullScreenLoader.module.scss";
import { Loader } from "@src/app/components/Loader/Loader";

export const FullScreenLoader = () => {
  return (
    <div className={classes.container}>
      <Loader size={100} />
    </div>
  );
};
