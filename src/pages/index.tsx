import * as React from "react";
import { Outlet, Link } from "react-router-dom";

export const Index: React.FC<{}> = () => {
  return (
    <div className="App">
      <nav>
        <h2>Mock Layouts</h2>
        <ul>
          <li>
            <Link to="/CoreShopping">Core Shopping</Link>
          </li>
          <li>
            <Link to="/HomeScreen">Home Screen</Link>
          </li>
        </ul>
        <h2>Misc Use Cases</h2>
        <ul>
          <li>
            <Link to="/TestCases">Section Layout with Baseline Grid</Link>
          </li>
          <li>
            <Link to="/NestedLayoutGrids">
              Alignment with Baseline Grid - Nested Grids
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};
