import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { readUser } from "@/actions/user";
import { updateResponder } from "@/actions/appointments";
import * as DropdownMenu from "@/components/dropdown-menu";

export interface AssignMeProps {
  id: number;
}

export const AssignMe = React.forwardRef<HTMLDivElement, AssignMeProps>(
  ({ id }, ref) => {
    const { data: user } = useQuery({
      queryKey: ["user"],
      queryFn: async () => await readUser(),
    });

    const queryClient = useQueryClient();

    if (!user) return null;

    const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      try {
        await updateResponder(id, user.id);

        queryClient.invalidateQueries({ queryKey: ["appointment"] });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <DropdownMenu.Item onClick={handleOnClick} ref={ref}>
        Assign Me
      </DropdownMenu.Item>
    );
  },
);

AssignMe.displayName = "AssignMe";
