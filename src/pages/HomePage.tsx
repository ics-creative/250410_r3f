import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/minimum">最小構成サンプル</Link>
        </li>
        <li>
          <Link to="/model">3Dモデル読み込みサンプル</Link>
        </li>
        <li>
          <Link to="/pointer">ポインターイベント検証用</Link>
        </li>
        <li>
          <Link to="/interaction">インタラクション</Link>
        </li>
        <li>
          <Link to="/main">メイン</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomePage;
