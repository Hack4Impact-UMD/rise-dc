import { NavLink } from "react-router-dom";
import logo from "./assets/logo.png";
import styles from "./Navbar.module.css";

interface Title {
  title: string;
}

const NavBar = (props: Title) => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        end
        className={(isActive) =>
          !isActive
            ? `${styles.nav} ${styles.first}`
            : `${styles.nav} ${styles.first}`
        }
      >
        <img className={styles.logo} src={logo}></img>
      </NavLink>
      <header className={styles.title}>{props.title}</header>
      <NavLink className={`${styles.nav} ${styles.push}`} to="/" end>
        <svg
          className={styles.icon}
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 30.5455L26 1L51 30.5455"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.69238 21.4546V51H43.3078V21.4546"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 50.9999V32.8181"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NavLink>
      <NavLink className={styles.nav} to="/search" end>
        <svg
          className={styles.icon}
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3077 19.75C23.087 19.75 26.9615 15.5527 26.9615 10.375C26.9615 5.19733 23.087 1 18.3077 1C13.5283 1 9.65381 5.19733 9.65381 10.375C9.65381 15.5527 13.5283 19.75 18.3077 19.75Z"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.6154 50.9999H1V46.8333C1 41.8604 2.82348 37.0913 6.06931 33.575C9.31513 30.0587 13.7174 28.0833 18.3077 28.0833C22.898 28.0833 27.3003 30.0587 30.5461 33.575C33.7919 37.0913 35.6154 41.8604 35.6154 46.8333V50.9999Z"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M33.6924 1C35.9875 1 38.1887 1.98772 39.8116 3.74587C41.4345 5.50403 42.3462 7.8886 42.3462 10.375C42.3462 12.8614 41.4345 15.246 39.8116 17.0041C38.1887 18.7623 35.9875 19.75 33.6924 19.75"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M39.8457 28.8748C43.122 30.225 45.9426 32.6211 47.9343 35.746C49.926 38.8709 50.9949 42.5773 50.9995 46.3748V50.9998H45.2303"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NavLink>
      <NavLink className={styles.nav} to="/settings" end>
        <svg
          className={styles.icon}
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6787 8.03564L20.2144 4.07136C20.4734 3.40016 20.929 2.82283 21.5217 2.41497C22.1144 2.00712 22.8164 1.78777 23.5358 1.78564H26.4644C27.1838 1.78777 27.8858 2.00712 28.4785 2.41497C29.0712 2.82283 29.5268 3.40016 29.7858 4.07136L31.3215 8.03564L36.5358 11.0356L40.7501 10.3928C41.4518 10.2975 42.166 10.4131 42.8019 10.7247C43.4379 11.0363 43.9668 11.5299 44.3215 12.1428L45.7501 14.6428C46.1162 15.2655 46.2848 15.9845 46.2338 16.705C46.1828 17.4255 45.9145 18.1136 45.4644 18.6785L42.8572 21.9999V27.9999L45.5358 31.3214C45.986 31.8863 46.2542 32.5744 46.3052 33.2949C46.3562 34.0154 46.1876 34.7344 45.8215 35.3571L44.393 37.8571C44.0382 38.47 43.5093 38.9636 42.8734 39.2752C42.2375 39.5868 41.5233 39.7023 40.8215 39.6071L36.6072 38.9642L31.393 41.9642L29.8572 45.9285C29.5982 46.5997 29.1426 47.177 28.5499 47.5849C27.9573 47.9927 27.2552 48.2121 26.5358 48.2142H23.5358C22.8164 48.2121 22.1144 47.9927 21.5217 47.5849C20.929 47.177 20.4734 46.5997 20.2144 45.9285L18.6787 41.9642L13.4644 38.9642L9.2501 39.6071C8.54837 39.7023 7.83417 39.5868 7.19825 39.2752C6.56233 38.9636 6.0334 38.47 5.67867 37.8571L4.2501 35.3571C3.88403 34.7344 3.71537 34.0154 3.76638 33.2949C3.81739 32.5744 4.08567 31.8863 4.53581 31.3214L7.14295 27.9999V21.9999L4.46438 18.6785C4.01424 18.1136 3.74596 17.4255 3.69495 16.705C3.64394 15.9845 3.8126 15.2655 4.17867 14.6428L5.60724 12.1428C5.96197 11.5299 6.4909 11.0363 7.12682 10.7247C7.76274 10.4131 8.47694 10.2975 9.17867 10.3928L13.393 11.0356L18.6787 8.03564ZM17.8572 24.9999C17.8572 26.4127 18.2762 27.7937 19.061 28.9683C19.8459 30.1429 20.9615 31.0584 22.2666 31.5991C23.5718 32.1397 25.008 32.2812 26.3936 32.0055C27.7792 31.7299 29.0519 31.0496 30.0509 30.0507C31.0498 29.0517 31.7301 27.779 32.0057 26.3934C32.2813 25.0079 32.1399 23.5717 31.5992 22.2665C31.0586 20.9613 30.1431 19.8457 28.9685 19.0609C27.7938 18.276 26.4128 17.8571 25.0001 17.8571C23.1057 17.8571 21.2889 18.6096 19.9493 19.9492C18.6098 21.2887 17.8572 23.1055 17.8572 24.9999V24.9999Z"
            strokeWidth="1.71429"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NavLink>
      <NavLink className={styles.nav} to="/login" end>
        <svg
          className={styles.icon}
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1347_3857)">
            <path
              d="M23.2144 25H48.2144"
              strokeWidth="1.71429"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M41.0713 17.8572L48.2141 25L41.0713 32.1429"
              strokeWidth="1.71429"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M41.7856 41.0357C38.5786 44.3784 34.4449 46.6852 29.9162 47.6594C25.3875 48.6336 20.6708 48.2307 16.373 46.5024C12.0752 44.7741 8.39268 41.7995 5.79919 37.9613C3.2057 34.123 1.81982 29.5966 1.81982 24.9643C1.81982 20.332 3.2057 15.8056 5.79919 11.9673C8.39268 8.12909 12.0752 5.15451 16.373 3.42623C20.6708 1.69794 25.3875 1.29498 29.9162 2.26918C34.4449 3.24337 38.5786 5.55017 41.7856 8.89287"
              strokeWidth="1.71429"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1347_3857">
              <rect width="50" height="50" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </NavLink>
    </nav>
  );
};

export default NavBar;
