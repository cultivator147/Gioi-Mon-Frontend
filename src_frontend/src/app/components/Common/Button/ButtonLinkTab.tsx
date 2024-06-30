import { useLocation, useNavigate } from "react-router-dom";
import "./buttonStyles.css";

export const ButtonLinkTab = ({ children, ...props }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeBackgroundTab = (path: string) => {
    if (path === "/") {
      if (location.pathname === "/") {
        return "btn-linktab-bf";
      }
    } else {
      const regex = new RegExp(path);
      if (location.pathname.match(regex)) {
        return "btn-linktab-af";
      }
    }
    return "btn-linktab-bf";
  };

  const onClickNavigate = () => {
    if (props.to) {
      navigate(props.to);
      window.location.reload();
    }
  };
  return (
    <button
      className={activeBackgroundTab(props?.backgroundPath)}
      {...props}
      // style={activeBackgroundTab(props?.backgroundPath)}
      onClick={onClickNavigate}
    >
        {props?.label}
      {children}
    </button>
  );
};
