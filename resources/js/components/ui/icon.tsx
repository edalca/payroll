
import { cn } from "@/lib/utils"
import { bundleIcon, FluentIcon } from "@fluentui/react-icons"

interface IconProps {
    regular: FluentIcon
    filled: FluentIcon
    className?: string,
    fill?: boolean
}
export function Icon({ regular, filled, fill = false, className }: IconProps) {
    const CreateIcon: FluentIcon = bundleIcon(filled, regular)
    return (<CreateIcon fontSize={20} primaryFill={fill ? "#0084d1" : ""} filled={fill}  />)
}
