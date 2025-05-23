"use client";

import { useEffect, useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/_utils/helpers";
import { CtaButton, NavbarData, NavbarMenu } from "./types/NavbarData";
import SubLink from "./elements/SubLinks";
import ButtonActions from "@components/ButtonActions";
import { ButtonSettingsData } from "@components/types";

interface NavbarProps {
  type: number;
  data: NavbarData;
}

interface ActionButtonProps {
  label: string;
  href: string;
}

const Logo = ({ logo }: { logo: string }): JSX.Element => {
  return (
    <div className="flex">
      <a href={`/`} className="-m-1.5 p-1.5">
        <img className="h-[50px] w-auto" src={logo} alt="logo" />
      </a>
    </div>
)};

const BarIcon = ({ onClick }: { onClick: () => void }): JSX.Element => (
  <div className="flex">
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md p-2.5 text-black"
      onClick={onClick}
    >
      <Bars3Icon className="h-8 w-8" aria-hidden="true" />
    </button>
  </div>
);

const CloseIcon = ({ onClick }: { onClick: () => void }): JSX.Element => (
  <button
    type="button"
    className="-m-2.5 rounded-md p-2.5 text-black"
    onClick={onClick}
  >
    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
  </button>
);

const ActionButton: React.FC<ActionButtonProps> = ({ label, href }) => (
  <a
    href={href}
    className="flex items-center gap-1 h-10 py-2 px-3 rounded-lg text-[12px] font-semibold leading-6 text-black bg-primary-600 hover:bg-yellow-500 lg:h-auto lg:gap-2 lg:text-sm"
    target="_blank"
  >
    <i className="pi pi-bolt"></i>
    {label}
  </a>
);

const SearchInput = (): JSX.Element => {
  return (
    <div className="w-full max-w-lg lg:max-w-[400px]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border-0 bg-white py-1.5 pr-10 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search for"
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

const MobileNavBar = ({
  logo,
  menuList,
  buttons,
  setMobileMenuOpen,
  mobileMenuOpen,
  type,
}: {
  logo: string;
  menuList: NavbarMenu[];
  buttons: ButtonSettingsData[];
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
  type: number;
}): JSX.Element => (
  <Dialog
    as="div"
    className="lg:hidden"
    open={mobileMenuOpen}
    onClose={setMobileMenuOpen}
  >
    <div className="fixed inset-0 z-[1000]" />
    <Dialog.Panel className="fixed inset-y-0 right-0 z-[1000] w-full overflow-y-auto bg-gray-50 px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <Logo logo={logo} />
        <CloseIcon onClick={() => setMobileMenuOpen(false)} />
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {menuList.map((menuItem, menuIndex) =>
              menuItem.subLinks ? (
                <SubLink
                  type={type}
                  title={menuItem.title}
                  subLinks={menuItem.subLinks}
                  isMobile={true}
                  key={menuIndex}
                />
              ) : (
                <a
                  key={menuIndex}
                  href={menuItem.href}
                  className="block py-2 text-base font-semibold leading-8 text-gray-900"
                >
                  {menuItem.title}
                </a>
              )
            )}
          </div>
          <div className="py-6 space-y-4">
            <SearchInput />
            <ButtonActions buttons={buttons}/>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
);

const NavbarType3: React.FC<NavbarProps> = ({ type, data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  
  const { logo, menuList, isCtaButton, justifyContent, buttons } = data;

  return (
    <header className="bg-gray-50 z-50 relative">
      <nav
        className="mx-auto flex max-w-[1440px] items-center justify-between gap-10 pt-4 pb-5 xl:gap-20 lg:px-6 sm:px-6 px-8"
        aria-label="Global"
      >
        <Logo logo={logo} />

        <div className="flex flex-shrink-0 items-center gap-2 lg:hidden">
          <BarIcon onClick={() => setMobileMenuOpen(true)} />
        </div>
        <Popover.Group
          className={classNames(
            "hidden lg:flex lg:flex-1 lg:gap-x-6 xl:gap-x-12",
            justifyContent ? `justify-${justifyContent}` : "justify-start"
          )}
        >
          {menuList.map((menuItem, menuIndex) =>
            menuItem.subLinks ? (
              <SubLink
                type={type}
                title={menuItem.title}
                subLinks={menuItem.subLinks}
                isMobile={false}
                key={menuIndex}
              />
            ) : (
              <a
                key={menuIndex}
                href={menuItem.href}
                className="flex-shrink-0 text-base font-semibold leading-8 text-gray-900 hover:text-primary-700 transition-all duration-300 ease-in-out"
              >
                {menuItem.title}
              </a>
            )
          )}
        </Popover.Group>
        <div className="hidden lg:flex lg:justify-end lg:items-center lg:gap-6">
          <SearchInput />
          {isCtaButton === "on" && (
            <div className="flex-shrink-0">
              <ButtonActions buttons={buttons} />
            </div>
          )}
        </div>
      </nav>
      <MobileNavBar
        logo={logo}
        menuList={menuList}
        buttons={buttons}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        type={type}
      />
    </header>
  );
};

export default NavbarType3;
