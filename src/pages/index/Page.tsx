import { Link } from "react-router-dom";
import { PAGE_PATHS } from "../../consts/pagePaths";

export const IndexPage = () => (
  <nav>
    <ul>
      <li>
        <Link to={PAGE_PATHS.minimum}>最小構成サンプル</Link>
      </li>
      <li>
        <Link to={PAGE_PATHS.model}>3Dモデル読み込みサンプル</Link>
      </li>
      <li>
        <Link to={PAGE_PATHS.pointer}>ポインターイベント検証用</Link>
      </li>
      <li>
        <Link to={PAGE_PATHS.interaction}>インタラクション・アニメーションのサンプル</Link>
      </li>
      <li>
        <Link to={PAGE_PATHS.drei}>dreiを使用したサンプル</Link>
      </li>
      <li>
        <Link to={PAGE_PATHS.main}>メイン作例</Link>
      </li>
    </ul>
  </nav>
);
