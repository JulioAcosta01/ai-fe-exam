import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  Bars3Icon,
  BellIcon,
  Cog8ToothIcon,
  ComputerDesktopIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
export default function Appbar() {
  return (
    <div className="flex justify-between px-4 py-3 bg-[#00695c]">
      <div>
        <Menu>
          <MenuButton className="rounded-md ">
            <Bars3Icon className="md:hidden size-6 text-white" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="bg-white w-52 origin-top-right z-10 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                <PencilIcon className="size-5 group-hover:text-white" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                <Square2StackIcon className="size-5 group-hover:text-white" />
                Duplicate
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                <ArchiveBoxXMarkIcon className="size-5 group-hover:text-white" />
                Archive
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                <TrashIcon className="size-5 group-hover:text-white" />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="inline-flex space-x-3">
        <div>
          <Menu>
            <MenuButton className="rounded-md ">
              <ComputerDesktopIcon className="size-6 text-white" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="bg-white w-52 origin-top-right z-10 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <PencilIcon className="size-5 group-hover:text-white" />
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <Square2StackIcon className="size-5 group-hover:text-white" />
                  Duplicate
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <ArchiveBoxXMarkIcon className="size-5 group-hover:text-white" />
                  Archive
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <TrashIcon className="size-5 group-hover:text-white" />
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div>
          <Menu>
            <MenuButton className="rounded-md ">
              <BellIcon className="size-6 text-white" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="bg-white w-52 origin-top-right z-10 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <PencilIcon className="size-5 group-hover:text-white" />
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <Square2StackIcon className="size-5 group-hover:text-white" />
                  Duplicate
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <ArchiveBoxXMarkIcon className="size-5 group-hover:text-white" />
                  Archive
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <TrashIcon className="size-5 group-hover:text-white" />
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div>
          <Menu>
            <MenuButton className="rounded-md ">
              <Cog8ToothIcon className="size-6 text-white" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="bg-white w-52 origin-top-right z-10 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <PencilIcon className="size-5 group-hover:text-white" />
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <Square2StackIcon className="size-5 group-hover:text-white" />
                  Duplicate
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <ArchiveBoxXMarkIcon className="size-5 group-hover:text-white" />
                  Archive
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <TrashIcon className="size-5 group-hover:text-white" />
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div>
          <Menu>
            <MenuButton className="rounded-md ">
              <ClipboardDocumentListIcon className="size-6 text-white mr-3" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="bg-white w-52 origin-top-right z-10 rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <PencilIcon className="size-5 group-hover:text-white" />
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <Square2StackIcon className="size-5 group-hover:text-white" />
                  Duplicate
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <ArchiveBoxXMarkIcon className="size-5 group-hover:text-white" />
                  Archive
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full text-gray-900 text-lg items-center hover:text-white font-semibold gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                  <TrashIcon className="size-5 group-hover:text-white" />
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
