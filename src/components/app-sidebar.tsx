"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CreditCardIcon,
  FolderOpen,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";

export const AppSidebar = () => {
  const menuItems = [
    {
      title: "Main",
      items: [
        {
          title: "WorkFlows",
          icon: FolderOpen,
          url: "/workflows",
        },
        {
          title: "Credentials",
          icon: KeyIcon,
          url: "/credentials",
        },
        {
          title: "Executions",
          icon: HistoryIcon,
          url: "/executions",
        },
      ],
    },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading, subscription } =
    useHasActiveSubscription();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton className="gap-x-4 h-10 px-4" asChild>
            <Link href="/workflows" prefetch>
              <Image src="/logo.svg" alt="Nodebase" height={30} width={30} />
              <span className="font-semibold text-sm">Nodebase</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade To Tooltip"
                className="gap-x-4 px-4 h-10"
                onClick={() => authClient.checkout({ slug: "pro" })}
              >
                <StarIcon className="size-4" />
                <span>Upgrade To Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 px-4 h-10"
              onClick={() => authClient.customer.portal()}
            >
              <CreditCardIcon className="size-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="SignOut"
              className="gap-x-4 px-4 h-10"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                    onError: (ctx) => {
                      toast.error(ctx.error.message);
                    },
                  },
                })
              }
            >
              <LogOutIcon className="size-4" />
              <span>SignOut</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
