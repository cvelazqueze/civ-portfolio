import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaFilePdf } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/cvelazqueze" },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/cesarvelazqueze/",
  },
];

const Social = ({ containerStyles, iconStyles }: any) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
