import { Button, ButtonProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, InternalForwardRefRenderFunction, NavbarItem } from "@nextui-org/react"
import { FC } from "react"

interface NavbarMenuButtonProps {
    title: string
    items: string[]
}

export const NavbarMenuButton: FC<NavbarMenuButtonProps> = ({ title, items }) => {
    return (
        <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        className="bg-transparent data-[hover=true]:bg-transparent border-b border-transparent data-[hover=true]:border-primary data-[hover=true]:border-b-1 text-md uppercase"
                        variant="light"
                        radius="none"
                    >
                        {title}
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label={title}
                className="w-[340px]"
                itemClasses={{
                    base: "gap-4",
                }}
            >
                {items.map((item) => (
                    <DropdownItem
                        key={item}
                    >
                        {item}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}