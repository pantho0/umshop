"use client";
import { useSearchParams } from "next/navigation";

const ChangeRole = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("userId"));
  return (
    <div>
      <p>this is role change route</p>
    </div>
  );
};

export default ChangeRole;
