import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PencilSquareIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Transition, TransitionChild, Dialog, DialogPanel } from "@headlessui/react";
export default function Drawer() {
  const categories = [
    {
      color: "Dashboard",
      path: "/dashboard",
    },
    {
      color: "All Media",
      path: "/media",
    },
    {
      color: "Account Settings",
      path: "/account_settings",
    },
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function logout() {}

  return (
    <>
      <Transition
        appear={true}
        show={isOpen}
        as={"Fragment"}
      >
        <Dialog
          as="div"
          open={isOpen}
          onClose={close}
          className="fixed inset-0 z-40"
        >
          {/* <TransitionChild 
      > */}
          <div className="md:hidden relative z-10 bg-[#004d40] h-full shrink-0 w-72 border-r border-gray-200">
            <div className="py-3 px-3 bg-[#00695c]">
              <button
                onClick={close}
                type="button"
                className="flex justify-center items-center absolute top-2 right-2 text-white h-8 w-8 hover:bg-gray-400 rounded-full hover:bg-opacity-50"
              >
                <XMarkIcon className="size-6" />
              </button>
              {/* TITLE */}
              <Link to={"/"}>
                <h3 className="text-white font-semibold">Writer Chassis</h3>
              </Link>
            </div>
            <div>
              {/* USER */}
              <div className="py-3 px-3 bg-[#00695c] border-y ">
                <h3 className="text-white font-semibold">
                  {user?.firstname + " " + user?.lastname}
                </h3>
              </div>
            </div>
            <div>
              <div className="py-3 px-3 bg-[#00695c] border-b ">
                <h3 className="text-white font-semibold">Writer Chassis</h3>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-col space-y-1 ">
                {categories.length &&
                  categories.map(category => (
                    <Link
                      to={category.path}
                      className="
                      text-sm font-semibold
                      bg-transparent hover:bg-slate-300 hover:bg-opacity-25 mx-2 py-2 
                      rounded-md text-white"
                      key={category.color}
                    >
                      <span className="pl-2">{category.color}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50"></div>
          {/* </TransitionChild> */}
        </Dialog>
      </Transition>

      {/* DRAWER */}
      <div className="hidden md:block bg-[#004d40] shrink-0 w-64 border-r border-gray-200">
        <div className="py-3 px-3 bg-[#00695c]">
          {/* TITLE */}
          <Link to={"/"}>
            <h3 className="text-white font-semibold">Writer Chassis</h3>
          </Link>
        </div>
        <div>
          {/* USER */}
          <div className="py-3 px-3 bg-[#00695c] border-y flex items-center space-x-2">
            <UserCircleIcon className="w-10 h-10 shrink-0 text-white" />
            <div className="flex-1 flex flex-col">
              <span className="text-white text-sm font-bold ">
                {user?.firstname + " " + user?.lastname}
              </span>
              <span className="text-xs font-semibold text-gray-200">{user?.type}</span>
            </div>
            <div>
              {/* <button className="hover:bg-gray-50 hover:bg-opacity-50 rounded-full"> */}
              <Menu>
                <MenuButton className="rounded-full p-2 hover:bg-gray-50 hover:bg-opacity-50">
                  <ChevronDownIcon className="size-5 shrink-0 text-white" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="bg-white w-56 origin-top-right z-10 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <div className="py-1.5 px-2">
                    <span className="text-gray-400 ">Chassis</span>
                  </div>
                  <MenuItem>
                    <button className="group inline-flex w-full text-gray-900 items-center font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/5">
                      <MagnifyingGlassIcon className="size-5 mr-4 text-blue-600" />
                      Research
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group inline-flex w-full text-gray-900 items-center font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/5">
                      <PencilIcon className="size-5 mr-4 text-green-600" />
                      Writer
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group inline-flex w-full text-gray-900 items-center font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/5">
                      <PencilSquareIcon className="size-5 mr-4 text-blue-900" />
                      Editor
                    </button>
                  </MenuItem>
                  <div className="py-1.5 px-2">
                    <span className="text-gray-400 ">Other Options</span>
                  </div>
                  <MenuItem>
                    <button className="group inline-flex w-full text-gray-900 items-center font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/5">
                      {/* <ArchiveBoxXMarkIcon className="size-5 group-hover:text-white" /> */}
                      Update Profile
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group inline-flex w-full text-red-700 items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-500">
                      {/* <TrashIcon className="size-5 group-hover:text-white" /> */}
                      Exit Chassis
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
              {/* </button> */}
            </div>
          </div>
        </div>
        <div>
          <div className="py-3 px-3 bg-[#00695c] border-b ">
            <h3 className="text-white font-semibold">Writer Chassis</h3>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex flex-col space-y-1 ">
            {categories.length &&
              categories.map(category => (
                <NavLink
                  to={category.path}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          backgroundColor: "rgba(255, 255, 255, .3) ",
                        }
                      : {}
                  }
                  className="
                    text-sm font-semibold
                    bg-transparent hover:bg-slate-300 hover:bg-opacity-25 mx-2 py-2 
                    rounded-md text-white"
                  key={category.color}
                >
                  <span className="pl-2">{category.color}</span>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
