import Head from "next/head";
import Image from "next/image";
import { createClient } from "contentful";
import { useState, useEffect, useContext } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import MainButton from "../../components/ui/MainButton";
import ModalContext from "../../context/ModalContext";

export default function AboutPage({ aboutMeRes }) {
  const [screenWidth, setScreenWidth] = useState(0);
  const { avatar, aboutMe } = aboutMeRes.fields;
  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.screen.width);
    }
  }, []);

  console.log(aboutMe);

  return (
    <div className="lg:px-24 lg:flex lg:flex-col justify-center items-center">
      <Head>
        <title>Andreas Notokusumo - About Me</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="px-6 lg:px-48 lg: mt-16 lg:self-start"
        data-aos="fade-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="250"
      >
        <h2 className="text-[2.5rem] font-bold leading-tight">{"About Me"}</h2>
      </div>
      <div
        className="pt-10 lg:hidden"
        data-aos="fade-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="250"
      >
        <Image
          src={"https:" + avatar.fields.file.url}
          width={screenWidth}
          height={screenWidth * 0.93}
        />
      </div>
      <div
        className="mt-10 lg:my-16 hidden lg:block w-11/12"
        data-aos="fade-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="250"
      >
        <img src="/images/about_me_wide_img.png" />
      </div>
      <div className="px-8 my-6 lg:mb-12 lg:px-48 leading-loose text-lg relative inline-block space-y-1">
        {aboutMe.content.map((item, index) => {
          return (
            <div key={index} className="pb-3 lg:pb-4">
              {documentToReactComponents(item)}
            </div>
          );
        })}
        <div className="pt-8">
          <MainButton
            content="Let's talk"
            onClick={() => {
              showModal();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const aboutMeRes = await client.getEntry("3X92wZDerYF4NlXWewzZeZ");

  return {
    props: {
      aboutMeRes: aboutMeRes,
    },
    revalidate: 60 * 5,
  };
}
