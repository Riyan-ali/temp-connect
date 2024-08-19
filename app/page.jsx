import styles from "@/app/page.module.scss";
import Hero from "@/components/client/Hero/Main";
import WordRotate from "@/components/magicui/word-rotate";
import logoimg from "@/public/images/Logo.png";
import Image from "next/image";
import { syne } from "./fonts/font";

export const metadata = {
  title: "Home - Temp Connect",
  description:
    "TempConnect - Create temporary chat rooms that disappear after 24 hours. Start quick, private conversations with ease, and enjoy a fresh start every day.",
};

export default function Home() {

  const base_url = process.env.BASE_URL

  return (
    <main className={styles.background}>
      <div className={styles.left}>
        <div className={`${styles.rotate} ${syne.className}`}>
          <WordRotate words={["Create", "Join", "Chat", "Have Fun !!!"]} />
        </div>
        <div className={styles.img}>
          <Image src={logoimg} alt="Temp Connect Logo" />
        </div>
        <p>
          In a fast-paced digital world, sometimes you need a space for quick,
          temporary conversations without the weight of permanence. TempConnect
          is here to provide just that. Our platform is designed for those
          moments when you need to connect instantly, share ideas, or discuss
          matters privately, with the assurance that everything will disappear
          after 24 hours.
        </p>
      </div>
      <div className={styles.right}>
        <Hero base_url={base_url} />
      </div>
    </main>
  );
}
