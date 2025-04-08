import { Link } from "react-router-dom";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/main">メイン</Link>
        </li>
        <li>
          <Link to="/interaction">インタラクション</Link>
        </li>
        <li>
          <Link to="/pointer">ポインターイベント検証用</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomePage;
