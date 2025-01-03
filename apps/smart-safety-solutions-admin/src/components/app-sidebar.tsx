'use client';
import { images } from '@smart-safety-solutions/assets';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@smart-safety-solutions/components';
import { ChartArea, Radar, Settings, SquareUser } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

const AppSidebar: FunctionComponent = () => {
  return (
    <Sidebar className="border-0 border-gray-200 bg-neutral-50">
      <SidebarHeader className="bg-white border-b border-gray-200 px-4 py-3.5">
        <Image
          height={40}
          src={images.SmartSafetySolutionsLogo}
          alt="Smart Safety Solutions Logo"
          priority
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="home">
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <ChartArea />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key="assets">
                <SidebarMenuButton asChild>
                  <div>
                    <SquareUser />
                    <span>Assets</span>
                  </div>
                </SidebarMenuButton>

                <SidebarMenuSub className="border-gray-300">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="#">Devices</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="#">Crews</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="#">Employees</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem key="monitor">
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Radar />
                    <span>Monitor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key="settings">
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
