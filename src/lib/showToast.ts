import { toast } from "sonner"

export const showToast = (message:string) => toast(message, {
    action: {
        label: "x",
        onClick: () => console.log("Toast closed"),
    },
});
