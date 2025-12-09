import { memo, type FC } from "react";

export const Page404: FC = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl">404 Page</h1>
    </div>
  );
});
