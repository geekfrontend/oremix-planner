"use client";

import { ChevronsUpDown, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useUserStore();
  const { clearUser } = useUserStore();
  const router = useRouter();
  const [openAccount, setOpenAccount] = useState(false);
  const name = user?.name || user?.email || "User";
  const email = user?.email || "";
  const role = user?.role || "USER";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={`https://avatars.githubusercontent.com/u/124599?v=4`}
                  alt={name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`https://avatars.githubusercontent.com/u/124599?v=4`}
                    alt={user?.name || "Shadcn"}
                  />
                  <AvatarFallback className="rounded-lg">U</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => setOpenAccount(true)}>
                <User />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={async () => {
                await signOut(auth);
                clearUser();
                router.replace("/login");
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <Dialog open={openAccount} onOpenChange={setOpenAccount}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Detail akun pengguna</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage
                  src={`https://avatars.githubusercontent.com/u/124599?v=4`}
                  alt={name}
                />
                <AvatarFallback className="rounded-lg">U</AvatarFallback>
              </Avatar>
              <div className="grid text-sm">
                <span className="font-medium">{name}</span>
                <span className="text-muted-foreground">{email}</span>
              </div>
            </div>
            <div>
              <p className="">{role}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarMenu>
  );
}
