import { Link } from "react-router-dom";

export const HomePage = () => {
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
          <Link to="/interaction">
            インタラクション・アニメーションのサンプル
          </Link>
        </li>
        <li>
          <Link to="/dreisample">dreiを使用したサンプル</Link>
        </li>
        <li>
          <Link to="/main">メイン作例</Link>
        </li>
      </ul>
    </nav>
  );
};
