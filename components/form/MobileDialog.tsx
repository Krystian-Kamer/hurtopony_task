'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DiscoverForm from './DiscoverForm';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MobileDialog = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleValueChange = (val: string) => {
    setValue(val === value ? undefined : val);
  };

  const closeAccordion = () => {
    setValue('');
  };

  return (
    <div className='md:hidden w-full z-10 absolute bg-white border-b border-x drop-shadow-sm'>
      <div className='flex items-center justify-between'>
        <Accordion
          type='single'
          value={value}
          onValueChange={handleValueChange}
          collapsible
          className='w-full'
        >
          <AccordionItem value='item-1' className='border-b-0'>
            <AccordionTrigger className='hover:no-underline tracking-wider px-8 text-black/55 py-3 text-lg md:text-2xl font-normal'>
              Or filter by
            </AccordionTrigger>
            <AccordionContent>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='px-10 sm:px-24'
              >
                <DiscoverForm closeAccordion={closeAccordion} />
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default MobileDialog;
