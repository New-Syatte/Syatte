'use client'

import Image from 'next/image';
import AppImage from '@/assets/education/category-01.png';

type Props = {
  eduName: string;
  eduDescription: string;
}

export default function EducationCard({eduName , eduDescription} : Props) {
  // console.log(eduName);
  console.log(eduDescription)
  return (
    <section className={'mt-[50px] w-[640px] h-[424px] rounded-b-2xl shadow-2xl'}>
      <Image src={AppImage} width={644} height={260} alt="image" />
      <div className={'ml-[33px] mt-[23px]'}>
        <p className={'text-[30px] font-bold mb-[11px]'}>{eduName}</p>
        <p className={'text-[18px]'}>{ eduDescription }</p>
      </div>
    </section>
  )
}
