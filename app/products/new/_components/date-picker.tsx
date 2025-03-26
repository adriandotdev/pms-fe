"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

export function DatePicker({
	field,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field: ControllerRenderProps<any, "expirationDate">;
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						data-cy="expiration-date"
						variant={"outline"}
						className={cn(
							"pl-3 text-left font-normal",
							!field.value && "text-muted-foreground"
						)}
					>
						{field.value ? (
							format(field.value, "yyyy-MM-dd")
						) : (
							<span>Pick a date (optional)</span>
						)}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={field.value}
					onSelect={(date) =>
						date
							? field.onChange(format(date, "yyyy-MM-dd"))
							: field.onChange("")
					}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
