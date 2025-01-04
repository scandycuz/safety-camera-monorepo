'use client';
import { images } from '@smart-safety-solutions/assets';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  SidebarTrigger,
} from '@smart-safety-solutions/components';
import { Bell } from 'lucide-react';
import { SessionContext } from '@smart-safety-solutions/contexts';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useContext } from 'react';

const HeaderBar: FunctionComponent = () => {
  const router = useRouter();

  const {
    logOut,
    state: { firstName },
  } = useContext(SessionContext);

  const handleLogout = () => {
    logOut();
    router.push('/login');
  };

  return (
    <div className="flex flex-row items-center justify-end w-full p-4 pr-6 border-b border-gray-200">
      <div className="flex flex-row gap-10 items-center">
        <div className="flex flex-row gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Bell />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <div className="opacity-80">No current notifications</div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <NavigationMenu delayDuration={50}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{firstName}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li>
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" onClick={handleLogout}>
                        Log out
                      </Button>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default HeaderBar;
