import { notifications } from "@mantine/notifications";

type Variant = "default" | "warning";

export const notify = (message: string, variant: Variant = "default") => {
    notifications.show({
        color: variant === "default" ? undefined : "red",
        position: "top-right",
        message,
    })
}