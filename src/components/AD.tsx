import Image from 'next/image';

const AD = () => {
  return (
    <div className="flex w-full justify-center border-b">
      <a
        href={AD_URl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full justify-center"
      >
        <Image
          src={AD_IMG_URL}
          alt="광고"
          width={110}
          height={110}
          className="p-4"
        />
      </a>
    </div>
  );
};

export default AD;

const AD_IMG_URL =
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100';

const AD_URl = 'https://www.wanted.co.kr/';
