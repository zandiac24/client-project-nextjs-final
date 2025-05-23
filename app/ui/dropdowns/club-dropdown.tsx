'use client'
import { useState, forwardRef, useImperativeHandle } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type ClubDropdownProps = {
  onChange?: (club: string) => void;
};

type RefType = {
  getSelectedClub: () => string;
};


const ClubDropdown = forwardRef<RefType, ClubDropdownProps>((props, ref) => {
    const{ onChange } = props;
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState('Select Club');

    const categories = ['Activism', 'Arts', 'Business', 'Community Service', 'Culture/Identity', 'Hobbies & Games', 'Honor Societies', 'Language', 'Leadership', 'Logic', 'Non-Varsity Sports/Fitness', 'Science/Tech'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (club: string) => {
        setSelectedClub(club);
        setIsOpen(false);
        if (onChange) onChange(club);
    };

    useImperativeHandle(ref, () => ({
        getSelectedClub: () => selectedClub,
    }));

    return (
        <div className="flex">
            <div className="relative inline-block text-left">
                <button
                    type="button"
                    className="flex items-center mb-[10px] justify-center rounded-md mt-[15px] bg-yellow-200 w-[230px] h-[65px] text-sm font-medium hover:bg-yellow-200"
                    onClick={toggleDropdown}
                >
                    {selectedClub}
                    <ChevronDownIcon className="justify-right mr-[10px] w-[20px] h-[20px] ml-2" />
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute
                                    left-0 mt-2 w-56 rounded-md
                                    shadow-lg bg-white ring-1 ring-black
                                    ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {categories.map((club, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2
                                               text-sm text-black
                                               hover:bg-yellow-100"
                                    onClick={() => handleSelect(club)}
                                >
                                    {club}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ClubDropdown;
