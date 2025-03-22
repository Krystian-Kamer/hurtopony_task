'use client'

import Link from "next/link";
import { Button } from "./ui/button";

const BackToHomeBtn = () => {
  return (
    <Button variant='destructive' asChild>
      <Link href='/'>Back to home page</Link>
    </Button>
  );
}
export default BackToHomeBtn