import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import ListRow from "../components/ListRow";
import ApproveModal from "../components/ApproveModal";
import { useAtom } from "jotai";
import { openModal } from "../helpers/store";

type DataProps = {
  date: string;
  id: number;
  user: string;
  message: string;
};

const initialList: DataProps[] = [
  { date: "10.05.2024", id: 1, user: "Test User", message: "test" },
  { date: "10.05.2024", id: 2, user: "Test User 2", message: "test" },
];

export default function MessageList() {
  const [list, setList] = useState<DataProps[]>(initialList);
  const [filteredList, setFilteredList] = useState<DataProps[]>(initialList);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [open, setOpen] = useAtom(openModal);
  const [approveType, setApproveType] = useState<string>("");

  // search
  const handleSearch = (text: string) => {
    const filteredList = list.filter((item) => item.message.toLowerCase().includes(text.toLowerCase()));
    setFilteredList(filteredList);
  };

  // delete all
  const handleDeleteAll = () => {
    setFilteredList([]);
  };
  const handleDeleteAllButton = () => {
    setOpen(true);
    setApproveType("all");
  };

  //delete selected
  const handleDelete = () => {
    setFilteredList(filteredList.filter((item) => !selectedList.includes(item.id)));
  };
  const handleDeleteButton = () => {
    setOpen(true);
    setApproveType("selected");
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* approve modal */}
      <ApproveModal approveFunction={approveType === "all" ? handleDeleteAll : handleDelete} />

      {/* banner */}
      <div className="rounded-md px-8 py-4 shadow-lg flex flex-row justify-between items-center bg-white">
        <h1 className="text-blue-400">MESAJLAR</h1>
        <div className="flex flex-row gap-2">
          <button
            onClick={handleDeleteAllButton}
            className="border border-red-300 text-red-300 flex flex-row gap-2 items-center rounded-md px-3 py-1"
          >
            <RiDeleteBin6Line />
            <span>Tümünü sil</span>
          </button>
          <button
            onClick={handleDeleteButton}
            className="border border-red-300 text-red-300 flex flex-row gap-2 items-center rounded-md px-3 py-1"
          >
            <RiDeleteBin6Line />
            <span>Seçilenleri sil</span>
          </button>
        </div>
      </div>

      {/* search area */}
      <div>
        <div className="relative border rounded-md flex flex-row items-center gap-2 p-2">
          <CiSearch />
          <input
            type="text"
            placeholder="Mesajlarımda ara"
            className="text-sm w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* message list */}
      <div className="flex gap-2 flex-col">
        {filteredList.map((item) => (
          <ListRow key={item.id} data={item} setSelectedList={setSelectedList} />
        ))}
      </div>
    </div>
  );
}
