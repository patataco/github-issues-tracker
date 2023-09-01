import Image from 'next/image';

const AD = () => {
  return (
    <a href={AD_URl} target="_blank" rel="noopener noreferrer">
      <Image
        src={AD_IMG_URL}
        alt="광고"
        width={110}
        height={110}
        className="p-4"
      />
    </a>
  );
};

export default AD;

const AD_IMG_URL =
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100';

const AD_URl = 'https://www.wanted.co.kr/';
