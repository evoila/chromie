import * as motion from "framer-motion/client";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/elements/button";
import { variants } from "@/components/motion-variants";
import { validateRequest } from "@/lib/auth";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) return;

  return (
    <motion.div
      animate="animate"
      className="flex h-full w-1/2 flex-col justify-center gap-12"
      initial="initial"
      variants={variants("down")}
    >
      <h1 className="text-3xl font-semibold">
        Hi, {user.firstName} {user.lastName}!
      </h1>
      <div className="w-2/3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, minima
        amet deserunt est doloribus, quidem natus aut architecto exercitationem
        laboriosam ipsum beatae consequuntur cumque illum! Voluptates atque
        veritatis soluta consectetur.
      </div>
      <div className="flex w-2/3 flex-col gap-3 self-end">
        <Link href="/dashboard/create/appointment" prefetch>
          <Button border className="w-full" intent="light">
            Termin
          </Button>
        </Link>
        <Link href="/dashboard/create/question" prefetch>
          <Button border className="w-full" intent="light">
            Frage
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
