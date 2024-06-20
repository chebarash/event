"use client";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 150;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <header
      className={[
        isVisible || pathname != `/` ? styles.visible : styles.unvisible,
        pathname == `/` ? `` : styles.nothome,
      ].join(` `)}
    >
      <span className={styles.logo}>
        <svg width="120" height="18" viewBox="0 0 120 18" fill="none">
          <path
            d="M28.2434 12.9669C33.872 12.9376 37.9527 12.8567 40.4855 12.7245C40.3819 13.3269 40.3152 13.9513 40.2856 14.5978C40.2708 15.2296 40.2634 16.0303 40.2634 17H23C23.1185 14.1497 23.1777 11.483 23.1777 9C23.1777 6.51699 23.1185 3.85032 23 1H40.2634V4.98898H28.2434V7.10468C28.9544 7.11938 30.0061 7.12672 31.3984 7.12672C33.7535 7.12672 36.1901 7.08264 38.7081 6.99449V10.7851C36.1901 10.697 33.7535 10.6529 31.3984 10.6529C30.0061 10.6529 28.9544 10.6602 28.2434 10.6749V12.9669Z"
            fill="var(--fg)"
          />
          <path
            d="M60.0459 1L58.5795 4.3719C57.2908 7.35445 56.2762 9.74196 55.5356 11.5344C54.795 13.3269 54.1137 15.1488 53.4916 17H46.8484C46.2411 15.1781 45.5671 13.3783 44.8265 11.6006C44.1008 9.80808 43.1232 7.51607 41.8938 4.72452C41.6864 4.25436 41.1458 3.01286 40.2719 1H46.4485C46.8928 2.42516 47.552 4.25436 48.4259 6.4876C49.1961 8.45638 49.8182 10.1607 50.2922 11.6006C50.6032 10.5868 50.9735 9.50689 51.4031 8.36088C51.8474 7.20018 52.114 6.49495 52.2029 6.24518C53.062 3.99724 53.6915 2.24885 54.0914 1H60.0459Z"
            fill="var(--fg)"
          />
          <path
            d="M66.474 12.9669C72.1025 12.9376 76.1832 12.8567 78.7161 12.7245C78.6124 13.3269 78.5457 13.9513 78.5161 14.5978C78.5013 15.2296 78.4939 16.0303 78.4939 17H61.2305C61.349 14.1497 61.4083 11.483 61.4083 9C61.4083 6.51699 61.349 3.85032 61.2305 1H78.4939V4.98898H66.474V7.10468C67.1849 7.11938 68.2366 7.12672 69.6289 7.12672C71.984 7.12672 74.4206 7.08264 76.9386 6.99449V10.7851C74.4206 10.697 71.984 10.6529 69.6289 10.6529C68.2366 10.6529 67.1849 10.6602 66.474 10.6749V12.9669Z"
            fill="var(--fg)"
          />
          <path
            d="M99.1385 1.02204C99.0349 3.50505 98.983 6.16437 98.983 9C98.983 11.8503 99.0349 14.517 99.1385 17H91.1845L85.8078 4.96694L86.2077 17H80.4977C80.6162 14.1497 80.6754 11.483 80.6754 9C80.6754 6.53168 80.6162 3.87236 80.4977 1.02204H88.6739L94.0728 13.3857L93.6951 1.02204H99.1385Z"
            fill="var(--fg)"
          />
          <path
            d="M120 5.6281C117.675 5.55464 115.416 5.51056 113.224 5.49587V17H107.669V5.49587C105.462 5.51056 103.211 5.55464 100.915 5.6281V1H120V5.6281Z"
            fill="var(--fg)"
          />
          <path
            d="M15.0358 1.82673L18 7.17327L13.9618 9L18 10.8267L15.0358 16.1733L11.4702 13.4554L11.9857 18H6.01432L6.52983 13.4554L2.9642 16.1733L0 10.8267L4.03819 9L0 7.17327L2.9642 1.82673L6.52983 4.54455L6.01432 0H11.9857L11.4702 4.54455L15.0358 1.82673Z"
            fill="var(--accent)"
          />
        </svg>
      </span>
      <button onClick={() => router.back()}>
        <svg
          className={styles.motto}
          width="120"
          height="18"
          viewBox="0 0 120 18"
          fill="none"
        >
          <path
            d="M28.2434 12.9669C33.872 12.9376 37.9527 12.8567 40.4855 12.7245C40.3819 13.3269 40.3152 13.9513 40.2856 14.5978C40.2708 15.2296 40.2634 16.0303 40.2634 17H23C23.1185 14.1497 23.1777 11.483 23.1777 9C23.1777 6.51699 23.1185 3.85032 23 1H40.2634V4.98898H28.2434V7.10468C28.9544 7.11938 30.0061 7.12672 31.3984 7.12672C33.7535 7.12672 36.1901 7.08264 38.7081 6.99449V10.7851C36.1901 10.697 33.7535 10.6529 31.3984 10.6529C30.0061 10.6529 28.9544 10.6602 28.2434 10.6749V12.9669Z"
            fill="var(--fg)"
          />
          <path
            d="M60.0459 1L58.5795 4.3719C57.2908 7.35445 56.2762 9.74196 55.5356 11.5344C54.795 13.3269 54.1137 15.1488 53.4916 17H46.8484C46.2411 15.1781 45.5671 13.3783 44.8265 11.6006C44.1008 9.80808 43.1232 7.51607 41.8938 4.72452C41.6864 4.25436 41.1458 3.01286 40.2719 1H46.4485C46.8928 2.42516 47.552 4.25436 48.4259 6.4876C49.1961 8.45638 49.8182 10.1607 50.2922 11.6006C50.6032 10.5868 50.9735 9.50689 51.4031 8.36088C51.8474 7.20018 52.114 6.49495 52.2029 6.24518C53.062 3.99724 53.6915 2.24885 54.0914 1H60.0459Z"
            fill="var(--fg)"
          />
          <path
            d="M66.474 12.9669C72.1025 12.9376 76.1832 12.8567 78.7161 12.7245C78.6124 13.3269 78.5457 13.9513 78.5161 14.5978C78.5013 15.2296 78.4939 16.0303 78.4939 17H61.2305C61.349 14.1497 61.4083 11.483 61.4083 9C61.4083 6.51699 61.349 3.85032 61.2305 1H78.4939V4.98898H66.474V7.10468C67.1849 7.11938 68.2366 7.12672 69.6289 7.12672C71.984 7.12672 74.4206 7.08264 76.9386 6.99449V10.7851C74.4206 10.697 71.984 10.6529 69.6289 10.6529C68.2366 10.6529 67.1849 10.6602 66.474 10.6749V12.9669Z"
            fill="var(--fg)"
          />
          <path
            d="M99.1385 1.02204C99.0349 3.50505 98.983 6.16437 98.983 9C98.983 11.8503 99.0349 14.517 99.1385 17H91.1845L85.8078 4.96694L86.2077 17H80.4977C80.6162 14.1497 80.6754 11.483 80.6754 9C80.6754 6.53168 80.6162 3.87236 80.4977 1.02204H88.6739L94.0728 13.3857L93.6951 1.02204H99.1385Z"
            fill="var(--fg)"
          />
          <path
            d="M120 5.6281C117.675 5.55464 115.416 5.51056 113.224 5.49587V17H107.669V5.49587C105.462 5.51056 103.211 5.55464 100.915 5.6281V1H120V5.6281Z"
            fill="var(--fg)"
          />
          <path
            d="M15.0358 1.82673L18 7.17327L13.9618 9L18 10.8267L15.0358 16.1733L11.4702 13.4554L11.9857 18H6.01432L6.52983 13.4554L2.9642 16.1733L0 10.8267L4.03819 9L0 7.17327L2.9642 1.82673L6.52983 4.54455L6.01432 0H11.9857L11.4702 4.54455L15.0358 1.82673Z"
            fill="var(--accent)"
          />
        </svg>
      </button>
      <svg
        className={styles.motto}
        width="100%"
        viewBox="0 0 360 61"
        fill="none"
      >
        <path
          d="M22.96 43.908H7.728V46.848C8.68 46.8667 10.108 46.876 12.012 46.876C15.2973 46.876 18.6387 46.82 22.036 46.708V52.196C18.6387 52.0653 15.0547 52 11.284 52C9.716 52 8.53067 52.0093 7.728 52.028V59H1.12C1.26933 55.3787 1.344 51.9907 1.344 48.836C1.344 45.6813 1.26933 42.2933 1.12 38.672H22.96V43.908ZM37.6698 59.28C33.3952 59.28 30.2498 58.356 28.2338 56.508C26.2178 54.6413 25.2098 52.028 25.2098 48.668C25.2098 45.3453 26.2085 42.7507 28.2058 40.884C30.2218 39.0173 33.3765 38.084 37.6698 38.084C41.9818 38.084 45.1365 39.0173 47.1338 40.884C49.1498 42.7507 50.1578 45.3453 50.1578 48.668C50.1578 52.0467 49.1592 54.66 47.1618 56.508C45.1645 58.356 42.0005 59.28 37.6698 59.28ZM37.6698 53.568C39.7418 53.568 41.2352 53.176 42.1498 52.392C43.0645 51.5893 43.5218 50.348 43.5218 48.668C43.5218 47.0253 43.0645 45.8027 42.1498 45C41.2352 44.1973 39.7418 43.796 37.6698 43.796C35.6165 43.796 34.1325 44.1973 33.2178 45C32.3032 45.8027 31.8458 47.0253 31.8458 48.668C31.8458 50.3293 32.3032 51.5613 33.2178 52.364C34.1325 53.1667 35.6165 53.568 37.6698 53.568ZM74.8735 45.448C74.8735 47.072 74.4722 48.444 73.6695 49.564C72.8855 50.684 71.5322 51.496 69.6095 52C69.8335 52.2987 69.9922 52.532 70.0855 52.7L74.6215 59H67.0055C66.1842 57.4693 64.8869 55.304 63.1135 52.504H58.9975V59H52.3895C52.5389 55.3787 52.6135 51.9907 52.6135 48.836C52.6135 45.6813 52.5389 42.2933 52.3895 38.672H58.9975V38.7H64.7375C68.5082 38.7 71.1402 39.3067 72.6335 40.52C74.1269 41.7333 74.8735 43.376 74.8735 45.448ZM58.9975 44.076V47.268H62.7775C64.3642 47.268 65.5589 47.2213 66.3615 47.128C67.1829 47.016 67.7522 46.848 68.0695 46.624C68.3869 46.4 68.5455 46.0733 68.5455 45.644C68.5455 45.2333 68.3962 44.916 68.0975 44.692C67.7989 44.468 67.2389 44.3093 66.4175 44.216C65.5962 44.1227 64.3829 44.076 62.7775 44.076H58.9975Z"
          fill="var(--fg)"
        />
        <path
          d="M157.12 56.592C157.755 55.64 158.277 54.7533 158.688 53.932C159.117 53.1107 159.528 52.1587 159.92 51.076C161.245 51.8413 162.785 52.4387 164.54 52.868C166.295 53.2973 167.928 53.512 169.44 53.512C170.989 53.512 172.081 53.3813 172.716 53.12C173.351 52.84 173.668 52.5413 173.668 52.224C173.668 51.0853 171.932 50.516 168.46 50.516C164.652 50.516 161.889 50.124 160.172 49.34C158.455 48.5373 157.596 47.2493 157.596 45.476C157.596 42.956 158.641 41.0987 160.732 39.904C162.823 38.7093 165.539 38.112 168.88 38.112C170.821 38.112 172.809 38.364 174.844 38.868C176.897 39.3533 178.745 40.0253 180.388 40.884C179.847 42.116 179.277 43.6187 178.68 45.392C178.568 45.7653 178.475 46.0453 178.4 46.232C177.448 45.4667 176.011 44.832 174.088 44.328C172.165 43.8053 170.467 43.544 168.992 43.544C167.219 43.544 166.024 43.6653 165.408 43.908C164.792 44.132 164.484 44.468 164.484 44.916C164.484 45.364 164.904 45.728 165.744 46.008C166.603 46.2693 167.835 46.4 169.44 46.4C173.397 46.4 176.272 46.8573 178.064 47.772C179.856 48.668 180.752 50.0493 180.752 51.916C180.752 54.5293 179.8 56.4147 177.896 57.572C175.992 58.7107 173.108 59.28 169.244 59.28C167.172 59.28 165.063 59.056 162.916 58.608C160.769 58.1413 158.837 57.4693 157.12 56.592ZM205.918 44.552C202.987 44.4587 200.141 44.4027 197.378 44.384V59H190.378V44.384C187.597 44.4027 184.759 44.4587 181.866 44.552V38.672H205.918V44.552ZM224.747 38.644H231.691V49.788C231.653 52.532 230.711 54.8 228.863 56.592C227.033 58.384 223.944 59.28 219.595 59.28C215.189 59.28 212.175 58.4307 210.551 56.732C208.927 55.0147 208.133 52.7653 208.171 49.984V38.644H215.115V49.536C215.115 50.3573 215.171 51.0293 215.283 51.552C215.413 52.056 215.805 52.532 216.459 52.98C217.131 53.428 218.204 53.652 219.679 53.652C221.284 53.652 222.46 53.428 223.207 52.98C223.953 52.5133 224.392 52 224.523 51.44C224.672 50.88 224.747 50.1613 224.747 49.284V38.644ZM242.889 38.364C246.398 38.364 249.17 38.7933 251.205 39.652C253.239 40.492 254.658 41.668 255.461 43.18C256.282 44.6733 256.693 46.512 256.693 48.696C256.693 50.768 256.226 52.5787 255.293 54.128C254.359 55.6773 252.959 56.8813 251.093 57.74C249.226 58.58 246.93 59 244.205 59C242.543 59 240.854 59 239.137 59C237.419 59 235.683 58.9907 233.929 58.972C234.078 55.2947 234.153 51.8693 234.153 48.696C234.153 45.4853 234.078 42.1347 233.929 38.644C236.15 38.4573 239.137 38.364 242.889 38.364ZM244.989 53.428C246.725 53.428 247.882 53.008 248.461 52.168C249.039 51.328 249.329 50.1707 249.329 48.696C249.329 47.2773 249.021 46.1293 248.405 45.252C247.807 44.3747 246.669 43.936 244.989 43.936C243.178 43.936 241.825 43.992 240.929 44.104V53.428H244.989ZM265.529 53.876C272.622 53.8387 277.765 53.736 280.957 53.568C280.826 54.3333 280.742 55.1267 280.705 55.948C280.686 56.7507 280.677 57.768 280.677 59H258.921C259.07 55.3787 259.145 51.9907 259.145 48.836C259.145 45.6813 259.07 42.2933 258.921 38.672H280.677V43.74H265.529V46.428C266.425 46.4467 267.75 46.456 269.505 46.456C272.473 46.456 275.543 46.4 278.717 46.288V51.104C275.543 50.992 272.473 50.936 269.505 50.936C267.75 50.936 266.425 50.9453 265.529 50.964V53.876ZM306.694 38.7C306.563 41.8547 306.498 45.2333 306.498 48.836C306.498 52.4573 306.563 55.8453 306.694 59H296.67L289.894 43.712L290.398 59H283.202C283.351 55.3787 283.426 51.9907 283.426 48.836C283.426 45.7 283.351 42.3213 283.202 38.7H293.506L300.31 54.408L299.834 38.7H306.694ZM332.985 44.552C330.054 44.4587 327.207 44.4027 324.445 44.384V59H317.445V44.384C314.663 44.4027 311.826 44.4587 308.933 44.552V38.672H332.985V44.552ZM335.237 56.592C335.872 55.64 336.395 54.7533 336.805 53.932C337.235 53.1107 337.645 52.1587 338.037 51.076C339.363 51.8413 340.903 52.4387 342.657 52.868C344.412 53.2973 346.045 53.512 347.557 53.512C349.107 53.512 350.199 53.3813 350.833 53.12C351.468 52.84 351.785 52.5413 351.785 52.224C351.785 51.0853 350.049 50.516 346.577 50.516C342.769 50.516 340.007 50.124 338.289 49.34C336.572 48.5373 335.713 47.2493 335.713 45.476C335.713 42.956 336.759 41.0987 338.849 39.904C340.94 38.7093 343.656 38.112 346.997 38.112C348.939 38.112 350.927 38.364 352.961 38.868C355.015 39.3533 356.863 40.0253 358.505 40.884C357.964 42.116 357.395 43.6187 356.797 45.392C356.685 45.7653 356.592 46.0453 356.517 46.232C355.565 45.4667 354.128 44.832 352.205 44.328C350.283 43.8053 348.584 43.544 347.109 43.544C345.336 43.544 344.141 43.6653 343.525 43.908C342.909 44.132 342.601 44.468 342.601 44.916C342.601 45.364 343.021 45.728 343.861 46.008C344.72 46.2693 345.952 46.4 347.557 46.4C351.515 46.4 354.389 46.8573 356.181 47.772C357.973 48.668 358.869 50.0493 358.869 51.916C358.869 54.5293 357.917 56.4147 356.013 57.572C354.109 58.7107 351.225 59.28 347.361 59.28C345.289 59.28 343.18 59.056 341.033 58.608C338.887 58.1413 336.955 57.4693 335.237 56.592Z"
          fill="var(--fg)"
        />
        <path
          d="M25.172 6.552C22.2413 6.45867 19.3947 6.40267 16.632 6.384V21H9.632V6.384C6.85067 6.40267 4.01333 6.45867 1.12 6.552V0.672H25.172V6.552ZM50.8887 0.672C50.758 3.82667 50.6927 7.21467 50.6927 10.836C50.6927 14.4573 50.758 17.8453 50.8887 21H44.3087V13.384H34.0047V21H27.4247C27.574 17.3787 27.6487 13.9907 27.6487 10.836C27.6487 7.68133 27.574 4.29333 27.4247 0.672H34.0047V8.288H44.3087V0.672H50.8887ZM59.7358 15.876C66.8291 15.8387 71.9718 15.736 75.1638 15.568C75.0331 16.3333 74.9491 17.1267 74.9118 17.948C74.8931 18.7507 74.8838 19.768 74.8838 21H53.1278C53.2771 17.3787 53.3518 13.9907 53.3518 10.836C53.3518 7.68133 53.2771 4.29333 53.1278 0.672H74.8838V5.74H59.7358V8.428C60.6318 8.44667 61.9571 8.456 63.7118 8.456C66.6798 8.456 69.7505 8.4 72.9238 8.288V13.104C69.7505 12.992 66.6798 12.936 63.7118 12.936C61.9571 12.936 60.6318 12.9453 59.7358 12.964V15.876ZM99.5905 0.643998H106.535V11.788C106.497 14.532 105.555 16.8 103.707 18.592C101.877 20.384 98.7879 21.28 94.4385 21.28C90.0332 21.28 87.0185 20.4307 85.3945 18.732C83.7705 17.0147 82.9772 14.7653 83.0145 11.984V0.643998H89.9585V11.536C89.9585 12.3573 90.0145 13.0293 90.1265 13.552C90.2572 14.056 90.6492 14.532 91.3025 14.98C91.9745 15.428 93.0479 15.652 94.5225 15.652C96.1279 15.652 97.3039 15.428 98.0505 14.98C98.7972 14.5133 99.2359 14 99.3665 13.44C99.5159 12.88 99.5905 12.1613 99.5905 11.284V0.643998ZM115.604 15.344C121.018 15.3067 125.498 15.2133 129.044 15.064C128.802 16.016 128.652 16.9307 128.596 17.808C128.54 18.6853 128.512 19.7493 128.512 21H108.772C108.922 17.3787 108.996 13.9907 108.996 10.836C108.996 7.68133 108.922 4.29333 108.772 0.672H115.604V15.344ZM151.692 6.552C148.761 6.45867 145.914 6.40267 143.152 6.384V21H136.152V6.384C133.37 6.40267 130.533 6.45867 127.64 6.552V0.672H151.692V6.552ZM170.212 6.244C167.991 6.132 166.348 6.06667 165.284 6.048V15.624C166.367 15.6053 168.01 15.54 170.212 15.428V21H153.944V15.428C156.091 15.54 157.724 15.6053 158.844 15.624V6.048C157.724 6.06667 156.091 6.132 153.944 6.244V0.672H170.212V6.244ZM198.636 0.672L200.82 21H193.568L193.12 6.496L190.32 21H182.984L180.128 6.608L179.708 21H172.456L174.64 0.672H184.16L186.596 13.916L188.724 0.672H198.636ZM220.722 21C220.367 19.936 219.891 18.6013 219.294 16.996H210.362L208.962 21H201.934L209.774 0.672H220.078L227.974 21H220.722ZM217.698 12.628C216.988 10.668 216.26 8.708 215.514 6.748L214.842 4.928C214.188 6.62667 213.227 9.19333 211.958 12.628H217.698ZM251.852 6.552C248.921 6.45867 246.074 6.40267 243.312 6.384V21H236.312V6.384C233.53 6.40267 230.693 6.45867 227.8 6.552V0.672H251.852V6.552ZM260.712 15.876C267.806 15.8387 272.948 15.736 276.14 15.568C276.01 16.3333 275.926 17.1267 275.888 17.948C275.87 18.7507 275.86 19.768 275.86 21H254.104C254.254 17.3787 254.328 13.9907 254.328 10.836C254.328 7.68133 254.254 4.29333 254.104 0.672H275.86V5.74H260.712V8.428C261.608 8.44667 262.934 8.456 264.688 8.456C267.656 8.456 270.727 8.4 273.9 8.288V13.104C270.727 12.992 267.656 12.936 264.688 12.936C262.934 12.936 261.608 12.9453 260.712 12.964V15.876ZM307.455 0.672C307.324 3.82667 307.259 7.21467 307.259 10.836C307.259 14.4573 307.324 17.8453 307.455 21H300.875V13.384H290.571V21H283.991C284.14 17.3787 284.215 13.9907 284.215 10.836C284.215 7.68133 284.14 4.29333 283.991 0.672H290.571V8.288H300.875V0.672H307.455ZM326.27 0.643998H333.214V11.788C333.177 14.532 332.234 16.8 330.386 18.592C328.557 20.384 325.468 21.28 321.118 21.28C316.713 21.28 313.698 20.4307 312.074 18.732C310.45 17.0147 309.657 14.7653 309.694 11.984V0.643998H316.638V11.536C316.638 12.3573 316.694 13.0293 316.806 13.552C316.937 14.056 317.329 14.532 317.982 14.98C318.654 15.428 319.728 15.652 321.202 15.652C322.808 15.652 323.984 15.428 324.73 14.98C325.477 14.5133 325.916 14 326.046 13.44C326.196 12.88 326.27 12.1613 326.27 11.284V0.643998ZM351.86 10.892C356.116 10.892 358.244 12.2453 358.244 14.952C358.244 16.2213 357.955 17.304 357.376 18.2C356.797 19.0773 355.761 19.768 354.268 20.272C352.775 20.7573 350.703 21 348.052 21H335.452C335.601 17.3787 335.676 13.9907 335.676 10.836C335.676 7.68133 335.601 4.29333 335.452 0.672H342.032V0.699999H347.996C350.311 0.699999 352.131 0.895999 353.456 1.288C354.8 1.66133 355.743 2.212 356.284 2.94C356.844 3.668 357.124 4.592 357.124 5.712C357.124 6.85067 356.723 7.868 355.92 8.764C355.136 9.64133 353.783 10.3507 351.86 10.892ZM342.032 5.796V8.4H347.408C348.565 8.4 349.368 8.29733 349.816 8.092C350.283 7.88667 350.516 7.51333 350.516 6.972C350.516 6.54267 350.273 6.244 349.788 6.076C349.321 5.88933 348.528 5.796 347.408 5.796H342.032ZM347.408 15.876C348.379 15.876 349.116 15.8387 349.62 15.764C350.143 15.6707 350.516 15.5213 350.74 15.316C350.964 15.092 351.076 14.7933 351.076 14.42C351.076 13.9347 350.805 13.5893 350.264 13.384C349.741 13.16 348.789 13.048 347.408 13.048H342.032V15.876H347.408Z"
          fill="var(--fg)"
        />
        <rect
          x="81"
          y="37"
          width="70"
          height="24"
          rx="12"
          fill="var(--accent)"
        />
      </svg>
      <p>
        Post events, register and be part
        <br />
        of the university community.
      </p>
    </header>
  );
}
