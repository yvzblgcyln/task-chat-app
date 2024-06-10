import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";

type DataProps = {
  date: string;
  id: number;
  user: string;
  message: string;
};

type ListRowProps = {
  data: DataProps;
  setSelectedList: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function ListRow({ data, setSelectedList }: ListRowProps) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setSelectedList((prevSelectedList) => {
      if (!checked) return [...prevSelectedList, data.id];
      else return prevSelectedList.filter((id) => id !== data.id);
    });
    setChecked(!checked);
  };

  return (
    <div className="border-md shadow-lg px-4 py-2 flex gap-2 justify-between items-center rounded-md">
      <div className="flex flex-row gap-2">
        <input onChange={handleClick} checked={checked} type="checkbox" />
        <Link to={`/${data.id}`} className="w-12">
          <img className="w-full" src="https://isbull.s3.eu-north-1.amazonaws.com/v2/no-image.png" alt="" />
        </Link>
        <div className="flex flex-col gap-1 justify-between">
          <Link to={`/${data.id}`} className="text-sm">
            {data.user}
          </Link>
          <Link to={`/${data.id}`} className="truncate text-sm">
            {data.date} - {data.message}
          </Link>
        </div>
      </div>
      <Link to={`/${data.id}`} className="bg-blue-700 w-8 h-8 text-white  rounded-md">
        <Tooltip title="Mesaj gönder" placement="top">
          <IconButton className="w-8 h-8">
            <FaRegMessage color="white" />
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
}
