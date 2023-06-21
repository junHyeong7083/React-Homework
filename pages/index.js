import { useRef, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import NFTCard from "../components/NFTCard";
// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const textOne = useRef(null);
  const textTwo = useRef(null);
  const textThree = useRef(null);
  const textFour = useRef(null);

  // Handling Scroll
  const handleWorkScroll = () => {
    workRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleAboutScroll = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  useEffect(() => {
    // Scroll to top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`relative ${data.showCursor ? "cursor-none" : ""}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="mt-10 laptop:mt-20">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="w-4/5 p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 font-bold mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="w-full p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 font-bold laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="w-full p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 font-bold laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="w-full p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 font-bold laptop:w-4/5"
            >
              {data.headerTag}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        <div className="p-2 mt-10 laptop:mt-30 laptop:p-0" ref={workRef}>
          {/* 대체된 이미지 */}
          <Image
            src="https://ghchart.rshah.org/junHyeong7083"
            alt="GitHub Contributions"
            width={500}
            height={150}
          />

          <div className="grid grid-cols-1 gap-4 mt-5 laptop:mt-10 tablet:grid-cols-2">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              >
                <NFTCard
                  nftId={project.nftId}
                  metaMaskAddress="0xC30b472b15CBAfBE4407f646A637E2fBD79355a8"
                />
              </WorkCard>
            ))}
          </div>
        </div>

        <div className="p-2 mt-10 laptop:mt-30 laptop:p-0">
          <h1 className="text-2xl font-bold">Services.</h1>
          <div className="grid grid-cols-1 gap-6 mt-5 tablet:m-10 laptop:grid-cols-2">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="p-2 mt-10 laptop:mt-40 laptop:p-0" ref={aboutRef}>
          <h1 className="text-2xl m-10 font-bold">About.</h1>
          <p className="w-full mt-2 text-xl m-10 laptop:text-3xl laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div> // 1
  );
}
