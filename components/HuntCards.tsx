import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface Hunt {
  id: string | number;
  title?: string;
  description?: string;
  link?: string;
}

interface HuntCardsProps {
  hunts: Hunt[];
  inputPlaceholder?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
}

export const HuntCards: React.FC<HuntCardsProps> = ({
  hunts,
  inputPlaceholder = "Enter code to unlock",
  onInputChange,
  onButtonClick,
}) => {
  return (
    <div>
      {hunts.slice(0, 2).map((hunt, index) => (
        <div
          key={hunt.id}
          className="rounded-tl-2xl rounded-tr-2xl p-4 text-white bg-gradient-to-b from-[#3737A4] to-[#0C0C4F]"
        >
          <div className="text-right text-[#B3B3E5] text-sm mb-2">{index + 1}/10</div>
          <h3 className="text-lg font-bold mb-2">
            {hunt.title || (index === 0 ? "Title of the hunt" : "What is the fastest bird?")}
          </h3>
          <p className="text-sm opacity-90 mb-4">
            {hunt.description || (index === 0 && "Description")}
          </p>
          {index === 0 ? null : (
            hunt.link ? (
              <Image src={hunt.link} alt="Logo" width={96} height={96} />
            ) : null
          )}
        </div>
      ))}

      <div className="bg-white flex gap-2 p-6 rounded-bl-2xl rounded-br-2xl">
        <Input
          placeholder={inputPlaceholder}
          className="flex-1 px-4 py-2 rounded-full"
          onChange={onInputChange}
        />
        <Button
          className="bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] hover:bg-purple-700 text-white px-6 py-2 rounded-xl"
          onClick={onButtonClick}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};