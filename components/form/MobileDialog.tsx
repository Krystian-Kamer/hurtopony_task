'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DiscoverForm from './DiscoverForm';
import SearchForm from './SearchForm';
import { motion } from 'framer-motion';

const MobileDialog = () => {
  return (
    <Accordion type='single' className=' md:hidden w-5/6 z-10 mt-5 rounded-sm absolute bg-white border-2 px-2' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='  hover:no-underline tracking-wider'>
          Search by
        </AccordionTrigger>
        <AccordionContent>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
             className='sm:px-24'
          >
            <SearchForm />
            <p className='text-center italic text-black/50 my-5'>or by</p>
            <DiscoverForm />
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default MobileDialog;
