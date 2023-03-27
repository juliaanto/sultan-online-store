import { Icon } from "./logo.styled";
import { Link } from "react-router-dom";

interface LogoProps {
  $isLight?: boolean;
}

function Logo({$isLight}: LogoProps): JSX.Element {
  return(
    <Link to="/">
      <Icon $isLight={$isLight} />
    </Link>
  );
}

export default Logo;